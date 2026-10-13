#!/usr/bin/env python3
"""Compile a reviewed clip plan into an edit map and SRT; standard library only."""
import argparse
import json
import math
from pathlib import Path


def seconds(value, label):
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        raise ValueError(f'{label} must be a number of seconds')
    if not math.isfinite(value) or value < 0:
        raise ValueError(f'{label} must be finite and nonnegative')
    return float(value)


def stamp(value):
    ms = round(value * 1000)
    return f'{ms // 3600000:02}:{ms // 60000 % 60:02}:{ms // 1000 % 60:02},{ms % 1000:03}'


def compile_plan(plan):
    clips = plan.get('clips')
    if not isinstance(clips, list) or not clips:
        raise ValueError('clips must be a nonempty list')
    cursor = 0.0
    edit_map, captions = [], []
    for index, clip in enumerate(clips):
        label = f'clips[{index}]'
        source = clip.get('source')
        if not isinstance(source, str) or not source.strip():
            raise ValueError(f'{label}.source must be a file reference')
        start = seconds(clip.get('start'), label + '.start')
        end = seconds(clip.get('end'), label + '.end')
        if end <= start:
            raise ValueError(f'{label}.end must be after start')
        duration = seconds(clip.get('encoded_duration', end - start), label + '.encoded_duration')
        if duration <= 0:
            raise ValueError(f'{label}.encoded_duration must be positive')
        local_captions = clip.get('captions', [])
        if not isinstance(local_captions, list):
            raise ValueError(f'{label}.captions must be a list')
        previous_end = 0.0
        for cue in local_captions:
            a = seconds(cue.get('start'), label + '.caption.start')
            b = seconds(cue.get('end'), label + '.caption.end')
            text = cue.get('text')
            if a < previous_end or b <= a or b > min(duration, end - start) + 1e-6:
                raise ValueError(f'{label}: captions must be ordered, nonoverlapping and inside retained speech')
            if not isinstance(text, str) or not text.strip() or '\n\n' in text or '\r' in text:
                raise ValueError(f'{label}: caption text must be nonempty, without blank lines or carriage returns')
            if round((cursor + b) * 1000) <= round((cursor + a) * 1000):
                raise ValueError(f'{label}: caption is shorter than SRT precision')
            captions.append(dict(start=round(cursor + a, 6), end=round(cursor + b, 6), text=text, clip=index))
            previous_end = b
        edit_map.append(dict(clip=index, source=source, source_start=start, source_end=end,
                             edit_start=round(cursor, 6), edit_end=round(cursor + duration, 6),
                             duration_basis='encoded' if 'encoded_duration' in clip else 'requested'))
        cursor += duration
    return dict(duration=round(cursor, 6), clips=edit_map, captions=captions)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('plan', type=Path)
    parser.add_argument('--output-dir', required=True, type=Path)
    args = parser.parse_args()
    try:
        timeline = compile_plan(json.loads(args.plan.read_text(encoding='utf-8')))
        targets = [args.output_dir / name for name in ('timeline.json', 'subtitles.srt')]
        if any(path.exists() for path in targets):
            raise ValueError('output files already exist; choose a new output directory')
        args.output_dir.mkdir(parents=True, exist_ok=True)
        targets[0].write_text(json.dumps(timeline, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
        targets[1].write_text('\n\n'.join(
            f"{i}\n{stamp(c['start'])} --> {stamp(c['end'])}\n{c['text']}"
            for i, c in enumerate(timeline['captions'], 1)) + '\n', encoding='utf-8')
    except (ValueError, TypeError, AttributeError, OSError) as exc:
        parser.exit(1, f'Error: {exc}\n')
    print(f"Compiled {len(timeline['clips'])} clips, {len(timeline['captions'])} captions, {timeline['duration']:.3f} seconds.")
    if any(c['duration_basis'] == 'requested' for c in timeline['clips']):
        print('Timing uses requested durations for some clips. Recompile with measured encoded_duration before final export.')


if __name__ == '__main__':
    main()
