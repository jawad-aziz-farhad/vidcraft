import React from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { Models } from "react-native-appwrite";
import EmptyList from "./EmptyList";
import Trending from "./Trending";
import VideoCard from "./VideoCard";

export default function VideoList({
  title,
  posts,
  latestPosts = [],
  isRefreshing = false,
  onRefresh,
}: {
  title?: string;
  posts: Models.Document[];
  latestPosts?: Models.Document[];
  isRefreshing?: boolean;
  onRefresh?: () => void;
}) {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => {
        return posts?.length > 0 ? (
          <VideoCard post={item} />
        ) : (
          <EmptyList
            title="No Videos Found"
            subTitle="Be the first one to upload a video."
          />
        );
      }}
      ListHeaderComponent={() => (
        <View className="my-6 px-4 space-y-2">
          <View className="flex-1 w-full pt-5 pb-8 mt-5">
            {title && (
              <Text className="text-gray-100 text-xl font-psemibold">
                {title}
              </Text>
            )}

            <Trending posts={latestPosts} />
          </View>
        </View>
      )}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
    />
  );
}
