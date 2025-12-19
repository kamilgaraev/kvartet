DO $$ BEGIN
 ALTER TABLE "User" ADD COLUMN "password" text;
EXCEPTION
 WHEN duplicate_column THEN null;
END $$;