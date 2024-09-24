import CustomButton from "@/components/CustomButton";
import Divider from "@/components/Divider";
import FormField from "@/components/FormField";
import { useAuth } from "@/context/AuthContext";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { onGoogleLogin, onRegister } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      // check if user exists
      await onGoogleLogin!();
    } catch (error) {
      Alert.alert("Error", (error as any).message);
      console.log(error);
    }
  };

  const register = async () => {
    try {
      await onRegister!(form.name, form.email, form.password);
    } catch (error) {
      Alert.alert("Error", (error as any).message);
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Tabadol logo */}
      <SafeAreaView
        className="flex-1 w-full justify-center items-center h-full "
        // style={{ minHeight: Dimensions.get("window").height - 100 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          className="flex-1"
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text className="text-2xl font-bold mb-10">Sign uo to Tabadol</Text>

          <CustomButton
            text="Continue with Google"
            Icon={() => <FontAwesome name="google" size={28} />}
            handlePress={handleGoogleLogin}
          />

          <Divider />

          <FormField
            placeholder="Username"
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
            otherSyles="mt-7"
          />

          <FormField
            placeholder="Email"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <FormField
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
