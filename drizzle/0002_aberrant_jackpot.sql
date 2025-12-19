ALTER TABLE "VerificationToken" DROP CONSTRAINT IF EXISTS "VerificationToken_token_unique";--> statement-breakpoint
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'Account_provider_providerAccountId_pk'
  ) THEN
    BEGIN
      ALTER TABLE "Account" ADD CONSTRAINT "Account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId");
    EXCEPTION
      WHEN duplicate_object THEN null;
      WHEN others THEN null;
    END;
  END IF;
END $$;
--> statement-breakpoint
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'VerificationToken_identifier_token_pk'
  ) THEN
    BEGIN
      ALTER TABLE "VerificationToken" ADD CONSTRAINT "VerificationToken_identifier_token_pk" PRIMARY KEY("identifier","token");
    EXCEPTION
      WHEN duplicate_object THEN null;
      WHEN others THEN null;
    END;
  END IF;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "PortfolioItem" ADD COLUMN "challenge" text;
EXCEPTION
 WHEN duplicate_column THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "PortfolioItem" ADD COLUMN "solution" text;
EXCEPTION
 WHEN duplicate_column THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "PortfolioItem" ADD COLUMN "reviewText" text;
EXCEPTION
 WHEN duplicate_column THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "PortfolioItem" ADD COLUMN "reviewAuthor" text;
EXCEPTION
 WHEN duplicate_column THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "PortfolioItem" ADD COLUMN "reviewRole" text;
EXCEPTION
 WHEN duplicate_column THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
