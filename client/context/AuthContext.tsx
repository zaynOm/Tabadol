import {
  GoogleSignin,
} from "@react-native-google-signin/google-signin";
import axios from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";

GoogleSignin.configure({
  webClientId: process.env.GOOGLE_CLIENT_ID_WEB,
  iosClientId: process.env.GOOGLE_CLIENT_ID_IOS,
});

axios.defaults.baseURL = "http://192.168.1.10:5000/api/v1";

type AuthProps = {
  authState?: { token: string | null; authenticated: boolean | null };
  loading?: boolean;
  onGoogleLogin?: () => Promise<any>;
};

const AuthContext = createContext<AuthProps>({});
export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<AuthProps["authState"]>({
    token: null,
    authenticated: null,
  });
  const [loading, setLoading] = useState(true);

  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (isCancelledResponse(userInfo)) {
        return;
      }
      const response = await axios.post("/auth/google", {
        idToken: userInfo.data.idToken,
      });
      const token = response.data.data.access_token;
      setAuthState({
        token,
        authenticated: true,
      });
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      await SecureStore.setItemAsync("accessToken", token);
      router.replace("/(tabs)");
    } catch (error: any) {
      throw new Error((error as any).response.data.message);
    }
  };
  const value: AuthProps = {
    authState,
    onGoogleLogin: googleLogin,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
