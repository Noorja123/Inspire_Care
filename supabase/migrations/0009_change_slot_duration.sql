-- Migration to change default slot_duration from 30 to 10 minutes
-- Alter tables to change default slot_duration to 10
ALTER TABLE doctor_availability ALTER COLUMN slot_duration SET DEFAULT 10;
ALTER TABLE doctor_availability_exceptions ALTER COLUMN slot_duration SET DEFAULT 10;

-- Update existing rows that were using 30 minutes duration
UPDATE doctor_availability SET slot_duration = 10 WHERE slot_duration = 30;
UPDATE doctor_availability_exceptions SET slot_duration = 10 WHERE slot_duration = 30;
