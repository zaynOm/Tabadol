import { Stack, Tabs } from "expo-router";
import { View, Text } from "react-native";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, headerShadowVisible: false }}
      />
    </Stack>
  );
};

export default RootLayout;
