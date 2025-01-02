import { Image } from "react-native";
import React from "react";
import images from "../../constants/images";

const AppLogo = () => {
  return (
    <Image
      source={images.logo}
      resizeMode="contain"
      className="w-[130px] h-[84px]"
    />
  );
};

export default AppLogo;
