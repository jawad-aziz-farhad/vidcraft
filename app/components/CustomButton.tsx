import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { isLoaded, isLoading } from "expo-font";

interface CustomButtonInterface {
  title: string;
  handlePress?: () => void;
  textStyles?: string;
  containerStyle?: string;
  isLoading?: boolean;
}

const CustomButton = ({
  title,
  handlePress,
  containerStyle,
  textStyles,
  isLoading,
}: CustomButtonInterface) => {
  return (
    <TouchableOpacity
      className={` w-full bg-secondary rounded-xl min-h-[62px] 
        justify-center items-center ${containerStyle}
        (${isLoading} ? ' opacity-50' : ' opacity-100')`}
      activeOpacity={0.7}
      onPress={handlePress}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
