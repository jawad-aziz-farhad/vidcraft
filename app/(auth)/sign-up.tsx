import { ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import AppLogo from "../components/AppLogo";
import CustomButton from "../components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../components/FormField";
import { ALREADY_ACCOUNT_TEXT, SIGNIN_BTN_TEXT } from "../../constants/configs";
import { Link, router } from "expo-router";
import { Models } from "react-native-appwrite";
import { account, createUser, signIn } from "../lib/appwrite";

const SignUp = () => {
  const fields = [
    {
      name: "firstName",
      textContentType: "name",
      label: "First Name",
      value: "",
      placeholder: "Enter first name",
      containterStyles: "mt-10",
      isRequired: true,
      pattern: "^[a-zA-Z ]+$",
      patternMessage: "Name should only contain alphabets",
      isError: false,
      errorMessage: "",
    },
    {
      name: "lastName",
      textContentType: "name",
      label: "Last Name",
      value: "",
      placeholder: "Enter last name",
      containterStyles: "mt-10",
      isRequired: true,
      pattern: "^[a-zA-Z ]+$",
      patternMessage: "Name should only contain alphabets",
      isError: false,
      errorMessage: "",
    },
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
    {
      name: "confirmPassword",
      label: "Confirm Password",
      textContentType: "password",
      value: "",
      placeholder: "Confirm password",
      containterStyles: "mt-10",
      isRequired: true,
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})",
      patternMessage:
        "Password should contain at least 8 characters, one uppercase letter, one lowercase letter and one number",
      isError: false,
      errorMessage: "",
    },
  ];
  const [loggedInUser, setLoggedInUser] =
    useState<Models.User<Models.Preferences> | null>(null);
  const [formFields, setFormFields] = useState(fields);
  const [isLoading, setIsLoading] = useState(false);

  const handleTextChange = (fieldName: string, value: string) => {
    setFormFields((prevFormData) =>
      prevFormData.map((field) =>
        field.name === fieldName ? { ...field, value, isError: false } : field
      )
    );
  };

  const validateForm = () => {
    let isValid = true;
    setFormFields((formFields) =>
      formFields.map((field) => {
        if (!field.isRequired) return field;
        if (!field.value) {
          field = {
            ...field,
            isError: true,
            errorMessage: `${field.label} is required`,
            containterStyles: "mt-5",
          };
          isValid = false;
        } else if (!new RegExp(field.pattern).test(field.value)) {
          field = {
            ...field,
            isError: true,
            errorMessage: field.patternMessage,
            containterStyles: "mt-5",
          };
          isValid = false;
        } else if (
          field.name === "confirmPassword" &&
          field.value !== formFields.find((f) => f.name === "password")?.value
        ) {
          field = {
            ...field,
            isError: true,
            errorMessage: `Passwords do not match`,
            containterStyles: "mt-5",
          };
          isValid = false;
        } else {
          field = {
            ...field,
            isError: false,
            errorMessage: "",
            containterStyles: "mt-10",
          };
        }
        return field;
      })
    );
    return isValid;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    const { email, firstName, lastName, password, confirmPassword } =
      formFields.reduce((acc, field) => {
        acc[field.name] = field.value;
        return acc;
      }, {} as { [key: string]: string });

    try {
      await createUser(email, password, firstName + " " + lastName);
      await signIn(email, password);
      await setLoggedInUser(await account.get());

      router.replace("/home");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary px-4 h-full">
      <ScrollView>
        <View className="w-full items-center">
          <AppLogo />

          <Text className="text-lg font-pmedium color-white">
            Create an account
          </Text>

          {formFields.map((field) => (
            <FormField
              key={field.name}
              {...field}
              handleChange={handleTextChange}
            />
          ))}

          <CustomButton
            title="Sign Up"
            containerStyle="mt-8"
            isLoading={isLoading}
            handlePress={handleSignUp}
          />
        </View>
        <View className="w-full flex flex-row justify-end mt-5 mb-10">
          <Text className=" text-gray-100 text-lg font-semibold">
            {ALREADY_ACCOUNT_TEXT}
          </Text>
          <Link
            href="/sign-in"
            push
            className="text-secondary text-lg font-semibold pl-1"
          >
            {" "}
            {SIGNIN_BTN_TEXT}
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
