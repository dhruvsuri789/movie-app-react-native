CREATE TABLE "metrics_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"search_term" text NOT NULL,
	"count" integer DEFAULT 0,
	"poster_url" text NOT NULL,
	"movie_id" text NOT NULL,
	"title" text NOT NULL
);
