import { db } from "@/db/db";
import { metricsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const updateCountMetric = async (query: string, movie: Movie) => {
  try {
    const result = await db
      .select()
      .from(metricsTable)
      .where(eq(metricsTable.searchTerm, query))
      .execute();

    // check if a record of that search has already been stored
    if (result.length > 0) {
      const existingMovie = result[0];
      // if a record is found increment the searchCount field
      await db
        .update(metricsTable)
        .set({
          count: existingMovie.count + 1,
        })
        .where(eq(metricsTable.searchTerm, query));
    } else {
      // if no record is found, create a new record in the database
      const data = {
        searchTerm: query,
        movieId: movie.id.toString(),
        title: movie.title,
        count: 1,
        posterUrl: "https://image.tmdb.org/t/p/w500" + movie.poster_path,
      };

      await db.insert(metricsTable).values(data);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
