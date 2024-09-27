import { AuthProvider } from "@/context/AuthContext";
import { SplashScreen, Stack } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

const RootLayout = () => {
  return (
    <AuthProvider>
      <Stack screenOptions={{ statusBarTranslucent: true }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="(search)"
          options={{
            title: "Filter",
            headerShown: false,
            animation: "slide_from_right",
            contentStyle: {
              backgroundColor: "white",
            },
            headerShadowVisible: false,
            headerRight: () => (
              <TouchableOpacity>
                <Text>Reset</Text>
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </AuthProvider>
  );
};

export default RootLayout;
