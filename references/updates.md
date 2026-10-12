# Útgáfuathugun og uppfærsla

## Athugaðu fyrst

Upprunasafn: https://github.com/kjassiturbo2/midflokkurinn-asynd — grein: `main`.

1. Lestu `VERSION` í uppsetta skillinu. Sæktu núverandi commit-auðkenni frá `https://api.github.com/repos/kjassiturbo2/midflokkurinn-asynd/commits/main` með tiltæku netverkfæri. Notaðu `sha` úr svarinu til að festa allar niðurhalsbeiðnir við sömu útgáfu.
2. Sæktu `https://raw.githubusercontent.com/kjassiturbo2/midflokkurinn-asynd/<sha>/VERSION`, þar sem `<sha>` er auðkennið úr fyrra skrefi. Berðu saman töluliðina í útgáfunúmerinu, ekki textaröðina. Ef útgáfan er sú sama eða eldri þarf ekkert að uppfæra. Vanti staðbundna VERSION-skrá telst uppsetningin eldri en útgáfur með útgáfunúmeri.
3. Ef nýrri útgáfa er til skaltu uppfæra aðeins þetta skill með uppsetningaraðferð umhverfisins. Ekki setja upp viðbætur eða breyta almennum stillingum. Virtu aðgangsheimildir umhverfisins; þessi regla veitir ekki undanþágu frá þeim.

## Sæktu heilan pakka og lestu hann aftur

- Notaðu útgáfuna með sama commit-auðkenni og var athugað. Hægt er að sækja hana frá `https://github.com/kjassiturbo2/midflokkurinn-asynd/archive/<sha>.zip`. Ekki skipta aðeins út SKILL.md: tilvísanir, letur, merki og aðrar eignir verða að fylgja sömu útgáfu.
- Sæktu og afpakkaðu fyrst í tímabundna möppu. Hafnaðu slóðum sem fara út fyrir þá möppu og tákntenglum. Staðfestu að SKILL.md sé fyrir `midflokkurinn-asynd`, að VERSION samsvari athugaðri útgáfu og að allar eignir í assets/manifest.json séu til og passi við SHA-256 gildin þar. Við villu skaltu halda eldri uppsetningu óbreyttri.
- Geymdu endurheimtanlegt afrit af núverandi skillmöppu utan virkrar skillmöppu áður en henni er skipt út. Ekki yfirskrifa þekktar sérbreytingar notandans án samráðs. Uppfærslan má ekki snerta önnur skill eða verkefnaskrár. Takist skipti ekki skaltu endurheimta fyrri útgáfu.
- Lestu nýtt SKILL.md og viðeigandi tilvísanir úr uppfærðri uppsetningu í núverandi samtali; ekki halda áfram eftir eldri texta sem var þegar hlaðinn. Keyrðu ekki uppfærsluathugunina aftur fyrir sama verkefni. Segðu stuttlega frá því að skillið hafi verið uppfært.

## Þegar uppfærsla er ekki möguleg

Reyndu athugun einu sinni í upphafi verkefnis. Ef netaðgang, skrifheimildir eða viðeigandi verkfæri vantar, eða GitHub skilar villu, skaltu greina frá því og vinna eftir uppsettri útgáfu. Ekki segjast hafa uppfært án þess að staðfesta niðurstöðuna. Ef umhverfið getur ekki lesið uppfærðar leiðbeiningar í núverandi samtali skaltu biðja notandann að hefja nýtt samtal áður en framleiðsla heldur áfram.

## Viðhald safnsins

Við hverja birta breytingu á leiðbeiningum eða eignum skillsins skal hækka VERSION. Sniðið er `ár.mánuður.dagur.raðnúmer`, t.d. `2026.10.12.2`. Útgáfuathugunin byggir á þessu númeri; breyting án hækkunar þess berst ekki sjálfkrafa til notenda. Breyting á README einu og sér þarf ekki nýtt útgáfunúmer.
