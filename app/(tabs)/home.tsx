import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Home = () => {
  return (
    <View className="flex-1 flex-col w-full justify-center items-center">
      <Stack screenOptions={{ title: "Home" }} />
      <Text className="text-5xl font-pmedium text-secondary-200">Home!!</Text>
    </View>
  );
};

export default Home;
