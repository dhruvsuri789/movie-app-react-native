import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset: resetMovies,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        resetMovies();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const ListHeader = () => (
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

      {loading && (
        <ActivityIndicator size="large" color="#0000ff" className="my-3" />
      )}

      {error && (
        <Text className="text-red-500 px-5 my-3">
          {"Error: " + error.message}
        </Text>
      )}

      {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
        <Text className="text-xl text-white font-bold mb-5">
          Search Results for <Text className="text-accent">{searchQuery}</Text>
        </Text>
      )}
    </>
  );

  const ListEmpty = () => {
    return !loading && !error ? (
      <View className="mt-10 px-5">
        <Text className="text-gray-500 text-center">
          {searchQuery.trim() ? "No movies found" : "Search for a movie"}
        </Text>
      </View>
    ) : null;
  };

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
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={ListEmpty}
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
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

export default Search;
