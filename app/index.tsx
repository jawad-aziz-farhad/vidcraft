import { ScrollView, Image, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../constants/images";
import CustomButton from "./components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

const App = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="h-full w-full items-center justify-center px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />

          <Image
            source={images.cards}
            resizeMode="contain"
            className="w-[380px] h-[300px]"
          />

          <View className="relative mt-5">
            <View>
              <Text className="md:text-3xl text-2xl text-center text-white font-bold">
                Discover Endless Opportunities with
                <Text className="text-secondary-200"> VidCraft</Text>
              </Text>
            </View>

            <Text className="font-pregular text-lg md:text-xl  mt-5 text-gray-100 text-center">
              Where creativity meets innovation embark on a journey of limitless
              exploration of VidCraft.
            </Text>
          </View>

          <CustomButton
            title="Continue with Email"
            containerStyle="w-full mt-7 "
            handlePress={() => router.push("/sign-in")}
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default App;
