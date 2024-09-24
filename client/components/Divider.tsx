import { View, Text } from "react-native";
import React from "react";

const Divider = () => {
  return (
    <View className="flex flex-row justify-center items-center mt-7 gap-x-3">
      <View className="flex-1 h-[1px] bg-primary-950" />
      <Text className="text-lg">Or</Text>
      <View className="flex-1 h-[1px] bg-primary-950" />
    </View>
  );
};

export default Divider;
