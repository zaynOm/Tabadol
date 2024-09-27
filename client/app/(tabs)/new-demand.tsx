import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import LocationPicker from "@/components/LocationPicker";
import { useAuth } from "@/context/AuthContext";
import { useLocationStore } from "@/store";
import axios from "axios";
import { router } from "expo-router";
import React from "react";
import { ToastAndroid, View } from "react-native";
import { useShallow } from "zustand/react/shallow";

const NewDemand = () => {
  const { user } = useAuth();
  console.log("🚀 ~ file: new-demand.tsx:14 ~ user:", user);
  const [academy, province, commune, school] = useLocationStore(
    useShallow((state) => [
      state.destinationLocation.Academy,
      state.destinationLocation.Province,
      state.destinationLocation.Commune,
      state.destinationLocation.School,
    ])
  );
  const setDestinationLocation = useLocationStore(
    (state) => state.setDestinationLocation
  );

  const createNewDemand = async () => {
    try {
      const response = await axios.post("/demands", {
        userId: user._id,
        desiredLocation: {
          academy: academy?.id,
          province: province?.id,
          commune: commune?.id,
          school,
        },
      });
      const data = response.data;
      if (data.success) {
        ToastAndroid.show("Location updated successfully", ToastAndroid.SHORT);

        router.replace("/(tabs)");
      }
    } catch (err) {
      console.log("🚀 ~ file: setup-location.tsx:53 ~ err:", err);
    }
  };

  return (
    <View className="p-4">
      <CustomButton text={user.name} handlePress={() => {}} disabled />
      <LocationPicker
        academy={academy!}
        province={province!}
        commune={commune!}
        locationType="desired"
      />
      <CustomInput
        placeholder="Enter the school"
        value={school as string}
        onChangeText={(value) => setDestinationLocation("School", value)}
        className="text-lg font-bold"
      />
      <CustomButton text="Submit" handlePress={createNewDemand} />
    </View>
  );
};

export default NewDemand;
