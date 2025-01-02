import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  LOGIN_TEXT,
  NO_ACCOUNT_TEXT,
  SIGNUP_BTN_TEXT,
} from "../../constants/configs";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import AppLogo from "../components/AppLogo";
import { Link, router } from "expo-router";
import { signIn } from "../lib/appwrite";

const SignIn = () => {
  const fields = [
    {
      name: "email",
      textContentType: "emailAddress",
      label: "Email",
      value: "",
      placeholder: "Enter email",
      containterStyles: "mt-10",
      isRequired: true,
      pattern: "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",
      patternMessage: "Please enter a valid email",
      isError: false,
      errorMessage: "",
    },
    {
      name: "password",
      label: "Password",
      textContentType: "password",
      value: "",
      placeholder: "Enter password",
      containterStyles: "mt-10",
      isRequired: true,
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})",
      patternMessage:
        "Password should contain at least 8 characters, one uppercase letter, one lowercase letter and one number",
      isError: false,
      errorMessage: "",
    },
  ];

  const [formFields, setFormFields] = useState(fields);
  const [isLoading, setIsLoading] = useState(false);

  const handleTextChange = (fieldName: string, value: string) => {
    setFormFields((prevFormData) =>
      prevFormData.map((field) =>
        field.name === fieldName ? { ...field, value, isError: false } : field
      )
    );
  };

  const handleSignIn = async () => {
    try {
      await signIn(formFields[0].value, formFields[1].value);

      router.replace("/home");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary px-4">
      <ScrollView>
        <View className="w-full items-center h-full">
          <AppLogo />

          <Text className="text-lg font-pmedium color-white">{LOGIN_TEXT}</Text>

          {formFields.map((field) => (
            <FormField
              key={field.name}
              {...field}
              handleChange={handleTextChange}
            />
          ))}

          <CustomButton
            title="Sign In"
            containerStyle="mt-8"
            handlePress={handleSignIn}
            isLoading={isLoading}
          />
        </View>

        <View className="w-full flex flex-row justify-end">
          <Text className=" text-gray-100 text-lg font-semibold">
            {NO_ACCOUNT_TEXT}
          </Text>
          <Link
            href="/sign-up"
            push
            className="text-secondary text-lg font-semibold pl-1"
          >
            {" "}
            {SIGNUP_BTN_TEXT}
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
