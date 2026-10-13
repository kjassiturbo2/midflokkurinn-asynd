---
name: midflokkurinn-asynd
description: Create and edit Miðflokkurinn-branded videos and visual materials. For video and speech clips, select and sequence excerpts, tighten pauses, reframe, subtitle Icelandic speech, and add requested source-document inserts while preserving meaning. Use real typography and supplied brand assets. Use when this skill or Miðflokkurinn branding is requested; a mere mention of the party does not trigger it.
---

# Ásýnd Miðflokksins

Samræmdu umbeðið efni ásýnd Miðflokksins. Skillinn geymir liti, letur og upprunaleg merki úr ásýndarpakka notandans, ásamt staðfestri notkun á midflokkurinn.is frá 8. október 2026.

## Fyrsta skref í hverju verkefni: athuga uppfærslu

Áður en þú notar ásýndarreglurnar skaltu athuga hvort ný útgáfa sé á GitHub samkvæmt [uppfærsluleiðbeiningunum](references/updates.md). Gerðu þetta við hverja nýja virkjun skillsins, líka í nýju verkefni innan sama samtals; ekki fyrir hverja smáleiðréttingu í yfirstandandi verkefni. Sæktu nýrri útgáfu þegar umhverfið leyfir og lestu uppfærðar leiðbeiningar áður en þú heldur áfram. Ef athugunin tekst ekki skaltu segja það stuttlega og nota uppsettu reglurnar, án þess að fullyrða að þær séu nýjustu reglurnar.

## Veldu réttan grunn

- Lestu [ásýndarreglurnar](references/identity.md) áður en þú hannar. Þar eru opinberar litareglur aðgreindar frá athugunum á vefnum og tillögum að útfærslu.
- Fyrir klippingu myndbanda og ræðubrota skaltu lesa [myndbandsverkhlutann](references/video.md): efnisval og röð, þétting tals, skurður, íslensk textun, heimildarinnskot, samstilling og lokayfirferð. Verkhlutinn er hluti af þessu skilli og krefst ekki annars skills. Sérstakar óskir notanda ganga framar sjálfgefnum vinnureglum.
- Fyrir myndir eða vefi skaltu lesa viðeigandi kafla í [miðlaleiðbeiningunum](references/media.md).
- Nákvæm stílgildi eru í [assets/tokens.json](assets/tokens.json). Vefstílar og staðbundnar leturvísanir eru í [assets/brand.css](assets/brand.css).
- Veldu raunverulegt merki úr [eignayfirlitinu](references/assets.md). Allar eignir eru innifaldar í skillinum; ekki byggja á því að upprunamappan sé áfram á sama stað.

## Kjarni ásýndarinnar

Nótt `#0f234c` er ríkjandi litur. Fönn `#ffffff` er hvítur. Sól `#dbb765` dregur fram lykilorð og áherslur. Notaðu aðra liti samkvæmt hlutverkum þeirra í litaskjalinu.

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
- Skoðaðu lokaútkomu á raunverulegri birtingarstærð. Fyrir myndband skaltu skoða bæði inn- og útgang hreyfinga og mynd eftir að tímabundnir titlar hverfa.
- Fylgdu breytingum sem notandinn biður um í tilteknu verkefni. Gerðu einstaka ósk um lengd, staðsetningu eða merkingar ekki að nýrri almennri ásýndarreglu.

## Heimildir og viðhald

[Heimildaskráin](references/sources.md) segir hvaðan hver regla kemur. Litaskjal pakkans ræður nákvæmum vörumerkjalitum; vefurinn sýnir notkun. Við árekstur skaltu lýsa honum og fylgja nýjustu skýru fyrirmælum notandans. Ekki taka almenna WordPress-liti, viðbótaliti eða ósamræmi í aukahlutum vefsins upp sem nýja ásýnd.

Þegar beðið er um nýjustu ásýnd eða vefurinn hefur breyst skaltu endurstaðfesta viðeigandi atriði. Ekki þarf að endurskoða vefinn fyrir hverja venjulega framleiðslu úr þessum pakka.
