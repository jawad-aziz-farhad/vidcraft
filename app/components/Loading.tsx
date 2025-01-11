import React from "react";
import { Text, View } from "react-native";

const Loading = () => {
  return (
    <View
      className="flex flex-col flex-1 items-center justify-center h-full w-full"
      role="status"
    >
      <View className="animate-spin rounded-full h-10 w-10 border-t-4 border-secondary-200 border-solid"></View>
      <Text className="text-white mt-5">Loading...</Text>
    </View>
  );
};

export default Loading;
