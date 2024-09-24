import CustomButton from "@/components/CustomButton";
import Divider from "@/components/Divider";
import FormField from "@/components/FormField";
import { useAuth } from "@/context/AuthContext";
import { FontAwesome } from "@expo/vector-icons";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Link, router } from "expo-router";
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
      console.log("Google auth error", error);
    }
  };

  const googleLogout = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  const login = async () => {
    try {
      await onLogin!(form.email, form.password);
      router.replace("/(tabs)");
    } catch (error: any) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
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
          <Text className="text-2xl font-bold mb-10">Login to Tabadol</Text>

          <CustomButton
            text="Continue with Google"
            Icon={() => <FontAwesome name="google" size={28} />}
            bStyle=""
            handlePress={handleGoogleLogin}
          />

          <Divider />

          <FormField
            placeholder="Email"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
            otherSyles="mt-7"
          />
          <FormField
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
