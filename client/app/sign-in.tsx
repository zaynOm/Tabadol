import { FontAwesome } from "@expo/vector-icons";
import { View, Text, SafeAreaView, Pressable } from "react-native";

const SignIn = () => {
  const googleLoginHandler = () => {};
  return (
    <SafeAreaView className="flex-1 items-center p-24">
      {/* Tabadol logo */}
      <Text className="text-4xl font-bold mb-10">Sign in</Text>
      <Pressable
        onPress={googleLoginHandler}
        className="flex-row items-center justify-center space-x-2 rounded-xl border border-black px-2 w-72 h-12"
      >
        <FontAwesome name="google" size={28} />
        <Text className="flex-row text-xl font-bold">Continue with Google</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default SignIn;
