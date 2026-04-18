# 📷 Adriatic Nalozi

Admin alat za upravljanje nalozima snimanja — Adriatic.hr

PWA aplikacija. Radi u browseru i može se instalirati na desktop ili mobitel.

---

## Što radi

- Admin vidi sve fotografe i njihove naloge
- Dodavanje i uređivanje naloga (šifra objekta, ugovor, kontakt, adresa, GPS)
- Datum snimanja i status postavlja fotograf — admin ih ne može mijenjati
- Nalog se može dodijeliti drugom fotografu
- Filtriranje naloga: Na čekanju / Svi / Obavljeno / Otkazano
- Pretraživanje fotografa

---

## Tehnologija

| Što | Kako |
|-----|------|
| Frontend | Vanilla HTML/CSS/JS — jedna datoteka, nema frameworka |
| Baza | Supabase (PostgreSQL + REST API) |
| Auth | Supabase Auth (email/lozinka) |
| Hosting | GitHub Pages |
| PWA | Service Worker + Web App Manifest |

---

## Struktura repoa

```
index.html              ← glavni app (prebačen iz adriatic-nalozi.html)
manifest-nalozi.json    ← PWA manifest
sw-nalozi.js            ← Service Worker (network-first strategija)
icon-192.png            ← ikona za PWA
icon-512.png            ← ikona za PWA
README.md
```

---

## Postavljanje

### 1. Supabase

Tablica `podaci`:

```
id          uuid, primary key
created_at  timestamptz
user_id     uuid, unique
sadrzaj     jsonb
```

Tablica `admins`:

```
id          uuid, primary key
user_id     uuid, unique
created_at  timestamptz
```

RLS politike na tablici `podaci`:

```sql
-- Fotografi čitaju/mijenjaju samo vlastiti red
CREATE POLICY "users_select_own" ON podaci
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "users_update_own" ON podaci
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "users_insert_own" ON podaci
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admin čita i mijenja sve
CREATE POLICY "admins_select_all" ON podaci
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM admins WHERE admins.user_id = auth.uid())
  );

CREATE POLICY "admins_update_all" ON podaci
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM admins WHERE admins.user_id = auth.uid())
  );
```

RLS politike na tablici `admins`:

```sql
CREATE POLICY "admins_self_read" ON admins
  FOR SELECT USING (auth.uid() = user_id);
```

Dodaj admina:

```sql
INSERT INTO admins (user_id) VALUES ('tvoj-uuid-ovdje');
```

### 2. GitHub Pages

1. Novi repozitorij na GitHubu
2. Upload svih datoteka — `adriatic-nalozi.html` preimenuj u `index.html`
3. Settings → Pages → Branch: main → / (root) → Save
4. App je dostupna na `https://tvojeime.github.io/ime-repoa/`

---

## Sigurnost

Publishable key u kodu je namjerno javan — štiti ga Supabase RLS. Bez valjane prijave nije moguće pročitati ni jedan red iz baze. Admin status se provjerava na serveru pri svakoj prijavi i pri svakom pokretanju aplikacije.

---

## Povezane aplikacije

**FotoKalk PRO** — aplikacija za fotografe (kalkulator honorara + plan snimanja). Fotografi putem nje vide i ažuriraju svoje naloge koje admin dodjeljuje kroz Adriatic Nalozi.
