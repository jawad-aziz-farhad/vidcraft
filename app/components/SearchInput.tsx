import { usePathname } from "expo-router";
import React, { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import icons from "../../constants/icons";

interface SearchInputInterface {
  value?: string;
  placeholder?: string;
  handleChange: (text: string) => void;
}

const SearchInput = ({
  value,
  placeholder,
  handleChange,
}: SearchInputInterface) => {
  const pathName = usePathname();
  const [query, setQuery] = useState("");
  const [isFocused, setFocused] = useState(false);

  const handlePress = () => {
    // if (pathName.startsWith("/search")) {
    //   router.setParams({ query });
    // } else {
    //   router.push(`/search/${query}`);
    // }
  };

  return (
    <View
      className={`w-full h-16 px-4 bg-black-100 rounded-2xl items-center space-x-4 flex-row border-2 ${
        isFocused ? "border-secondary-200" : "border-black-200"
      }`}
    >
      <TextInput
        className="flex-1 text-white font-pregular"
        placeholder={placeholder}
        placeholderTextColor={"#CDCDE0"}
        value={query || value}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => setFocused(false)}
        onChangeText={handleChange}
      />
      <TouchableOpacity
        className="justify-end"
        disabled={!query}
        onPress={handlePress}
      >
        <Image source={icons.search} resizeMode="contain" className="w-5 h-5" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
