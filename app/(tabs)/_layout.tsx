import { View, Text, Image } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";
import icons from "../../constants/icons";
import {
  BOOKMARK_TAB,
  CREATE_TAB,
  HOME_TAB,
  PROFILE_TAB,
} from "../../constants/configs";

const { home, bookmark, plus, profile } = icons;

const TabBarIcon = ({ color, icon, focused, name }: any) => (
  <View className="items-center justify-center gap-2">
    <Image
      source={icon}
      resizeMode="contain"
      tintColor={color}
      className={`w-6 h-6`}
    />
    <Text
      className={`${focused} ? 'font-psemibold' : 'font-pregular' text-xs`}
      style={{ color: `${color}` }}
    >
      {name}
    </Text>
  </View>
);

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarStyle: {
          backgroundColor: "#161622",
          borderTopColor: "#232533",
          borderTopWidth: 1,
          height: 84,
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarItemStyle: {
          paddingVertical: 8,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: `${HOME_TAB}`,
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              color={color}
              icon={home}
              focused={focused}
              name={HOME_TAB}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          title: `${BOOKMARK_TAB}`,
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              color={color}
              icon={bookmark}
              focused={focused}
              name={`${BOOKMARK_TAB}`}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: `${CREATE_TAB}`,
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              color={color}
              icon={plus}
              focused={focused}
              name={CREATE_TAB}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: `${PROFILE_TAB}`,
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              color={color}
              icon={profile}
              focused={focused}
              name={PROFILE_TAB}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
