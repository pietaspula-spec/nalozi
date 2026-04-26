# Adriatic Nalozi - Technical Notes

Ovaj dokument je namijenjen programeru koji preuzima admin aplikaciju.

## Svrha aplikacije

`nalozi` je admin alat za upravljanje fotografima, nalozima, obracunima i izvjestajima.

Koristi se za:

- pregled fotografa
- dodjelu i izmjenu naloga
- obracun po poslu
- mjesecne i zbirne izvjestaje
- lokalne admin postavke
- realtime pregled promjena

## Glavna arhitektura

Kao i `fotopro`, aplikacija je gotovo cijela u jednom `index.html`.

Unutra su:

- struktura sucelja
- stilovi
- JavaScript logika

Glavne datoteke:

- `index.html`
- `help.html`
- `sw-nalozi.js`
- `manifest-nalozi.json`

Nema bundlera ni frameworka. Kod je jednostavan za otvaranje, ali je velik i povezan, pa su regresije moguce ako se diraju modeli podataka.

## Login i autorizacija

Prijava ide preko Supabase Auth, ali login sam po sebi nije dovoljan.

Nakon prijave aplikacija dodatno provjerava:

- postoji li korisnik u admin tablici
- ima li pravo pristupa admin aplikaciji

Ako korisnik nije admin, pristup se odbija i ne bi smio vidjeti glavni radni ekran.

## Glavni prikaz

Sucejlje je organizirano oko:

- liste fotografa
- radnog dijela za odabranog fotografa
- tabova `Nalozi`, `Obracun`, `Izvjestaji`

To znaci da vecina promjena ovisi o trenutno odabranom fotografu i njegovom skupu podataka.

## Model naloga

Nalog sadrzi vise polja, npr.:

- sifra objekta
- broj ugovora
- kontakt
- adresa
- GPS
- broj smjestajnih jedinica
- link
- napomena agencije

Bitno:

- dio polja uredjuje admin
- dio polja dopunjuje fotograf u `fotopro` aplikaciji
- sinkronizacija izmedju aplikacija koristi merge logiku

Ako se model mijenja, treba paralelno provjeriti i `fotopro`.

## Obracun

Tab `Obracun` koristi podatke naloga i dodatne financijske unose:

- broj kategorija
- kilometri
- dron
- akvizicija
- otkaz
- ostali troskovi
- datum kontaktiranja
- datum isporuke
- verifikacija

Izracun se oslanja na:

- globalne naknade
- porezne postavke po fotografu

To znaci da promjena fee modela utjece i na admin pregled i na usporedbu s fotografskom aplikacijom.

## Izvjestaji

Tab `Izvjestaji` sluzi za:

- pregled po mjesecu
- pregled po fotografu
- Excel export
- Print/PDF
- batch print

Kod promjena izvjestaja treba paziti:

- da eksport koristi ista polja kao UI
- da aggregate logika ne odstupi od obracuna
- da filteri po mjesecu i fotografu ostanu uskladeni

## Realtime

Aplikacija koristi Supabase realtime za osvjezavanje promjena.

To omogucuje da admin vidi:

- promjene koje fotograf napravi
- status veze
- status zadnje operacije upisa

Ako se dira realtime logika, provjeriti:

- reconnect
- duple evente
- stanje sucelja nakon reconnecta

## Lokalne postavke i backup

Hamburger izbornik otvara settings drawer.

Tamo se cuvaju:

- globalne naknade
- porezne postavke po fotografima
- lokalni backup podataka

Backup tipicno pokriva:

- obracune
- naknade
- porezne postavke

Ako se uvode nova polja, treba ih dodati i u backup restore logiku.

## Service worker

`sw-nalozi.js` je trenutno minimalan.

Radi uglavnom:

- `skipWaiting()`
- `clients.claim()`

Ne koristi punu cache strategiju kao `fotopro`, pa dokumentaciju treba drzati uskladenu sa stvarnim kodom.

## Oprez kod izmjena

Najosjetljivija podrucja:

- admin autorizacija
- model naloga koji dijeli podatke s `fotopro`
- logika obracuna
- izvjestaji i export
- realtime kanal
- backup restore kompatibilnost

## Preporuceni smjer poboljsanja

- razdvojiti modele, API pozive i UI logiku u odvojene module
- centralizirati mapiranje polja naloga
- dokumentirati merge logiku izmedju admin i foto aplikacije
- dodati vise zastitne logike za stara lokalna stanja i backup restore
