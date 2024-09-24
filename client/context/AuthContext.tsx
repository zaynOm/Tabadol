import {
  GoogleSignin,
  isCancelledResponse,
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
  onRegister?: (name: string, email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
};

const AuthContext = createContext<AuthProps>({});

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<AuthProps["authState"]>({
    token: null,
    authenticated: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync("accessToken");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setAuthState({
          token,
          authenticated: !!token,
        });
      }
      setLoading(false);
    };
    loadToken();
  }, []);

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

  // Add email verification
  const register = async (name: string, email: string, password: string) => {
    try {
      return await axios.post("/auth/signup", { name, email, password });
    } catch (error) {
      throw new Error((error as any).response.data.message);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("/auth/login", { email, password });
      const token = response.data.data.access_token;
      setAuthState({
        token,
        authenticated: true,
      });

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      await SecureStore.setItemAsync("accessToken", token);
    } catch (error) {
      throw new Error((error as any).response.data.message);
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("accessToken");
    axios.defaults.headers.common["Authorization"] = null;
    setAuthState({
      token: null,
      authenticated: false,
    });
    // this is necessary for google signout so the user get to choose the google account
    if (GoogleSignin.getCurrentUser()) {
      // await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    }
    router.navigate("/(auth)/sign-in");
  };

  const value: AuthProps = {
    authState,
    onGoogleLogin: googleLogin,
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
