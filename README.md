# Ásýnd Miðflokksins

Skill fyrir myndbandsklippingu, íslenska textun og ásýnd Miðflokksins í myndum, myndböndum, vefjum og öðru efni. Myndbandsverkhlutinn fylgir með í sama pakka; ekki þarf að setja upp annað skill.

> [!IMPORTANT]
> Ekki reyna að klippa eða gera myndir í síma eða vafra. Notaðu forrit sem þú sækir í tölvuna þína, hvort sem það er Claude Desktop eða ChatGPT desktop/Codex.

## Uppsetning

Láttu gervigreindina þína fá þessi skilaboð:

```text
Settu upp þennan skill: https://github.com/kjassiturbo2/midflokkurinn-asynd
```

Þetta virkar í gervigreindarverkfærum sem styðja uppsetningu skills.

## Notkun

Eftir uppsetningu geturðu til dæmis sagt:

```text
Notaðu midflokkurinn-asynd skillið til að gefa þessu efni ásýnd Miðflokksins.
```

## Dæmi sem þú getur prófað

Afritaðu eitt af dæmunum hér fyrir neðan inn í samtalið við gervigreindina. Breyttu stað, tíma og öðrum upplýsingum eftir þörfum. Þegar þú vilt nota mynd af þér skaltu hengja hana við sömu skilaboð, til dæmis með bréfaklemmunni eða plúsmerkinu við textareitinn.

### Klippa ræðubrot

```text
Notaðu midflokkurinn-asynd til að klippa meðfylgjandi upptöku í stutt
myndband um [viðfangsefni]. Leggðu áherslu á [ræðumann eða atriði].
Veldu skýrt upphaf, þéttu hik og langar þagnir og textaðu á íslensku.
Varðveittu samhengi og mikilvæga fyrirvara.
```

Sjálfgefið fær stutt ræðubrot lóðrétt 9:16 snið, hóflegan skurð, lítið flokksmerki og hvítan íslenskan skjátexta með svörtum útlínum. Þú getur beðið um annað. Ef skjal á að birtast með talinu skaltu láta það fylgja og segja hvaða atriði á að sýna.

### Auglýsing fyrir fund

```text
Gerðu auglýsingu fyrir fund á þriðjudaginn kl. 19:30 á Hótel Borg.
Notaðu midflokkurinn-asynd. Hér er mynd af mér fyrir auglýsinguna. Hafðu
stað og tíma áberandi og textann auðlesinn í síma. Spurðu mig um
dagsetningu, nafn og fundarefni áður en þú klárar.
```

### Stutt myndband fyrir Story eða Reel

9:16 er lóðrétt snið sem fyllir símaskjáinn, eins og í Story eða Reel á Instagram og Facebook.

```text
Búðu til 15 sekúndna myndband í lóðréttu 9:16 sniði fyrir Story eða
Reel. Notaðu midflokkurinn-asynd og myndina sem ég læt fylgja. Auglýstu
fund á Hótel Borg á þriðjudaginn kl. 19:30. Hafðu stóran, skýran texta
og rólegar hreyfingar. Láttu stað og tíma sjást í lokin nógu lengi til
að hægt sé að lesa þau. Spurðu mig um nákvæma dagsetningu og fundarefni
fyrst.
```

### Mynd með tilvitnun

```text
Gerðu ferkantaða mynd fyrir Facebook og Instagram. Notaðu
midflokkurinn-asynd og myndina af mér sem fylgir. Settu þessa tilvitnun
á myndina: „[Settu þína tilvitnun hér]“. Settu nafnið mitt fyrir neðan:
[nafnið þitt]. Hafðu textann stóran og ekki láta hann hylja andlitið.
```

### Sama auglýsing í fleiri stærðum

```text
Notaðu midflokkurinn-asynd og gerðu tvær útgáfur af auglýsingunni sem
fylgir: ferkantaða mynd fyrir færslu og lóðrétta 9:16 mynd fyrir Story.
Haltu sama texta og sömu mynd, en lagaðu uppsetninguna að hvorri stærð
svo allt sé auðlesið.
```

### Einfaldar glærur fyrir fund

```text
Búðu til fimm glærur úr punktunum sem ég set hér fyrir neðan. Notaðu
midflokkurinn-asynd. Hafðu eina meginhugmynd á hverri glæru, stórt letur
og lítinn texta. Hér eru punktarnir: [Settu punktana þína hér].
```

Þú þarft ekki að fá allt rétt í fyrstu tilraun. Þú getur haldið áfram í sama samtali og sagt til dæmis: „Stækkaðu tímann“, „Hafðu minni texta“ eða „Notaðu þessa mynd í staðinn“.

Skillið leiðbeinir um klippingu og ásýnd. Raunveruleg framleiðsla og talgreining krefjast viðeigandi verkfæra í umhverfinu þínu. Letur og merki fylgja pakkanum. Valfrjálst hjálparforrit fyrir tímasetningar notar aðeins Python 3 og engar viðbótapakkningar; það er ekki myndbandsritill.

## Hvernig grafíkin er gerð

Skillið krefst þess að auglýsingar séu settar saman með réttu letri, upprunalegum merkjum og raunverulegum ljósmyndum. Það á ekki að láta myndlíkan teikna heila auglýsingu eða skálda merki og staðhætti. Ef gervigreindarverkfærið þitt getur ekki sett grafíkina saman á þennan hátt á það að segja það.

## Uppfærslur

Skillið skyldar gervigreindina til að athuga GitHub í upphafi hvers nýs verkefnis og sækja nýrri útgáfu áður en hún byrjar. Uppfærsluskriftan `scripts/update_skill.py` prófar nokkrar leiðir, því sum umhverfi loka á eina slóð til GitHub en leyfa aðra. Ef engin leið virkar á gervigreindin að stöðva og spyrja þig áður en hún vinnur á eldri útgáfu.

Ef þú settir skillið upp áður en þessi uppfærsluregla bættist við þarftu að uppfæra það einu sinni. Láttu gervigreindina fá þessi skilaboð:

```text
Uppfærðu midflokkurinn-asynd skillið mitt í nýjustu útgáfu frá https://github.com/kjassiturbo2/midflokkurinn-asynd
```
