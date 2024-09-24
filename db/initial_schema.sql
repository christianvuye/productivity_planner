CREATE TABLE "WorkingDay" (
  "id" integer PRIMARY KEY,
  "date" date NOT NULL,
  "notes" text,
  "mood" integer NOT NULL,
  "productivity_rating" integer NOT NULL
);

CREATE TABLE "Task" (
  "id" integer PRIMARY KEY,
  "task_name" varchar(255) NOT NULL,
  "importance" integer NOT NULL,
  "estimate" integer NOT NULL,
  "working_day_id" integer NOT NULL
);

COMMENT ON COLUMN "WorkingDay"."mood" IS 'Mood rating from 1 to 5';

COMMENT ON COLUMN "WorkingDay"."productivity_rating" IS 'Productivity rating from 1 to 5';

COMMENT ON COLUMN "Task"."importance" IS 'Importance rating from 1 to 3';

COMMENT ON COLUMN "Task"."estimate" IS 'Estimated time from 1 to 5';

ALTER TABLE "Task" ADD FOREIGN KEY ("working_day_id") REFERENCES "WorkingDay" ("id");
