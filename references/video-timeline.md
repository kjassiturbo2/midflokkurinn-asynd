# Sameiginleg klippingaráætlun

Valfrjálst hjálparforrit: [compile_video_timeline.py](../scripts/compile_video_timeline.py). Það notar aðeins staðlað Python 3, les hvorki myndband né net og keyrir ekki innihald áætlunarinnar sem skipanir. Það getur því unnið á Windows, macOS og Linux með tiltæku Python 3. Python-forritið getur heitið `python3`, `python` eða `py -3`; finndu tiltæka keyrslu í umhverfi notanda.

## Inntak

JSON-skrá með `clips` í þeirri röð sem á að birta. Hver færsla lýsir einum samfelldum varðveittum kafla. Ef tekið er út hik innan kafla þarf að skipta honum í fleiri færslur og laga textann við mörkin.

- `source`: tilvísun í upprunaskrá. Notaðu helst verkefnishlutfallslega slóð, miðað við möppu áætlunarinnar. Hjálparforritið flytur tilvísunina óbreytta í kortið; myndbandsritillinn þarf að leysa hana og staðfesta skrána.
- `start`, `end`: sekúndur í upprunaupptöku, upphaf meðtalið og lok ekki meðtalin.
- `encoded_duration`: valfrjáls, raunveruleg lengd útflutts kafla í sekúndum. Hún ræður hvar næsti kafli byrjar. Án hennar er notað `end - start`, sem er áætlun þar til útflutningur hefur verið mældur. Þetta gildi er ekki aðferð til að hraða eða hægja á tali.
- `captions`: yfirfarinn texti fyrir þennan kafla. `start` og `end` hvers texta eru **miðað við upphaf kaflans**, ekki upphaf upprunaskrár eða lokaútgáfu. Texti þarf að passa við talið sem verður eftir. Settu línuskipti með `\n`.

Dæmi með tveimur upptökum; fyrri kaflinn er 3 sekúndur og sá síðari 2,5 sekúndur:

```json
{
  "clips": [
    {
      "source": "inputs/raeda.mp4",
      "start": 12.0,
      "end": 15.0,
      "encoded_duration": 3.0,
      "captions": [
        {"start": 0.1, "end": 2.8, "text": "Hver er kostnaðurinn?"}
      ]
    },
    {
      "source": "inputs/svar.mp4",
      "start": 8.0,
      "end": 10.5,
      "encoded_duration": 2.5,
      "captions": [
        {"start": 0.0, "end": 2.3, "text": "Það þarf að meta hann."}
      ]
    }
  ]
}
```

## Keyrsla og úttak

Keyrðu `compile_video_timeline.py` úr `scripts/` í uppsetta skillinu. Gefðu slóð áætlunar og nýja vinnumöppu með `--output-dir`. Dæmi þegar staðið er í skillmöppunni og Python heitir `python3`:

```sh
python3 scripts/compile_video_timeline.py /path/to/project/plan.json --output-dir /path/to/project/work/timing-v1
```

Skiptu dæmislóðunum út fyrir raunverulegar slóðir verkefnis. Ekki gera ráð fyrir ákveðnu notandanafni eða uppsetningarmöppu. Slóðir með bilum þarf að setja í gæsalappir í skipanalínu eða senda sem aðskilin viðföng með keyrslutóli.

Forritið skrifar:

- `timeline.json`: upprunatímar, tímar í lokaútgáfu, lengd og endurtímasett textun.
- `subtitles.srt`: UTF-8 textun í nýrri röð. SRT geymir hvorki ásýnd né orðtíma. Sjálfgefinn [veed-texti](veed-texti.md) þarf sérstakt gagnasafn með upphafi og lokum hvers orðs, endurreiknað með sama klippikorti; SRT dugar eitt og sér aðeins fyrir Roboto-textun sem notandi hefur beðið um sérstaklega (samkvæmt video.md).

Það hafnar ógildum tímum, textun utan kafla, skörun texta innan kafla og yfirskrift fyrri úttaksskráa. Það staðfestir ekki innihald tals, merkingu endurröðunar eða að skráartilvísanir séu aðgengilegar. Eftir breytingu á köflum þarf að keyra það aftur og láta sömu áætlun stýra mynd og hljóði. Tímasettu innskot út frá kortinu og yfirfarðu hreyfingar sérstaklega.
