import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const metricsTable = pgTable("metrics_table", {
  id: serial("id").primaryKey(),
  searchTerm: text("search_term").notNull().unique(),
  count: integer("count").notNull().default(0),
  posterUrl: text("poster_url").notNull(),
  movieId: text("movie_id").notNull(),
  title: text("title").notNull(),
});

export type InsertMetric = typeof metricsTable.$inferInsert;
export type SelectMetric = typeof metricsTable.$inferSelect;
