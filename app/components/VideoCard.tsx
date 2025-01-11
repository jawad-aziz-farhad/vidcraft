import { useVideoPlayer, VideoView } from "expo-video";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import icons from "../../constants/icons";

const VideoCard = ({
  post: {
    title,
    thumbnail,
    video,
    creator: { avatar, username },
  },
}: any) => {
  const [play, setPlay] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const player = useVideoPlayer(video, (player) => {
    player.loop = true;
    //player.play();
  });

  const showMenus = () => {};

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
          <Image
            source={{ uri: avatar }}
            className="w-full h-full rounded-lg"
            resizeMode="cover"
          />
        </View>
        <View className="justify-center flex flex-1 ml-3 gap-y-1">
          <Text className="font-psemibold text-white text-sm" numberOfLines={1}>
            {title}
          </Text>

          <Text
            className="text-xs text-gray-100 font-pregular"
            numberOfLines={1}
          >
            {username}
          </Text>
        </View>

        <View className="pt-2">
          <TouchableOpacity data-dropdown-toggle="dropdown">
            <Image
              source={icons.menu}
              className="w-5 h-5"
              resizeMode="contain"
            />
            {showMenu && (
              <View
                id="dropdown"
                className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
              >
                <Text className="text-white text-sm font-psemibold">Like</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
      {play ? (
        <View className="w-full h-60 rounded-xl mt-3 relative justify-center items-center">
          <VideoView
            player={player}
            style={{ width: "100%", height: "100%" }}
            allowsFullscreen
            nativeControls
          />
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            resizeMode="cover"
            className="w-full h-full rounded-xl mt-3"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
