import { useAuth } from "@/context/AuthContext";
import { Octicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

const TabLayout = () => {
  const { onLogout } = useAuth();
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Octicons size={28} name="home" color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Octicons size={28} name="person" color={color} />
          ),
          headerRightContainerStyle: {
            paddingEnd: 20,
          },
          headerRight: () => (
            <Octicons name="sign-out" size={28} onPress={onLogout} />
          ),
          headerShadowVisible: false,
        }}
      />
      <Tabs.Screen
        name="new-demand"
        options={{ href: null, title: "New Demand" }}
      />
    </Tabs>
  );
};

export default TabLayout;
