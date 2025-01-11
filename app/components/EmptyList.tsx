import { View, Text, Image } from "react-native";
import React from "react";
import images from "../../constants/images";
import CustomButton from "./CustomButton";

interface EmptyListInterface {
  title: string;
  subTitle: string;
}

const EmptyList = ({ title, subTitle }: EmptyListInterface) => {
  return (
    <View className="justify-center items-center flex-1 px-4">
      <Image
        source={images.empty}
        resizeMode="contain"
        className="w-[270px] h-[215px]"
      />

      <Text className="text-center text-white font-pbold text-2xl">
        {title}
      </Text>
      <Text className="text-lg text-center font-pmedium text-gray-100 mt-2">
        {subTitle}
      </Text>

      <CustomButton
        title="Upload Video"
        containerStyle="w-full mt-10"
        handlePress={() => console.log("Upload Video")}
      />
    </View>
  );
};

export default EmptyList;
