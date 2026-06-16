-- Table prospects — mini CRM Locamaster
-- À exécuter dans l'éditeur SQL de Supabase

CREATE TABLE IF NOT EXISTS prospects (
  id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  nom         text        NOT NULL,
  entreprise  text,
  secteur     text,       -- restaurateur, fleuriste, antiquaire, libraire, coiffeur, autre...
  email       text,
  telephone   text,
  ville       text,
  statut      text        DEFAULT 'nouveau' CHECK (statut IN ('nouveau','contacte','interesse','en_cours','signe','perdu')),
  notes       text,
  source      text        DEFAULT 'manuel',
  email_envoye boolean    DEFAULT false,
  email_envoye_at timestamptz,
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
);

-- Trigger pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER prospects_updated_at
  BEFORE UPDATE ON prospects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Index utiles
CREATE INDEX IF NOT EXISTS prospects_statut_idx ON prospects(statut);
CREATE INDEX IF NOT EXISTS prospects_secteur_idx ON prospects(secteur);
CREATE INDEX IF NOT EXISTS prospects_created_at_idx ON prospects(created_at DESC);

-- Désactiver RLS (accès uniquement via service_role depuis l'API)
ALTER TABLE prospects DISABLE ROW LEVEL SECURITY;
