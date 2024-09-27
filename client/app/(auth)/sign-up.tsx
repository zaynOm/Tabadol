import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import Divider from "@/components/Divider";
import { useAuth } from "@/context/AuthContext";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { onGoogleLogin, onRegister } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      // check if user exists
      await onGoogleLogin!();
    } catch (error: any) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
      console.log("🚀 ~ file: sign-up.tsx:28 ~ error:", error);
    }
  };

  const register = async () => {
    try {
      await onRegister!(form.name, form.email, form.password);
    } catch (error: any) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
      console.log("🚀 ~ file: sign-up.tsx:37 ~ error:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="w-full h-full"
    >
      {/* Tabadol logo */}
      <SafeAreaView className="flex-1 w-full justify-center items-center h-full">
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
          <Text className="text-2xl font-bold mb-10">Sign up to Tabadol</Text>

          <CustomButton
            text="Continue with Google"
            IconLeft={() => <FontAwesome name="google" size={28} />}
            handlePress={handleGoogleLogin}
          />

          <Divider />

          <CustomInput
            placeholder="Username"
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
            containerStyles="mt-7"
          />

          <CustomInput
            placeholder="Email"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <CustomInput
            placeholder="Password"
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
            secureTextEntry={true}
          />

          <CustomButton text="Sign up" handlePress={register} />
          <Link href="/sign-in" className="text-lg text-center mt-10">
            <Text className="text-lg">Already have an account? </Text>
            Sign in
          </Link>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
