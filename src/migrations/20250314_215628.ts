import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

CREATE TABLE IF NOT EXISTS "services" (
	"id" serial PRIMARY KEY NOT NULL,
	"service" varchar NOT NULL,
	"description" varchar NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"email" varchar NOT NULL,
	"reset_password_token" varchar,
	"reset_password_expiration" timestamp(3) with time zone,
	"salt" varchar,
	"hash" varchar,
	"login_attempts" numeric,
	"lock_until" timestamp(3) with time zone
);

ALTER TABLE "payload_preferences_rels" ADD COLUMN "services_id" integer;
CREATE UNIQUE INDEX IF NOT EXISTS "service_idx" ON "services" ("service");
CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "services" ("email");
DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_services_id_services_id_fk" FOREIGN KEY ("services_id") REFERENCES "services"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "payload_preferences_rels" DROP CONSTRAINT "payload_preferences_rels_services_id_services_id_fk";

DROP TABLE "services";
ALTER TABLE "payload_preferences_rels" DROP COLUMN IF EXISTS "services_id";`);

};
