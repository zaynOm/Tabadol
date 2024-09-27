import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import Divider from "@/components/Divider";
import { useAuth } from "@/context/AuthContext";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { onLogin, onGoogleLogin } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      await onGoogleLogin!();
    } catch (error) {
      console.log("🚀 ~ file: sign-in.tsx:29 ~ error:", error);
    }
  };

  const login = async () => {
    try {
      await onLogin!(form.email, form.password);
    } catch (error: any) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView className="flex w-full justify-center items-center h-full">
        {/* Tabadol logo */}
        <ScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
          className="w-full px-8"
        >
          <Text className="text-2xl font-bold mb-10">Login to Tabadol</Text>

          <CustomButton
            text="Continue with Google"
            IconLeft={() => <FontAwesome name="google" size={28} />}
            bStyle=""
            handlePress={handleGoogleLogin}
          />

          <Divider />

          <CustomInput
            placeholder="Email"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
            containerStyles="mt-7"
          />
          <CustomInput
            placeholder="Password"
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
            secureTextEntry={true}
          />

          <CustomButton text="Login" handlePress={login} />
          <Link href="/sign-up" className="text-lg text-center mt-10">
            <Text className="text-lg">Don't have an account? </Text>
            Sign up
          </Link>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
