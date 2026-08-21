-- Migration to make title column in gallery table optional (nullable)
ALTER TABLE gallery ALTER COLUMN title DROP NOT NULL;
