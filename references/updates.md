# Útgáfuathugun og uppfærsla

Upprunasafn: https://github.com/kjassiturbo2/midflokkurinn-asynd — grein: `main`.

Uppfærslan er skylda, ekki valkostur. Þú mátt ekki hefja framleiðslu fyrr en annaðhvort er staðfest að uppsetta útgáfan sé nýjust, eða að nýjasta útgáfan hafi verið sótt, sannreynd og lesin, eða að notandinn hafi sjálfur samþykkt að vinna á eldri útgáfu.

## 1. Keyrðu uppfærsluskriftuna

Ef þú getur keyrt Python skaltu byrja hér:

```sh
python3 <skillmappa>/scripts/update_skill.py
```

Skriftan prófar sjálf allar leiðirnar hér að neðan, sannreynir pakkann og skiptir um útgáfu. Lokalína úttaksins er JSON. Bregstu við eftir útgönguköða:

| Kóði | Staða | Hvað þú gerir |
|---|---|---|
| 0 | `up_to_date` | Haltu áfram. |
| 10 | `updated` | Lestu SKILL.md og viðeigandi tilvísanir aftur úr skillmöppunni áður en þú heldur áfram. Segðu notandanum í einni setningu úr hvaða í hvaða útgáfu var uppfært. |
| 11 | `verified_not_installed` | Skillmappan er skrifvarin. Lestu SKILL.md og tilvísanir úr `verified_path` og notaðu eignir þaðan í þessu verkefni. Segðu notandanum frá því og bjóddu að setja skillið upp aftur með uppsetningaraðferð umhverfisins svo uppfærslan haldist. |
| 2 | `failed` | Farðu í skref 2. |

Skriftan er í skillmöppunni sjálfri. Uppsetning sem er eldri en skriftan hefur hana ekki; farðu þá beint í skref 2.

## 2. Handvirk athugun — prófaðu allar leiðirnar

Umhverfi loka á ólíkar slóðir. Til dæmis getur `api.github.com` skilað 403 þar sem `git` og `raw.githubusercontent.com` virka. Ein misheppnuð slóð er því ekki nóg til að gefast upp. Lestu raunverulegu villuboðin; ekki fela þau í skriftu sem hrynur.

**a. Commit-auðkenni (sha) á `main`** — reyndu í þessari röð þar til eitt virkar:

1. `git ls-remote https://github.com/kjassiturbo2/midflokkurinn-asynd refs/heads/main`
2. `https://api.github.com/repos/kjassiturbo2/midflokkurinn-asynd/commits/main`, reiturinn `sha`
3. Netleitar- eða vefsóknarverkfæri umhverfisins á sömu slóðir

**b. Útgáfunúmer** — sæktu `https://raw.githubusercontent.com/kjassiturbo2/midflokkurinn-asynd/<sha>/VERSION`. Berðu saman töluliði, ekki textaröð. Ef staðbundna VERSION-skrá vantar telst uppsetningin eldri. Ef útgáfan er sú sama eða eldri er verkinu lokið.

**c. Allur pakkinn, fastur við sama sha** — reyndu í þessari röð:

1. `git init` í tómri tímabundinni möppu, `git fetch --depth 1 https://github.com/kjassiturbo2/midflokkurinn-asynd <sha>`, `git checkout FETCH_HEAD` og eyddu síðan `.git`
2. `https://codeload.github.com/kjassiturbo2/midflokkurinn-asynd/zip/<sha>`
3. `https://github.com/kjassiturbo2/midflokkurinn-asynd/archive/<sha>.zip`

Ekki skipta aðeins út SKILL.md: tilvísanir, letur, merki og aðrar eignir verða að fylgja sömu útgáfu.

**d. Sannreyndu áður en þú notar pakkann:**

- Hafnaðu slóðum sem fara út fyrir tímabundnu möppuna og tákntenglum.
- SKILL.md er fyrir `midflokkurinn-asynd` og VERSION samsvarar athugaðri útgáfu.
- Allar eignir í `assets/manifest.json` (`copied_files`) eru til og passa við SHA-256 gildin. Íslensk skráarheiti geta verið NFC eða NFD; prófaðu bæði form áður en þú telur skrá vanta.

Við villu skaltu halda eldri uppsetningu óbreyttri.

**e. Settu upp:**

- Geymdu endurheimtanlegt afrit af núverandi skillmöppu utan virku möppunnar.
- Skiptu um útgáfu með uppsetningaraðferð umhverfisins, eða með því að endurnefna gömlu möppuna, færa nýju inn og eyða þeirri gömlu síðast. Takist skipti ekki skaltu endurheimta fyrri útgáfu.
- Ekki yfirskrifa þekktar sérbreytingar notandans án samráðs. Uppfærslan má ekki snerta önnur skill eða verkefnaskrár og veitir ekki undanþágu frá aðgangsheimildum umhverfisins.
- Ef skillmappan er skrifvarin skaltu nota sannreynda pakkann úr tímabundnu möppunni í þessu verkefni og bjóða notandanum að setja skillið upp aftur.

**f. Lestu nýja SKILL.md og viðeigandi tilvísanir** úr uppfærðu útgáfunni í núverandi samtali. Ekki halda áfram eftir eldri texta sem var þegar hlaðinn. Ef umhverfið getur ekki lesið uppfærðar leiðbeiningar í núverandi samtali skaltu biðja notandann að hefja nýtt samtal.

## 3. Þegar engin leið virkar: stöðvaðu og spurðu

Ef allar leiðir í skrefi 2 bregðast skaltu **ekki** halda áfram í hljóði. Áður en framleiðsla hefst skaltu segja notandanum:

- hvaða útgáfa er uppsett,
- hvaða leiðir þú reyndir og hvaða villu hver skilaði,

og spyrja hvort hann vilji að þú vinnir á uppsettu útgáfunni eða bíði meðan hann lagar netaðgang eða setur skillið upp aftur. Ef notandinn er ekki til svara (t.d. í tímasettu verki) skaltu vinna á uppsettu útgáfunni og setja þessar upplýsingar efst í niðurstöðuna.

Ekki segjast hafa uppfært án þess að hafa staðfest útgáfunúmerið eftir á. Keyrðu ekki athugunina aftur fyrir sama verkefni eftir að hún hefur tekist.

## Umhverfi án skráa eða skipanalínu

Í síma, vafra eða verkfæri sem getur ekki keyrt skipanir gilda sömu kröfur eftir því sem verkfærin leyfa. Sæktu VERSION af `raw.githubusercontent.com` með vefsóknarverkfæri og berðu saman. Ef nýrri útgáfa er til en þú getur ekki sett hana upp, eða ef þú getur ekki athugað, skaltu segja notandanum það áður en þú byrjar, samkvæmt skrefi 3.

## Viðhald safnsins

Við hverja birta breytingu á leiðbeiningum, skriftum eða eignum skillsins skal hækka VERSION. Sniðið er `ár.mánuður.dagur.raðnúmer`, t.d. `2026.10.12.2`. Útgáfuathugunin byggir á þessu númeri; breyting án hækkunar þess berst ekki sjálfkrafa til notenda. Breyting á README einu og sér þarf ekki nýtt útgáfunúmer.
