import { images } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { Image, Text, View } from "react-native";

const Settings = () => {
  const { user } = useAuth();
  console.log("🚀 ~ file: settings.tsx:7 ~ user:", user);

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 items-center">
        <Image
          className="w-28 h-28 rounded-full"
          source={user?.picture ? { uri: user?.picture } : images.profile}
        />
        <Text className="text-2xl font-medium">{user?.name}</Text>
        <Text>{user?.email}</Text>
        <Text>{user.location?.commune.name}</Text>
      </View>
    </View>
  );
};

export default Settings;
