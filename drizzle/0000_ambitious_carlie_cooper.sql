CREATE TYPE "public"."ContactType" AS ENUM('phone', 'email', 'address', 'hours', 'other');--> statement-breakpoint
CREATE TYPE "public"."LeadStatus" AS ENUM('NEW', 'CONTACTED', 'IN_PROGRESS', 'CONVERTED', 'CLOSED', 'SPAM');--> statement-breakpoint
CREATE TYPE "public"."LeadType" AS ENUM('CONTACT', 'QUOTE', 'CALCULATOR', 'CALLBACK', 'NEWSLETTER');--> statement-breakpoint
CREATE TYPE "public"."PostStatus" AS ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED');--> statement-breakpoint
CREATE TYPE "public"."Priority" AS ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT');--> statement-breakpoint
CREATE TYPE "public"."Role" AS ENUM('ADMIN', 'MANAGER', 'EDITOR');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Account" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Analytics" (
	"id" text PRIMARY KEY NOT NULL,
	"page" text NOT NULL,
	"event" text NOT NULL,
	"data" json,
	"ipAddress" text,
	"userAgent" text,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "BlogPost" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"content" text NOT NULL,
	"excerpt" text,
	"image" text,
	"gallery" text[] DEFAULT '{}' NOT NULL,
	"tags" text[] DEFAULT '{}' NOT NULL,
	"category" text,
	"status" "PostStatus" DEFAULT 'DRAFT' NOT NULL,
	"publishedAt" timestamp,
	"metaTitle" text,
	"metaDescription" text,
	"metaKeywords" text,
	"views" integer DEFAULT 0 NOT NULL,
	"readingTime" integer DEFAULT 5 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"authorId" text NOT NULL,
	CONSTRAINT "BlogPost_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ContactInfo" (
	"id" text PRIMARY KEY NOT NULL,
	"type" "ContactType" NOT NULL,
	"label" text NOT NULL,
	"value" text NOT NULL,
	"icon" text,
	"isPrimary" boolean DEFAULT false NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "FAQ" (
	"id" text PRIMARY KEY NOT NULL,
	"question" text NOT NULL,
	"answer" text NOT NULL,
	"category" text DEFAULT 'general' NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Lead" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text,
	"phone" text,
	"message" text,
	"source" text,
	"type" "LeadType" DEFAULT 'CONTACT' NOT NULL,
	"status" "LeadStatus" DEFAULT 'NEW' NOT NULL,
	"priority" "Priority" DEFAULT 'MEDIUM' NOT NULL,
	"serviceType" text,
	"budget" text,
	"deadline" text,
	"details" json,
	"utmSource" text,
	"utmMedium" text,
	"utmCampaign" text,
	"utmContent" text,
	"utmTerm" text,
	"ipAddress" text,
	"country" text,
	"city" text,
	"assignedTo" text,
	"notes" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "PageContent" (
	"id" text PRIMARY KEY NOT NULL,
	"page" text NOT NULL,
	"section" text NOT NULL,
	"key" text NOT NULL,
	"value" text NOT NULL,
	"type" text DEFAULT 'text' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Partner" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"logo" text NOT NULL,
	"website" text,
	"description" text,
	"active" boolean DEFAULT true NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "PortfolioItem" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"description" text NOT NULL,
	"shortDesc" text,
	"category" text NOT NULL,
	"categoryColor" text,
	"image" text NOT NULL,
	"gallery" text[] DEFAULT '{}' NOT NULL,
	"result" text,
	"budget" text,
	"duration" text,
	"year" integer,
	"rating" real DEFAULT 5,
	"features" text[] DEFAULT '{}' NOT NULL,
	"tags" text[] DEFAULT '{}' NOT NULL,
	"popular" boolean DEFAULT false NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"clientName" text,
	"clientWebsite" text,
	"clientLogo" text,
	"metaTitle" text,
	"metaDescription" text,
	"metaKeywords" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"serviceId" text,
	CONSTRAINT "PortfolioItem_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "SEOSettings" (
	"id" text PRIMARY KEY NOT NULL,
	"page" text NOT NULL,
	"title" text,
	"description" text,
	"keywords" text,
	"ogTitle" text,
	"ogDescription" text,
	"ogImage" text,
	"ogType" text DEFAULT 'website',
	"twitterCard" text DEFAULT 'summary_large_image',
	"twitterTitle" text,
	"twitterDesc" text,
	"twitterImage" text,
	"canonicalUrl" text,
	"noindex" boolean DEFAULT false NOT NULL,
	"nofollow" boolean DEFAULT false NOT NULL,
	"schemaMarkup" json,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "SEOSettings_page_unique" UNIQUE("page")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Service" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text NOT NULL,
	"shortDesc" text,
	"features" text[] DEFAULT '{}' NOT NULL,
	"advantages" text[] DEFAULT '{}' NOT NULL,
	"price" text,
	"priceFrom" integer,
	"priceTo" integer,
	"image" text,
	"gallery" text[] DEFAULT '{}' NOT NULL,
	"icon" text,
	"bgColor" text,
	"popular" boolean DEFAULT false NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"metaTitle" text,
	"metaDescription" text,
	"metaKeywords" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Service_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Session" (
	"id" text PRIMARY KEY NOT NULL,
	"sessionToken" text NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "Session_sessionToken_unique" UNIQUE("sessionToken")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Setting" (
	"id" text PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"value" text NOT NULL,
	"type" text DEFAULT 'string' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Setting_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "SocialLink" (
	"id" text PRIMARY KEY NOT NULL,
	"platform" text NOT NULL,
	"url" text NOT NULL,
	"icon" text,
	"color" text,
	"active" boolean DEFAULT true NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "TeamMember" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"position" text NOT NULL,
	"bio" text,
	"photo" text,
	"email" text,
	"phone" text,
	"vk" text,
	"telegram" text,
	"instagram" text,
	"linkedin" text,
	"active" boolean DEFAULT true NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Testimonial" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"position" text NOT NULL,
	"rating" integer DEFAULT 5 NOT NULL,
	"text" text NOT NULL,
	"imageUrl" text,
	"project" text NOT NULL,
	"result" text NOT NULL,
	"budget" text NOT NULL,
	"videoReview" boolean DEFAULT false NOT NULL,
	"videoUrl" text,
	"active" boolean DEFAULT true NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ThemeSettings" (
	"id" text PRIMARY KEY NOT NULL,
	"colorPrimary" text DEFAULT '#2F4454' NOT NULL,
	"colorPrimaryDark" text DEFAULT '#1C3334' NOT NULL,
	"colorPrimaryLight" text DEFAULT '#DA7B93' NOT NULL,
	"colorPrimaryBg" text DEFAULT '#f8f5f6' NOT NULL,
	"colorAccent" text DEFAULT '#376E6F' NOT NULL,
	"colorTextDark" text DEFAULT '#2E151B' NOT NULL,
	"colorSuccess" text DEFAULT '#10B981' NOT NULL,
	"colorWarning" text DEFAULT '#F59E0B' NOT NULL,
	"fontHeading" text DEFAULT 'Inter' NOT NULL,
	"fontBody" text DEFAULT 'Inter' NOT NULL,
	"fontSizeBase" text DEFAULT '16px' NOT NULL,
	"fontSizeH1" text DEFAULT '3rem' NOT NULL,
	"fontSizeH2" text DEFAULT '2.25rem' NOT NULL,
	"fontSizeH3" text DEFAULT '1.875rem' NOT NULL,
	"borderRadiusBase" text DEFAULT '0.5rem' NOT NULL,
	"borderRadiusLg" text DEFAULT '1rem' NOT NULL,
	"borderRadiusXl" text DEFAULT '1.5rem' NOT NULL,
	"themeName" text DEFAULT 'default' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"image" text,
	"role" "Role" DEFAULT 'ADMIN' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "User_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "VerificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "VerificationToken_token_unique" UNIQUE("token")
);
