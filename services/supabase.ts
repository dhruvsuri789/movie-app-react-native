import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";
import { Database } from "./database.types";

const supabaseUrl = process.env.EXPO_PUBLIC_REACT_NATIVE_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_REACT_NATIVE_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export const updateMetricCount = async (query: string, movie: Movie) => {
  if (!query) return;

  try {
    // check if a record of that search has already been stored
    const { data: metric } = await supabase
      .from("metrics")
      .select("*")
      .eq("search_term", query)
      .single();

    // if a record is found increment the searchCount field
    if (metric) {
      await supabase
        .from("metrics")
        .update({ count: metric.count + 1 })
        .eq("search_term", query);
    } else {
      // if no record is found, create a new record in Appwrite database → 1
      await supabase.from("metrics").insert([
        {
          search_term: query,
          movie_id: movie.id.toString(),
          title: movie.title,
          count: 1,
          poster_url: "https://image.tmdb.org/t/p/w500" + movie.poster_path,
        },
      ]);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getTrendingMovies = async () => {
  try {
    const { data } = await supabase
      .from("metrics")
      .select("*")
      .order("count", { ascending: false })
      .limit(5);

    return data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
