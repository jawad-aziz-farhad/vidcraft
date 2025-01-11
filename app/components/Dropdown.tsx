import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import icons from "../../constants/icons";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Select an option");
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

  const handleSelect = (option: any) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <View className="flex items-end justify-end">
      <TouchableOpacity className="w-6 h-6" onPress={() => setIsOpen(!isOpen)}>
        <Image
          source={icons.menu}
          className="w-[100%] h-[100%]"
          resizeMode="contain"
        />
      </TouchableOpacity>

      {isOpen && (
        <FlatList
          data={options}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity className="" onPress={() => handleSelect(item)}>
              <Text className="text-gray-700">{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default Dropdown;
