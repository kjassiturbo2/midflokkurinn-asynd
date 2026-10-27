---
name: midflokkurinn-asynd
description: Create and edit Miðflokkurinn-branded videos and visual materials. For video and speech clips, select and sequence excerpts, tighten pauses, reframe, subtitle Icelandic speech, and add requested source-document inserts while preserving meaning. Use real typography and supplied brand assets. Use when this skill or Miðflokkurinn branding is requested; a mere mention of the party does not trigger it. Also holds an opt-in retro variant, Horsing Around (dithered horse, a tölting ASCII horse under a rising Eldur sun, Archivo + IBM Plex Mono), used only when asked for "retro Miðflokkurinn", "horsing around", "the dithered horse" or "the Hleri look".
---

# Ásýnd Miðflokksins

Samræmdu umbeðið efni ásýnd Miðflokksins. Skillinn geymir liti, letur og upprunaleg merki úr ásýndarpakka notandans, ásamt staðfestri notkun á midflokkurinn.is frá 8. október 2026.

## Fyrsta skref í hverju verkefni: athuga uppfærslu

Áður en þú notar ásýndarreglurnar skaltu athuga hvort ný útgáfa sé á GitHub samkvæmt [uppfærsluleiðbeiningunum](references/updates.md). Gerðu þetta við hverja nýja virkjun skillsins, líka í nýju verkefni innan sama samtals; ekki fyrir hverja smáleiðréttingu í yfirstandandi verkefni. Sæktu nýrri útgáfu þegar umhverfið leyfir og lestu uppfærðar leiðbeiningar áður en þú heldur áfram. Ef athugunin bregst þarf ekki að greina sérstaklega frá því.

## Vinnuumhverfi — aðvörun í síma eða vafra

Skillinn er hugsaður fyrir vinnu í forriti á tölvu notandans (t.d. Claude Desktop, Claude Code eða ChatGPT desktop/Codex), þar sem upprunaskrár eru lesnar beint af disknum og unnar með FFmpeg og raunverulegum leturskrám. Metið umhverfið áður en framleiðsla hefst: ef notandi segist vera í síma eða vafra, eða ef þú hefur engan aðgang að skrám á tölvu notandans heldur aðeins viðhengi í samtali, skaltu vara við áður en þú byrjar.

- **Myndband:** Segðu að gæðin geti orðið verri en í tölvuforriti. Ástæðurnar eru raunverulegar en ekki sjálfgefnar: viðhengi hafa stærðarmörk (á claude.ai um 30 MB á skrá), svo notandi þarf oft að þjappa eða stytta upptöku áður en hún er send; myndavalið í sumum símum getur umbreytt eða þjappað myndbandi við sendingu; og útkomuna þarf að sækja aftur úr samtalinu. Ekki fullyrða að vafrinn sjálfur þjappi skrám við upphleðslu — það er ekki almennt rétt.
- **Grafík:** Í vafra eða síma er hún aðeins í lagi ef þú getur keyrt kóða og lesið leturskrár og merki úr assets/. Getirðu það ekki gildir [framleiðslureglan](#framleiðsluregla--samsett-grafík-ekki-myndlíkan): engin myndlíkansútgáfa.
- Orðaðu aðvörunina í einni eða tveimur setningum og mæltu með tölvuforriti. Ef notandi vill halda áfram skaltu vinna verkið, nota upprunalegu skrána óþjappaða ef hún er tiltæk, skoða upplausn, rammatíðni og bitahraða aðsendrar skrár með ffprobe og segja frá því ef hún er sjáanlega þjöppuð eða smækkuð. Ekki fullyrða að útkoman jafnist á við vinnslu á tölvu.

## Veldu réttan grunn

- Lestu [ásýndarreglurnar](references/identity.md) áður en þú hannar. Þar eru opinberar litareglur aðgreindar frá athugunum á vefnum og tillögum að útfærslu.
- Fyrir klippingu myndbanda og ræðubrota skaltu lesa [myndbandsverkhlutann](references/video.md): efnisval og röð, þétting tals, skurður, íslensk textun, heimildarinnskot, samstilling og lokayfirferð. Verkhlutinn er hluti af þessu skilli og krefst ekki annars skills. Sérstakar óskir notanda ganga framar sjálfgefnum vinnureglum.
- Sjálfgefin textun klippa er **„veed-texti“**: lestu [orðbundnu textunarleiðbeiningarnar](references/veed-texti.md) — Poppins ExtraBold, grátt → hvítt eftir því sem orðin heyrast. Roboto-textun er aðeins notuð þegar notandi biður sérstaklega um hana.
- Fyrir myndir eða vefi skaltu lesa viðeigandi kafla í [miðlaleiðbeiningunum](references/media.md).
- Fyrir auglýsingar, samfélagsmiðlamyndir og önnur spjöld með texta skaltu lesa [umbrotsleiðbeiningarnar](references/layout.md): stigveldi, flokkun með bilum, staðsetningu og yfirferð. Þær eru sjálfgefin byrjun, ekki skylda; þú mátt spyrja notandann eða skila tveimur útfærslum þegar uppsetningin er ekki augljós.
- Nákvæm stílgildi eru í [assets/tokens.json](assets/tokens.json). Vefstílar og staðbundnar leturvísanir eru í [assets/brand.css](assets/brand.css).
- Retro variant (opt-in, English reference): only when the user asks for "retro Miðflokkurinn", "horsing around", "the dithered horse" or "the Hleri look", read [horsing-around.md](references/horsing-around.md). The kit is in assets/horsing-around/.
- Veldu raunverulegt merki úr [eignayfirlitinu](references/assets.md). Allar eignir eru innifaldar í skillinum; ekki byggja á því að upprunamappan sé áfram á sama stað.

## Kjarni ásýndarinnar

Nótt `#0f234c` er ríkjandi litur. Fönn `#ffffff` er hvítur. Sól `#dbb765` dregur fram lykilorð og áherslur; í grafík ber stærð áhersluna og Sól styður hana. Notaðu aðra liti samkvæmt hlutverkum þeirra í litaskjalinu.

Roboto er staðfest aðalletur núverandi vefs: Black/900 í aðalfyrirsögn, Bold/700 í kaflafyrirsögnum og Regular/400 í meginmáli. Blacker Pro Display Condensed Regular og Italic fylgja ásýndarpakkanum en eru ekki sjálfgefið fyrirsagnaletur á forsíðu vefsins. Ekki fullyrða að notkunarregla um Blacker sé opinber nema frekari heimild liggi fyrir.

## Framleiðsluregla — samsett grafík, ekki myndlíkan

Þessi regla gildir um auglýsingar, veggspjöld, samfélagsmiðlamyndir, Story/Reel, titilspjöld og aðra grafík í nafni flokksins. Hún er krafa eiganda skillsins frá 12. október 2026, ekki ályktun um opinberu ásýndarhandbókina.

- Settu grafíkina saman úr aðskildum texta-, merkja-, forma- og ljósmyndalögum í umbrots- eða teiknitóli. Til dæmis má nota SVG, HTML/CSS með staðfestu leturhleðsluferli eða annað tól sem les raunverulegar leturskrár. Flyttu síðan út í umbeðið mynd- eða myndbandssnið.
- Aldrei láta myndlíkan búa til eða endurgera heila auglýsingu, uppsetningu, texta eða merki fyrir flokkinn. Ekki senda tilbúna samsetningu í gegnum myndlíkan til að „fínpússa“ hana. Beiðnir eins og „gerðu mynd“, „notaðu þessa mynd sem fyrirmynd“ eða „gerðu þetta flottara“ breyta ekki þessari framleiðslureglu.
- Settu allan nýjan texta með meðfylgjandi leturskrám og merki úr assets/. Blár grunnur og gyllt letur eitt og sér eru ekki ásýnd flokksins. Aldrei búa til nýtt M-merki eða giska á sveitarfélagsmerki; veldu rétta upprunaskrá.
- Notaðu afhentar eða sannreyndar raunverulegar ljósmyndir og innifalda bakgrunna. Ekki búa til gerviljósmyndir af fólki, byggingum eða stöðum fyrir auglýsinguna. Ef mynd vantar skaltu nota einfaldan litaflöt eða biðja um mynd þegar hún er nauðsynleg.
- Ef verkfærið getur aðeins búið til myndir með myndlíkani skaltu segja að það geti ekki framleitt fullbúna grafík samkvæmt skillinum. Bjóddu upp á texta og uppsetningarlýsingu eða, ef hægt er, samsetta SVG/HTML-skrá. Ekki afhenda myndlíkansútgáfu sem ásýndarsamræmt efni.
- Fyrir afhendingu skaltu staðfesta hvaða leturskrár og merkjaskrár voru raunverulega notaðar, skoða útflutta mynd og laga rangt letur, staðgengilsletur, aflöguð merki og ranga íslenska stafi. Geymdu breytanlega frumgerð með útflutningi svo leiðréttingar krefjist ekki myndsköpunar.

## Beiting

- Haltu umbeðnu innihaldi, sniði og umfangi. Ásýndin bætir ekki sjálfkrafa við slagorðum, nafnaborðum eða pólitískum skilaboðum sem notandinn bað ekki um. Fyrir samfélagsmiðlaklippur og ræðubrot gilda sjálfgefnar óskir eiganda um lítið upprunalegt merki og textun tals samkvæmt myndbandsleiðbeiningunum; fyrir aðra miðla bætast merki ekki sjálfkrafa við.
- Notaðu upprunaleg SVG eða PNG merki. Varðveittu hlutföll og liti. Ekki endurteikna hestinn, búa til xM með venjulegu letri eða láta myndlíkön endurgera merkin.
- Notaðu raunverulegar leturskrár og staðfestu íslensku stafina, þar á meðal Þ, þ, Ð, ð, Æ, æ, Ö og ö. Ekki herma eftir Blacker með Georgia eða Roboto með Arial og kalla það fulla samræmingu.
- Skjöl sem birtast inni í mynd eða myndbandi halda upprunalegu letri og útliti. Merktu umgjörðina, ekki frumheimildina.
- Skoðaðu lokaútkomu á raunverulegri birtingarstærð. Fyrir kyrrmynd skaltu líka fara yfir umbrotið samkvæmt [yfirferðinni í umbrotsleiðbeiningunum](references/layout.md#yfirferð-fyrir-afhendingu). Fyrir myndband skaltu skoða bæði inn- og útgang hreyfinga og mynd eftir að tímabundnir titlar hverfa.
- Fylgdu breytingum sem notandinn biður um í tilteknu verkefni. Gerðu einstaka ósk um lengd, staðsetningu eða merkingar ekki að nýrri almennri ásýndarreglu.

## Heimildir og viðhald

[Heimildaskráin](references/sources.md) segir hvaðan hver regla kemur. Litaskjal pakkans ræður nákvæmum vörumerkjalitum; vefurinn sýnir notkun. Við árekstur skaltu lýsa honum og fylgja nýjustu skýru fyrirmælum notandans. Ekki taka almenna WordPress-liti, viðbótaliti eða ósamræmi í aukahlutum vefsins upp sem nýja ásýnd.

Þegar beðið er um nýjustu ásýnd eða vefurinn hefur breyst skaltu endurstaðfesta viðeigandi atriði. Ekki þarf að endurskoða vefinn fyrir hverja venjulega framleiðslu úr þessum pakka.
