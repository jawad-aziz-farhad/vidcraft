import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { Query } from "react-native-appwrite";
import { SafeAreaView } from "react-native-safe-area-context";
import { APP_NAME } from "../../constants/configs";
import images from "../../constants/images";
import SearchInput from "../components/SearchInput";
import VideoList from "../components/VideoList";
import { getPosts } from "../lib/appwrite";
import useAppwrite from "../lib/useAppwrite";

const Home = () => {
  const [query, setQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    posts,
    isLoading: isFetchingPosts,
    refresh: refreshPosts,
  } = useAppwrite(() =>
    getPosts(query ? [Query.search("title", query)] : null)
  );

  const {
    posts: latestPosts,
    isLoading: isFetchingLatest,
    refresh: refreshLatestPosts,
  } = useAppwrite(getPosts);

  const onRefresh = () => {
    try {
      setIsRefreshing(true);
      refreshPosts();
      refreshLatestPosts;
    } catch (error) {
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleChange = (text: string) => setQuery(text);

  useEffect(() => {
    refreshPosts();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="my-6 px-4 space-y-2">
        <View className="justify-between items-start flex-row mb-6">
          <View>
            <Text className="font-pmedium text-sm text-gray-100">
              Welcome Back{" "}
            </Text>
            <Text className="text-2xl font-psemibold text-white">
              {APP_NAME}
            </Text>
          </View>

          <View className="mt-1.5">
            <Image
              source={images.logoSmall}
              className="w-9 h-10"
              resizeMode="contain"
            />
          </View>
        </View>

        <SearchInput
          handleChange={handleChange}
          value={query}
          placeholder="Search for a video topic"
        />
      </View>

      <VideoList
        title="Latest Videos"
        posts={posts}
        latestPosts={latestPosts}
        isRefreshing={isRefreshing}
        onRefresh={onRefresh}
      />
    </SafeAreaView>
  );
};

export default Home;
