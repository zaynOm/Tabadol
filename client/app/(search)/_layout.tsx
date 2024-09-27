import { Stack } from "expo-router";
import React from "react";

const SrearchLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Filter" }} />
      <Stack.Screen
        name="filter/[selectionType]"
        options={{ animation: "slide_from_right" }}
      />
    </Stack>
  );
};

export default SrearchLayout;
