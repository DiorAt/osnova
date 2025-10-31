-- Исправление таблицы sms_codes - добавление колонки used если её нет

-- Проверка и добавление колонки used
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'sms_codes' 
        AND column_name = 'used'
    ) THEN
        ALTER TABLE sms_codes ADD COLUMN used BOOLEAN DEFAULT false;
        RAISE NOTICE 'Колонка used добавлена в таблицу sms_codes';
    ELSE
        RAISE NOTICE 'Колонка used уже существует';
    END IF;
END $$;

