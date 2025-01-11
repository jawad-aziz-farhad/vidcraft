import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  ImageStyle,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Models } from "react-native-appwrite";
import icons from "../../constants/icons";

const zoomIn: Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle> = {
  0: {
    transform: [{ scale: 0.9 }],
  },
  1: {
    transform: [{ scale: 1.1 }],
  },
};

const zoomOut: Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle> =
  {
    0: {
      transform: [{ scale: 1 }],
    },
    1: {
      transform: [{ scale: 0.9 }],
    },
  };

const TrendingItem = ({ activeItem, item }: any) => {
  const player = useVideoPlayer(item.video, (player) => {
    player.loop = true;
    //player.play();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  return (
    <Animatable.View
      animation={item == activeItem ? zoomIn : zoomOut}
      duration={500}
    >
      {isPlaying ? (
        <View className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40">
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
          onPress={async () => {
            isPlaying ? player.pause() : player.play();
          }}
          className="relative justify-center items-center "
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

interface TrendingVideosInterface {
  posts: Models.Document[];
}

const Trending = React.memo(({ posts }: TrendingVideosInterface) => {
  const [activeItem, setActiveItem] = useState(posts[0]?.$id);

  return (
    <>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <TrendingItem activeItem={activeItem} item={item} />
        )}
        onViewableItemsChanged={({ viewableItems }) => {
          if (viewableItems.length > 0) setActiveItem(viewableItems[0].key);
        }}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 70,
        }}
        contentOffset={{ x: 120, y: 0 }}
        horizontal
      />
    </>
  );
});

export default Trending;
