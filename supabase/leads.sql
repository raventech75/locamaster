-- ============================================================
-- LOCAMASTER — Table des leads (formulaire de contact)
-- À exécuter dans Supabase : Dashboard > SQL Editor > New query
-- ============================================================

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  nom         text not null,
  entreprise  text,
  email       text not null,
  telephone   text,
  besoin      text not null,
  budget      text,
  message     text not null,
  source      text default 'site-web',
  created_at  timestamptz not null default now()
);

-- Index pour trier/filtrer les leads récents
create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- ------------------------------------------------------------
-- Sécurité : Row Level Security activé.
-- Aucune politique publique → ni lecture ni écriture via la clé
-- "anon". Seule la clé "service_role" (utilisée UNIQUEMENT côté
-- serveur dans /api/contact) contourne RLS et peut insérer.
-- ------------------------------------------------------------
alter table public.leads enable row level security;

-- (Optionnel) Politique de lecture pour des utilisateurs Supabase
-- authentifiés, si tu construis un mini back-office plus tard :
-- create policy "lecture leads par utilisateurs connectés"
--   on public.leads for select
--   using (auth.role() = 'authenticated');
