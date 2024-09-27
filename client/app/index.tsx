import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

const Index = () => {
  const { user, authState, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (authState?.authenticated) {
        if (!user.location) {
          console.log("index inside location check");
          router.replace("/(auth)/setup-completion");
        } else {
          router.replace("/(tabs)");
        }
      } else {
        router.replace("/(auth)/sign-in");
      }
    }
  }, [user, authState, loading, router]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }
};

export default Index;
