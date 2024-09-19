import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Home = () => {
  return (
    <View>
      <Text>index</Text>
      <Link href="/sign-in">Sign in</Link>
    </View>
  );
};

export default Home;
