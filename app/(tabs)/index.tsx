import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/supabase";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    isPending: trendingMoviesLoading,
    error: trendingMoviesError,
    data: trendingMovies,
  } = useQuery({
    queryKey: ["homeTrendingMovies"],
    queryFn: () => getTrendingMovies(),
  });

  const {
    isPending: moviesLoading,
    error: moviesError,
    data: movies,
  } = useQuery({
    queryKey: ["homeMovies"],
    queryFn: () => fetchMovies<Movie[]>({ query: "" }),
  });

  if (moviesLoading || trendingMoviesLoading) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (moviesError || trendingMoviesError) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <Text className="text-white">
          {"Error: " + moviesError?.message || trendingMoviesError?.message}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />
      <FlatList
        className="px-5"
        data={movies}
        ListHeaderComponent={
          <>
            <Image
              source={icons.logo}
              className="w-12 h-10 mt-20 mb-5 mx-auto"
            />
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
            />
            {trendingMovies && (
              <View className="mt-10">
                <Text className="text-lg text-white font-bold mb-5">
                  Trending Movies
                </Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="w-4"></View>}
                  className="mb-4"
                  data={trendingMovies}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                  keyExtractor={(item) => item.search_term.toString()}
                />
              </View>
            )}
            <Text className="text-lg text-white font-bold mt-5 mb-5">
              Latest Movies
            </Text>
          </>
        }
        renderItem={({ item }) => <MovieCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          paddingRight: 5,
          marginBottom: 20,
        }}
        // scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 100 }}
      />
    </View>
  );
}
