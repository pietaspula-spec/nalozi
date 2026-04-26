# NaloziAdriatic

Admin aplikacija za upravljanje nalozima, obračunima i izvještajima za fotografe Adriatic.hr sustava.

## Što aplikacija radi

- admin prijava preko Supabase Auth
- provjera admin prava preko tablice `admins`
- pregled svih fotografa
- dodavanje i uređivanje naloga
- premještanje naloga drugom fotografu
- obračun po poslu
- mjesečni izvještaji
- Excel export i Print/PDF
- lokalni backup postavki i obračuna
- realtime osvježavanje promjena

## Glavne funkcionalnosti

### 1. Admin login

Nakon logina aplikacija dodatno provjerava ima li korisnik admin pristup. Ako nije admin, pristup se odbija.

### 2. Pregled fotografa i naloga

Lijevi panel prikazuje fotografe i njihove badge oznake, a desni panel prikazuje radni prikaz za odabranog fotografa.

Aplikacija ima tri glavna taba:

- `Nalozi`
- `Obračun`
- `Izvještaji`

### 3. Nalozi

Za svaki nalog admin može uređivati:

- šifru objekta
- broj ugovora
- kontakt podatke
- adresu
- GPS
- broj smještajnih jedinica
- link
- napomenu agencije

Fotograf i admin dijele iste podatke kroz merge logiku, pri čemu fotografova statusna i terenska polja ostaju sačuvana.

### 4. Obračun

Za obavljene i otkazane naloge moguće je spremiti obračun koji uključuje:

- broj kategorija
- kilometre
- dron
- akviziciju
- otkaz
- ostale troškove
- datum kontaktiranja
- datum isporuke
- verifikaciju

Obračun koristi:

- globalne naknade
- porezne postavke po fotografu

### 5. Izvještaji

Tab Izvještaji omogućuje:

- pregled po mjesecima
- pregled po fotografu
- Excel export
- Print/PDF
- Batch print

### 6. Realtime

Aplikacija koristi Supabase realtime kanal za automatski prikaz promjena koje fotograf napravi u svojoj aplikaciji.

Prisutni indikatori:

- LIVE status veze
- status zadnje operacije upisa

### 7. Postavke

Hamburger izbornik otvara drawer s:

- globalnim naknadama
- poreznim postavkama po fotografu
- lokalnim backupom

### 8. Lokalni backup

Backup sprema:

- obračune
- globalne naknade
- porezne postavke po fotografima

Podržan je i povrat iz JSON datoteke.

## Struktura repoa

```text
index.html
help.html
sw-nalozi.js
manifest-nalozi.json
icon-192.png
icon-512.png
README.md
IZMJENE.md
```

## Tehnologija

- Vanilla HTML / CSS / JavaScript
- Supabase Auth
- Supabase REST API
- Supabase Realtime
- localStorage
- GitHub Pages
- SheetJS (`xlsx`)

## Napomena o service workeru

Trenutni `sw-nalozi.js` je minimalan i ne koristi istu cache strategiju kao FotoKalk. Ako budeš radio PWA promjene, dobro je dokumentaciju držati usklađenu sa stvarnim kodom.
