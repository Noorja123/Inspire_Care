-- Migration to add op_number column and automated daily generation trigger
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS op_number TEXT;

-- Index to ensure fast querying and day lookup
CREATE INDEX IF NOT EXISTS idx_appointments_op_lookup ON appointments(appointment_date, op_number);

-- Create trigger function to generate OP Number daily sequential sequence
CREATE OR REPLACE FUNCTION generate_op_number()
RETURNS TRIGGER AS $$
DECLARE
  today_date DATE;
  daily_seq INTEGER;
  op_prefix TEXT;
BEGIN
  today_date := NEW.appointment_date;
  op_prefix := 'OP-' || to_char(today_date, 'YYYYMMDD') || '-';
  
  -- Count appointments on today's date
  SELECT COALESCE(COUNT(*), 0) + 1 INTO daily_seq 
  FROM appointments 
  WHERE appointment_date = today_date;
  
  NEW.op_number := op_prefix || lpad(daily_seq::text, 3, '0');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger definition
DROP TRIGGER IF EXISTS trg_generate_op_number ON appointments;
CREATE TRIGGER trg_generate_op_number
BEFORE INSERT ON appointments
FOR EACH ROW
WHEN (NEW.op_number IS NULL)
EXECUTE FUNCTION generate_op_number();

-- Update existing appointments to have OP numbers retrospectively
WITH numbered_appointments AS (
  SELECT id, appointment_date,
         ROW_NUMBER() OVER(PARTITION BY appointment_date ORDER BY created_at ASC) as seq
  FROM appointments
)
UPDATE appointments a
SET op_number = 'OP-' || to_char(a.appointment_date, 'YYYYMMDD') || '-' || lpad(na.seq::text, 3, '0')
FROM numbered_appointments na
WHERE a.id = na.id AND a.op_number IS NULL;
