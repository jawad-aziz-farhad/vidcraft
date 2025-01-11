import { getDocumentAsync } from "expo-document-picker";
import { router } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import React, { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import icons from "../../constants/icons";
import CustomButton from "../components/CustomButton";
import FormField from "../components/FormField";
import { useGlobalContext } from "../context/GlobalProvider";
import { createVideo } from "../lib/appwrite";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<any>({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const videoPlayer = useVideoPlayer(form.video?.uri, (player) => {
    // player.loop = true;
    player.play();
  });

  const openFilePicker = async (fileType: string, fieldName: string) => {
    try {
      const result = await getDocumentAsync({
        type:
          fileType === "image"
            ? ["image/png", "image/jpg", "image/jpeg", "image/gif", "image/svg"]
            : ["video/mp4", "video/gif"],
      });

      if (!result.canceled && result.assets && result.assets.length) {
        setForm({ ...form, [fieldName]: result.assets[0] });
      }
    } catch (error) {}
  };

  const submitForm = async () => {
    if (!form.title || !form.prompt || !form.thumbnail || !form.video) {
      Alert.alert("Please fill in all the fields.");
      return;
    }

    try {
      setUploading(true);
      await createVideo({ ...form, creator: user?.$id });
      setForm({
        ...form,
        title: "",
        prompt: "",
        video: null,
        thumbnail: null,
      });
      router.navigate("/home");
    } catch (error) {
    } finally {
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full w-full p-4">
      <ScrollView>
        <Text className="text-white text-2xl font-psemibold mt-5">
          Upload Video
        </Text>

        {/** Title */}
        <FormField
          label="Video Title"
          name="title"
          value={form.title}
          textContentType="name"
          containterStyles="mt-5 gap-2"
          placeholder="Give your video a catchy title"
          handleChange={(name, val) => setForm({ ...form, [name]: val })}
        />

        {/** Prompt */}
        <FormField
          label="Prompt"
          name="prompt"
          value={form.prompt}
          textContentType="name"
          containterStyles="mt-5 mt-5 gap-2"
          placeholder="Enter a prompt"
          handleChange={(name, val) => setForm({ ...form, [name]: val })}
        />

        {/* Thumbnail  */}
        <View className="mt-7 space-y-2 gap-2">
          <Text className="text-gray-100 font-pmedium">Thumbnail</Text>
          <TouchableOpacity
            onPress={() => openFilePicker("image", "thumbnail")}
          >
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail?.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode="cover"
              />
            ) : (
              <View className="flex-row gap-3 w-full h-20 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="h-10 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-8 h-8"
                  />
                </View>
                <Text className="text-sm text-gray-100 font-psemibold">
                  Choose a flie
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/** Video */}
        <View className="flex-col mt-7 space-y-2 gap-2">
          <Text className="text-gray-100 font-pmedium">Upload Video</Text>

          <TouchableOpacity onPress={() => openFilePicker("video", "video")}>
            {form.video ? (
              <View className="w-full h-[300px]">
                <VideoView
                  player={videoPlayer}
                  style={{ width: "100%", height: "100%" }}
                  nativeControls
                  allowsFullscreen
                />
              </View>
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-14 h-14"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/** Upload Button */}
        <CustomButton
          title="Upload Video"
          containerStyle={`mt-8`}
          isLoading={uploading}
          handlePress={submitForm}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
