# NaloziAdriatic - Testiranje

Ovaj dokument sluzi kao checklist nakon svake vece izmjene.

## 1. Admin login

- Otvori aplikaciju bez sessiona.
- Provjeri da se trazi prijava.
- Prijavi se admin korisnikom.
- Provjeri da se otvara glavni ekran.
- Prijavi se ne-admin korisnikom i potvrdi da pristup bude odbijen.

## 2. Ucitavanje fotografa

- Provjeri da se lista fotografa ispravno prikazuje.
- Promijeni aktivnog fotografa.
- Provjeri da desni panel prikazuje odgovarajuce podatke.

## 3. Tab Nalozi

- Dodaj novi nalog.
- Uredi postojeci nalog.
- Premjesti nalog drugom fotografu ako je ta opcija dirana.
- Provjeri sva glavna polja: sifra, ugovor, adresa, GPS, kontakt, jedinice, link, napomena.

## 4. Sinkronizacija s foto aplikacijom

- Napravi admin izmjenu na nalogu.
- Otvori odgovarajuceg fotografa u `fotopro`.
- Provjeri da se promjena vidi.
- Napravi terensku/statusnu promjenu u `fotopro`.
- Vrati se u admin aplikaciju i provjeri da merge nije pregazio korisnikova polja.

## 5. Tab Obracun

- Otvori obavljeni nalog.
- Unesi kategorije, kilometre, dron, akviziciju, otkaz i ostale troskove.
- Spremi obracun.
- Provjeri da su iznosi konzistentni s postavljenim naknadama i poreznim pravilima.

## 6. Naknade i porezne postavke

- Promijeni globalne naknade.
- Promijeni porezne postavke za pojedinog fotografa.
- Ponovno izracunaj obracun.
- Provjeri da promjene stvarno utjecu na rezultat.

## 7. Tab Izvjestaji

- Otvori vise mjeseci i vise fotografa ako ima podataka.
- Provjeri filtre.
- Napravi Excel export.
- Napravi Print/PDF.
- Provjeri batch print ako je diran.

## 8. Realtime

- Otvori admin aplikaciju i foto aplikaciju paralelno.
- Napravi promjenu iz `fotopro`.
- Provjeri da admin vidi osvjezenje bez reload-a.
- Provjeri indikatore LIVE veze i status zadnje operacije.

## 9. Lokalni backup

- Napravi backup iz settings drawera.
- Obrisi lokalne postavke ako je potrebno u testu.
- Vrati backup.
- Provjeri da su obracuni, naknade i porezne postavke vraceni.

## 10. PWA / deploy

- Otvori aplikaciju nakon deploya nove verzije.
- Provjeri da `index.html`, `help.html` i `sw-nalozi.js` odgovaraju istoj verziji promjena.
- Ako se uvode PWA promjene, provjeri da service worker ne zadrzava staro stanje.

## 11. Regresija dokumentacije

- Ako je diran UI ili poslovna logika, azuriraj:
- `README.md`
- `help.html`
- `IZMJENE.md`
- `TECHNICAL.md`
- `TESTIRANJE.md`
