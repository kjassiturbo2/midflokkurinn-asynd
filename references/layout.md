# Umbrot kyrrmynda og auglýsingaspjalda

Þessi tilvísun gildir um auglýsingar, samfélagsmiðlamyndir, veggspjöld og titilspjöld þar sem texti og merki eru sett á flöt. Framleiðslureglan í SKILL.md segir hvaða efni á að nota; hér er fjallað um hvernig því er raðað.

Reglurnar eru almennt hönnunarmat og vinnureglur eiganda frá 21. október 2026, ekki opinber ásýndarhandbók. Þær eru sjálfgefin byrjun og yfirferð, ekki skylda. Tölurnar eru upphafsgildi sem má víkja frá með rökum, til dæmis fyrir ljósmynd, tilvitnun eða fundarboð með mörgum upplýsingum.

Fyrir samfélagsmiðlagrafík skaltu fyrst athuga hvort beiðnin fellur að einhverju [mynstranna](patterns.md): fullyrðing, ljósmynd með fyrirsögn, fjölmiðlaframkoma, viðburður, tilvitnun, tölur eða skýring. Mynstrin byggja á birtu efni flokksins og ganga framar almennu uppsetningunni hér að neðan. Grunnreglurnar og yfirferðin gilda um þau öll.

## Þegar efnið gefur ekki skýra uppsetningu

Það er í lagi að spyrja notandann áður en þú setur upp, til dæmis hvert aðalatriðið er, hvort merki flokksins eða staðbundið xM-merki eigi að bera undirskriftina eða í hvaða miðli myndin birtist. Spurðu aðeins um það sem breytir uppsetningunni og ekki þegar svarið liggur fyrir í beiðninni.

Það má líka skila tveimur útfærslum þegar tvær leiðir eru jafn góðar, til dæmis ein með stóra tölu sem aðalatriði og önnur með fullyrðinguna. Lýstu muninum í einni setningu. Ekki skila fleiri en tveimur nema beðið sé um það.

## Grunnreglur

1. **Eitt aðalatriði.** Veldu eina setningu, tölu eða orðasamband sem á að skiljast á um einni sekúndu í símastreymi. Allt annað styður það. Aðalatriðið er að minnsta kosti tvöfalt stærra en stuðningstexti.
2. **Þrjú stig mest.** Aðalatriði, stuðningur og undirskrift. Fleiri stærðir eða þyngdir rugla lesandann.
3. **Stærð ber áherslu, Sól styður hana.** Gyllt Sól á einstök orðasambönd, ekki heilar efnisgreinar. Litur einn og sér er of veik áhersla þegar allt annað er jafnstórt.
4. **Nálægð sýnir tengsl.** Flokkaðu það sem á saman. Bil milli hópa er að minnsta kosti þrefalt bil innan hóps. Ekki dreifa hlutum jafnt yfir flötinn til að fylla hann.
5. **Sjónræn miðja.** Skilaboðablokkin situr örlítið ofan við rúmfræðilega miðju. Texti sem er miðjaður nákvæmlega eða neðar virðist síga.
6. **Jafnar spássíur.** Sama spássía allan hringinn. Merki og undirskrift festast við spássíuna, ekki á lausum stað.
7. **Hástafir sparlega.** Stutt aðalatriði má vera í hástöfum. Stuðningstexti og lengri setningar eru í há- og lágstöfum, sem lesast hraðar.
8. **Línuskil eftir merkingu.** Brjóttu línur þar sem setningin andar. Ekki skilja eftir stakt smáorð („um“, „í“, „og“) í línuenda ef hægt er að komast hjá því.
9. **Ein undirskrift.** Þegar staðbundið xM-merki er notað neðst verður merki flokksins efst lítið eða því er sleppt. Slagorð og xM mynda saman undirskriftarhóp.
10. **Jafnt línubil innan hóps.** Notaðu sömu leturstærð og línuhæð fyrir allar línur sama stigs. Ekki stækka eina línu um fáein pixla.
11. **Láttu umbrotið útskýra.** Slepptu óþörfum merkimiðum og skýringartextum. Staður, tími, nafn og hlutverk skiljast af stærð, röð og flokkun, svo „Staður:“, „Tími:“, „Ræðumaður:“, yfirskriftir á borð við „Fundur“ fyrir ofan fundarheiti eða skýringarlína sem endursegir aðalatriðið eru óþörf. Bættu aðeins við merkimiða þegar merkingin yrði annars óljós, til dæmis tvær tímasetningar eða tveir staðir, eða þegar notandinn biður um hann. Lögbundnar merkingar og upplýsingar sem notandinn lét fylgja haldast.

## Sjálfgefin uppsetning: þrír hópar

Þegar ekkert annað liggur fyrir hentar þessi röðun fyrir texta á litaflöt:

| Hópur | Staðsetning | Letur |
|---|---|---|
| Merki | Efst við spássíu, lítið | Upprunalegt merki úr assets/logos |
| Skilaboð | Miðja blokkar við 40–48% hæðar | Aðalatriði í Roboto Black, hástafir; stuðningur í Blacker Pro Display Condensed Regular, há- og lágstafir (Roboto Bold fyrir tölur og staðreyndir) |
| Undirskrift | Neðst við spássíu | Undirskriftarlás (xM, lína og „ÞAÐ MUNAR UM MIÐFLOKKINN“, sjá [mynstrin](patterns.md#sameiginlegir-hlutar)) eða staðbundið xM-merki úr assets/regional |

Upphafsgildi á 1080 px breidd:

| Snið | Stærð | Spássía | Aðalatriði | Stuðningur | Undirskrift |
|---|---|---|---|---|---|
| 3:4 færsla (sjálfgefin) | 1080 × 1440 | 60–108 px | 110–145 px | 60–72 px | lás um 640 × 94 px |
| 1:1 færsla | 1080 × 1080 | 60–100 px | 96–120 px | 52–64 px | lás um 550 × 94 px |
| 9:16 Story/Reel | 1080 × 1920 | 60–96 px á hliðum | 120–150 px | 60–72 px | lás um 640 × 94 px |
| 4:5 færsla (aðeins ef beðið er um) | 1080 × 1350 | 88–108 px | 110–140 px | 56–68 px | lás um 600 × 90 px |

Aðrar stærðir í birtu efni: Facebook-forsíða 1640 × 720 og 16:9 fyrir YouTube 1920 × 1080. Fyrir Facebook-viðburðarborða skaltu staðfesta núverandi viðmið Meta áður en þú setur upp.

Leturstærðirnar eru heildarstærð leturs, ekki hástafahæð. Blacker er þéttara og lægra en Roboto í sömu stærð, svo stuðningstexti í Blacker er settur stærri en sami texti væri í Roboto Bold. Langt aðalatriði fer í minni stærð frekar en þrjár línur.

## Birtingarsvæði

- **3:4 (1080 × 1440)** er sjálfgefin færsla. Hún birtist óskorin bæði í streymi og í 3:4 prófílneti Instagram og er það snið sem flokkurinn notar mest.
- **4:5 í streymi** sýnir alla myndina, en prófílnetið sker um 67 px af hvorri hlið á 1080 × 1350. Haltu texta innan þess svæðis ef 4:5 er notað.
- **9:16** er hulið af viðmóti efst og neðst. Upphafsgildi: um 250 px efst og 340–420 px neðst án texta eða merkja. Mörkin eru breytileg eftir miðli og tíma, sjá [myndbandsverkhlutann](video.md) um mat á viðmóti.
- **1:1 og 9:16** eru sjálfstæð umbrot, ekki útskurður úr 3:4.

Staðfestu nýjustu viðmið miðils ef nákvæm mörk skipta máli.

## Dæmi

Auglýsing fyrir Hafnarfjörð (október 2026) var sett upp með merki efst, sjö línum af Roboto Black hástöfum í sömu stærð og xM-merki neðst. Bilin voru 330 px frá merki að texta, 114 px frá fyrirsögn að slagorði og 203 px frá slagorði að xM. Textinn virtist síga og ekkert stóð upp úr. Betra umbrot:

- Stuðningur í Bold, há- og lágstöfum: „Meirihlutinn hefur fallið frá áformum um“
- Aðalatriði í Black og Sól, um 136 px á tveimur línum: „260 ÍBÚÐA / GÁMABYGGÐ“
- Stuðningur: „í Hafnarfirði“
- Undirskriftarhópur neðst: „Það munar um Miðflokkinn“ ásamt xM Hafnarfjörður

## Yfirferð fyrir afhendingu

Skoðaðu útfluttu myndina og svaraðu þessu. Ef svar er nei skaltu laga það eða geta þess hvers vegna frávikið er viljandi.

- Er eitt atriði greinilega stærst, að minnsta kosti tvöfalt stærra en annar texti?
- Eru leturstig þrjú eða færri?
- Er hvert bil milli hópa greinilega stærra en hvert bil innan hóps? Er ekkert tómt svæði stærra en skilaboðablokkin sjálf án tilgangs?
- Er línubil jafnt innan hvers hóps?
- Situr miðja skilaboðablokkar ofan við miðju, um 40–48% hæðar?
- Er allur texti innan spássíu og birtingarsvæðis viðkomandi sniðs?
- Er aðeins ein undirskrift í fullri stærð?
- Er hver merkimiði og skýringartexti nauðsynlegur, eða myndi umbrotið eitt segja það sama?
- Skilst auglýsingin þegar hún er smækkuð í 270 px breidd?
