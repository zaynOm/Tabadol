import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import LocationPicker from "@/components/LocationPicker";
import { useAuth } from "@/context/AuthContext";
import { useLocationStore } from "@/store";
import AntDesign from "@expo/vector-icons/build/AntDesign";
import axios from "axios";
import { router } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useShallow } from "zustand/react/shallow";

const SetupCompletion = () => {
  const { user, onLogout, updateUserLocalState } = useAuth();
  const [academy, province, commune, school, post, speciality] =
    useLocationStore(
      useShallow((state) => [
        state.userLocation.Academy,
        state.userLocation.Province,
        state.userLocation.Commune,
        state.userLocation.School,
        state.post,
        state.speciality,
      ])
    );
  const [setUserLocation, setSpeciality] = useLocationStore(
    useShallow((state) => [state.setUserLocation, state.setSpeciality])
  );

  const updateUserLocation = async () => {
    try {
      const location = {
        academy: academy?.id,
        province: province?.id,
        commune: commune?.id,
        school,
      };

      const response = await axios.patch(`/users/${user.id}`, {
        location,
        post,
        speciality,
      });
      const data = response.data;
      if (data.success) {
        ToastAndroid.show("Location updated successfully", ToastAndroid.SHORT);
        updateUserLocalState?.({
          user: {
            ...data.data,
            location: { academy, province, commune, school },
          },
        });
        router.replace("/(tabs)");
      }
    } catch (err) {
      console.log("🚀 ~ file: setup-location.tsx:53 ~ err:", err);
    }
  };

  const arrowIcon = () => (
    <AntDesign name="arrowright" size={24} color="black" />
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-grow p-4"
    >
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <SafeAreaView className="space-y-6">
          <View>
            <View className="flex-row justify-between items-center">
              <Text className="text-2xl font-bold">Hi, {user?.name}</Text>
              <TouchableOpacity onPress={onLogout}>
                <Text className="font-medium underline underline-offset-8">
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
            <Text className="text-xl font-bold mt-2">
              Please Complete your account setup
            </Text>
          </View>
          <View>
            <Text className="text-xl font-bold">Job details</Text>
            <CustomButton
              text={post || "Post"}
              handlePress={() => router.push("/(search)/filter/Post")}
              className="justify-between"
              IconRight={arrowIcon}
            />
            <CustomInput
              placeholder="Enter your speciality"
              value={speciality as string}
              onChangeText={setSpeciality}
              className="text-lg font-bold"
            />
          </View>

          <View>
            <Text className="text-xl font-bold">Location details</Text>
            <LocationPicker
              academy={academy!}
              province={province!}
              commune={commune!}
              locationType="current"
            />
          </View>

          <CustomInput
            placeholder="Enter your school"
            value={school as string}
            onChangeText={(value) => setUserLocation("School", value)}
            className="text-lg font-bold"
          />

          <CustomButton handlePress={updateUserLocation} text="Continue" />
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SetupCompletion;
