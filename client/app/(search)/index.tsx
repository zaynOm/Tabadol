import LocationPicker from "@/components/LocationPicker";
import React, { useState } from "react";
import { View } from "react-native";

export default function LocationFilterScreen() {
  const [region, setRegion] = useState("");
  const [province, setProvince] = useState("");
  const [commune, setCommune] = useState("");

  const handleSubmit = () => {
    console.log("Selected location:", { region, province, commune });
  };

  return (
    <View className="p-4">
      <LocationPicker />
    </View>
  );
}
