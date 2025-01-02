import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React from "react";
import icons from "../../constants/icons";

interface FormFieldInterface {
  label: string;
  name: string;
  value?: string;
  textContentType?: string;
  placeholder?: string;
  containterStyles?: string;
  textStyles?: string;
  isError?: boolean;
  errorMessage?: string;
  handleChange: (fieldName: string, value: string) => void;
}

const FormField = ({
  label,
  name,
  value,
  textContentType = "name" as string,
  containterStyles,
  textStyles,
  placeholder,
  isError,
  errorMessage,
  handleChange,
  ...props
}: FormFieldInterface) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <View className={`w-full ${containterStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{label}</Text>

      <View className="flex-row w-full h-16 px-4 bg-black-100 border-2 border-black-100 rounded-xl focus:border-secondary-200">
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={"#8C8C8C"}
          className="flex-1 text-white font-psemibold"
          value={value}
          secureTextEntry={label === "Password" && !showPassword}
          onChangeText={(value) => handleChange(name, value)}
        />
        {label === "Password" && (
          <TouchableOpacity
            className="justify-center"
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
      {isError && (
        <View className="mt-5 w-full flex-row justify-start">
          <Text className="text-red-500 font-psemibold">
            {errorMessage || "Field is required."}
          </Text>
        </View>
      )}
    </View>
  );
};

export default FormField;
