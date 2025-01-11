import { router } from "expo-router";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Query } from "react-native-appwrite";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "../../constants/icons";
import Loading from "../components/Loading";
import ProfileInfo from "../components/ProfileInfo";
import VideoList from "../components/VideoList";
import { useGlobalContext } from "../context/GlobalProvider";
import { getPosts, signOut } from "../lib/appwrite";
import useAppwrite from "../lib/useAppwrite";

const Profile = () => {
  const { user } = useGlobalContext();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    isLoading,
    posts,
    refresh: refreshPosts,
  } = useAppwrite(() =>
    getPosts(user ? [Query.equal("creator", user.$id)] : null)
  );

  const onRefresh = () => {
    try {
      setIsRefreshing(true);
      refreshPosts();
    } catch (error) {
    } finally {
      setIsRefreshing(false);
    }
  };

  const logout = async () => {
    await signOut();
    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="bg-primary h-full p-4">
      <View className="flex flex-col justify-center w-full mt-10 mb-5 gap-5">
        <TouchableOpacity
          className="flex justify-end items-end"
          onPress={logout}
        >
          <Image
            source={icons.logout}
            className="w-[30px] h-[30px]"
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Image
          source={{ uri: user?.avatar }}
          className="rounded-full self-center w-[60px] h-[60px] border-2 border-secondary"
          resizeMode="contain"
        />

        <Text className="text-xl font-pmedium text-white self-center">
          {user?.username}
        </Text>

        <View className="flex-row justify-evenly items-center">
          <ProfileInfo
            title={posts?.length.toString() || "0"}
            subTitle="Posts"
          />
          <ProfileInfo title={"1.2K"} subTitle="Followers" />
        </View>
      </View>

      <View className="flex flex-1 justify-center">
        {!isLoading ? (
          <VideoList
            title="Your Videos"
            posts={posts}
            isRefreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        ) : (
          <Loading />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Profile;
