import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { updateMetricCount } from "@/services/supabase";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  /* const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset: resetMovies,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false); */

  const {
    isPending,
    error,
    data: movies,
    refetch: refetchMovies,
  } = useQuery({
    queryKey: ["searchData"],
    queryFn: async () => {
      const moviesData = await fetchMovies<Movie[]>({ query: searchQuery });
      if (moviesData?.length > 0) updateMetricCount(searchQuery, moviesData[0]);
      return moviesData;
    },
  });

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.length > 2) {
        refetchMovies();
      }
    }, 700);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      <FlatList
        className="px-5"
        data={movies}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center items-center mt-20">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>
            <View className="my-5">
              <SearchBar
                placeholder="Search movies..."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {isPending && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}

            {error && (
              <Text className="text-red-500 px-5 my-3">
                {"Error: " + error.message}
              </Text>
            )}

            {!isPending &&
              !error &&
              searchQuery.trim() &&
              movies?.length > 0 && (
                <Text className="text-xl text-white font-bold mb-5">
                  Search Results for{" "}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !isPending && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-gray-500 text-center">
                {searchQuery.trim() ? "No movies found" : "Search for a movie"}
              </Text>
            </View>
          ) : null
        }
        renderItem={({ item }) => <MovieCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

export default Search;

/* 

When you create separate components outside, they can cause unnecessary re-renders and state management issues. By defining the components inline within the FlatList props, you maintain the component state and context better.

Here's a summary of why this works better:


Inline Components:

Stay within the same render cycle
Share the same scope as parent component
Don't trigger separate re-renders
Maintain keyboard focus better


Separate Components:

Create new component instances
Can trigger unnecessary re-renders
May lose keyboard focus during re-renders
Need careful prop management
Your solution follows React Native's best practices for FlatList usage where the ListHeaderComponent and ListEmptyComponent are defined inline.

*/
