import React from "react";
import { Text, View } from "react-native";

interface ProfileInfoInterface {
  title: string;
  subTitle?: string;
  textStyles?: string;
}

const ProfileInfo = ({ title, subTitle, textStyles }: ProfileInfoInterface) => {
  return (
    <View className="flex-col justify-center items-center">
      <Text className={`text-white font-psemibold ${textStyles}`}>{title}</Text>
      {subTitle && <Text className="text-white font-pregular">{subTitle}</Text>}
    </View>
  );
};

export default ProfileInfo;
