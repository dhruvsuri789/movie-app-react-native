import { icons } from "@/constants/icons";
import React from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

interface Props {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onPress?: () => void;
}

const SearchBar = ({ onPress, placeholder, value, onChangeText }: Props) => {
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        <View className="flex-row gap-2 items-center bg-dark-200 rounded-full px-5 py-4">
          <Image
            source={icons.search}
            className="size-5"
            resizeMode="contain"
            tintColor="#ab8bff"
          />
          <Text className="flex-1 text-[#a8b5db]">{placeholder}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View className="flex-row gap-2 items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={"#a8b5db"}
        className="flex-1 text-white"
        autoCorrect={false}
        autoCapitalize="none"
        autoFocus={true}
      />
    </View>
  );
};

export default SearchBar;
