-- Migration : ajout rappel_le + score_qualification
-- À exécuter dans l'éditeur SQL de Supabase

ALTER TABLE prospects ADD COLUMN IF NOT EXISTS rappel_le date;
ALTER TABLE prospects ADD COLUMN IF NOT EXISTS score smallint DEFAULT 0;
ALTER TABLE prospects ADD COLUMN IF NOT EXISTS note_google numeric(2,1);

CREATE INDEX IF NOT EXISTS prospects_rappel_le_idx ON prospects(rappel_le);
