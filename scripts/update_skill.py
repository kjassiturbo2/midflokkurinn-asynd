#!/usr/bin/env python3
"""Athugar og uppfærir midflokkurinn-asynd úr GitHub.

Prófar nokkrar leiðir af því að netaðgangur er ólíkur eftir umhverfum
(t.d. lokar sum umhverfi á api.github.com en leyfa git og
raw.githubusercontent.com). Notar aðeins staðalsafn Python, auk git og curl
ef þau eru til.

Notkun:
    python3 scripts/update_skill.py              # athuga og uppfæra
    python3 scripts/update_skill.py --check-only # aðeins athuga

Úttak: lokalína er JSON með "status" og fleiri upplýsingum.
Útgönguköðar:
    0  uppsett útgáfa er nýjust
    10 uppfært á staðnum; lestu SKILL.md aftur úr sömu möppu
    11 nýrri útgáfa sótt og sannreynd, en uppsetta mappan er skrifvarin;
       lestu SKILL.md úr "verified_path" og vinndu eftir henni
    12 nýrri útgáfa er til (--check-only)
    2  athugun eða uppfærsla mistókst; stöðvaðu og láttu notandann vita
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import shutil
import subprocess
import sys
import tempfile
import unicodedata
import urllib.request
import zipfile
from pathlib import Path

REPO = "kjassiturbo2/midflokkurinn-asynd"
BRANCH = "main"
NAME = "midflokkurinn-asynd"
TIMEOUT = 30
log: list[str] = []


def note(msg: str) -> None:
    log.append(msg)
    print(msg, file=sys.stderr)


def parse_version(text: str) -> tuple[int, ...]:
    return tuple(int(p) for p in text.strip().split("."))


def run(cmd: list[str], cwd: str | None = None) -> str | None:
    if not shutil.which(cmd[0]):
        return None
    try:
        r = subprocess.run(cmd, cwd=cwd, capture_output=True, text=True, timeout=300)
    except Exception as e:  # noqa: BLE001
        note(f"{cmd[0]}: {e}")
        return None
    if r.returncode != 0:
        note(f"{' '.join(cmd[:3])}: {r.stderr.strip()[:200]}")
        return None
    return r.stdout


def fetch_bytes(url: str) -> bytes | None:
    """urllib fyrst, svo curl (curl notar oft annað CA-safn eða proxy-stillingar)."""
    try:
        with urllib.request.urlopen(url, timeout=TIMEOUT) as r:
            return r.read()
    except Exception as e:  # noqa: BLE001
        note(f"urllib {url}: {e}")
    if shutil.which("curl"):
        r = subprocess.run(["curl", "-fsSL", "-m", str(TIMEOUT * 4), url], capture_output=True)
        if r.returncode == 0:
            return r.stdout
        note(f"curl {url}: {r.stderr.decode(errors='replace').strip()[:200]}")
    return None


def remote_sha() -> str | None:
    out = run(["git", "ls-remote", f"https://github.com/{REPO}", f"refs/heads/{BRANCH}"])
    if out and out.split():
        return out.split()[0]
    data = fetch_bytes(f"https://api.github.com/repos/{REPO}/commits/{BRANCH}")
    if data:
        try:
            return json.loads(data)["sha"]
        except Exception as e:  # noqa: BLE001
            note(f"api svar: {e}")
    return None


def fetch_tree(sha: str, dest: Path) -> bool:
    """Sækir alla útgáfuna, fasta við sha, í dest."""
    dest.mkdir(parents=True)
    if shutil.which("git"):
        ok = (
            run(["git", "init", "-q"], cwd=str(dest)) is not None
            and run(["git", "fetch", "-q", "--depth", "1", f"https://github.com/{REPO}", sha], cwd=str(dest)) is not None
            and run(["git", "checkout", "-q", "FETCH_HEAD"], cwd=str(dest)) is not None
        )
        if ok:
            shutil.rmtree(dest / ".git")
            return True
        shutil.rmtree(dest)
        dest.mkdir()
    for url in (f"https://codeload.github.com/{REPO}/zip/{sha}", f"https://github.com/{REPO}/archive/{sha}.zip"):
        data = fetch_bytes(url)
        if not data:
            continue
        zpath = dest.parent / "pkg.zip"
        zpath.write_bytes(data)
        with zipfile.ZipFile(zpath) as z:
            root = dest.resolve()
            for info in z.infolist():
                parts = Path(info.filename).parts[1:]  # sleppa efstu möppu
                if not parts:
                    continue
                target = (dest / Path(*parts)).resolve()
                if root not in target.parents and target != root:
                    note(f"hafnað slóð utan möppu: {info.filename}")
                    return False
                if (info.external_attr >> 16) & 0o170000 == 0o120000:
                    note(f"hafnað tákntengli: {info.filename}")
                    return False
                if info.is_dir():
                    target.mkdir(parents=True, exist_ok=True)
                else:
                    target.parent.mkdir(parents=True, exist_ok=True)
                    target.write_bytes(z.read(info))
        return True
    return False


def verify(tree: Path, expected_version: str) -> bool:
    if any(p.is_symlink() for p in tree.rglob("*")):
        note("tákntengill í pakka")
        return False
    skill = (tree / "SKILL.md").read_text(encoding="utf-8") if (tree / "SKILL.md").exists() else ""
    if f"name: {NAME}" not in skill:
        note("SKILL.md er ekki fyrir midflokkurinn-asynd")
        return False
    if (tree / "VERSION").read_text().strip() != expected_version:
        note("VERSION passar ekki við athugaða útgáfu")
        return False
    manifest = json.loads((tree / "assets/manifest.json").read_text(encoding="utf-8"))
    bad = []
    for item in manifest.get("copied_files", []):
        rel = item["file"]
        path = next(
            (tree / v for v in (rel, unicodedata.normalize("NFD", rel), unicodedata.normalize("NFC", rel)) if (tree / v).exists()),
            None,
        )
        if path is None or hashlib.sha256(path.read_bytes()).hexdigest() != item["sha256"]:
            bad.append(rel)
    if bad:
        note(f"{len(bad)} eignir standast ekki SHA-256: {bad[:5]}")
        return False
    return True


def writable(path: Path) -> bool:
    probe = path / ".update_probe"
    try:
        probe.write_text("x")
        probe.unlink()
        return os.access(path.parent, os.W_OK)
    except OSError:
        return False


def finish(code: int, **info) -> None:
    info["log"] = log
    print(json.dumps(info, ensure_ascii=False))
    sys.exit(code)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--skill-dir", default=str(Path(__file__).resolve().parent.parent))
    ap.add_argument("--check-only", action="store_true")
    ap.add_argument("--work-dir", default=None, help="tímabundin mappa (sjálfgefið kerfisins)")
    args = ap.parse_args()

    skill_dir = Path(args.skill_dir).resolve()
    vfile = skill_dir / "VERSION"
    local = vfile.read_text().strip() if vfile.exists() else "0"

    sha = remote_sha()
    if not sha:
        finish(2, status="failed", stage="sha", local=local)
    remote = fetch_bytes(f"https://raw.githubusercontent.com/{REPO}/{sha}/VERSION")
    remote_v = remote.decode().strip() if remote else None

    work = Path(tempfile.mkdtemp(prefix="asynd-upd-", dir=args.work_dir))
    tree = work / "src"
    if remote_v is None:
        # Engin raw-leið: sækjum allan pakkann og lesum VERSION úr honum.
        if not fetch_tree(sha, tree):
            finish(2, status="failed", stage="version", local=local, sha=sha)
        remote_v = (tree / "VERSION").read_text().strip()

    if parse_version(remote_v) <= parse_version(local):
        shutil.rmtree(work, ignore_errors=True)
        finish(0, status="up_to_date", local=local, remote=remote_v, sha=sha)
    if args.check_only:
        finish(12, status="update_available", local=local, remote=remote_v, sha=sha)

    if not tree.exists() and not fetch_tree(sha, tree):
        finish(2, status="failed", stage="download", local=local, remote=remote_v, sha=sha)
    if not verify(tree, remote_v):
        finish(2, status="failed", stage="verify", local=local, remote=remote_v, sha=sha)

    if not writable(skill_dir):
        finish(11, status="verified_not_installed", local=local, remote=remote_v, sha=sha, verified_path=str(tree))

    backup = work / f"backup-{local}"
    staged = skill_dir.with_name(skill_dir.name + ".new")
    old = skill_dir.with_name(skill_dir.name + ".old")
    try:
        shutil.copytree(skill_dir, backup, symlinks=True)  # endurheimtanlegt afrit utan skillmöppu
        for p in (staged, old):
            if p.exists():
                shutil.rmtree(p)
        shutil.copytree(tree, staged)
        skill_dir.rename(old)
        try:
            staged.rename(skill_dir)
        except Exception:
            old.rename(skill_dir)  # endurheimta fyrri útgáfu
            raise
        shutil.rmtree(old, ignore_errors=True)
    except Exception as e:  # noqa: BLE001
        note(f"skipti mistókust: {e}")
        shutil.rmtree(staged, ignore_errors=True)
        finish(11, status="verified_not_installed", local=local, remote=remote_v, sha=sha, verified_path=str(tree))
    finish(10, status="updated", previous=local, installed=remote_v, sha=sha, backup=str(backup))


if __name__ == "__main__":
    main()
