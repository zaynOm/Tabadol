import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { memo } from "react";
import { ToastAndroid, View } from "react-native";
import CustomButton from "./CustomButton";

type LocaionPickerProps = {
  academy: {
    id: string;
    name: string;
  };
  province: {
    id: string;
    name: string;
  };
  commune: {
    id: string;
    name: string;
  };
  locationType: "current" | "desired";
};

// memoized component to reduce re-rendering when changing location state
const LocationPicker = memo(
  ({ academy, province, commune, locationType }: LocaionPickerProps) => {
    const arrowIcon = () => (
      <AntDesign name="arrowright" size={24} color="black" />
    );

    return (
      <View>
        <CustomButton
          text={academy?.name || "Academy"}
          handlePress={() =>
            router.push({
              pathname: "/(search)/filter/[selectionType]",
              params: {
                selectionType: "Academy",
                locationType,
              },
            })
          }
          className="justify-between"
          IconRight={arrowIcon}
        />
        <CustomButton
          text={province?.name || "Province"}
          handlePress={() => {
            if (!academy?.id) {
              ToastAndroid.show(
                "Select your academy first",
                ToastAndroid.SHORT
              );
              return;
            }
            router.push({
              pathname: "/(search)/filter/[selectionType]",
              params: {
                selectionType: "Province",
                locationType,
              },
            });
          }}
          className="justify-between"
          IconRight={arrowIcon}
        />
        <CustomButton
          text={commune?.name || "Commune"}
          handlePress={() => {
            if (!province?.id) {
              ToastAndroid.show(
                "Select your province first",
                ToastAndroid.SHORT
              );
              return;
            }
            router.push({
              pathname: "/(search)/filter/[selectionType]",
              params: {
                selectionType: "Commune",
                locationType,
              },
            });
          }}
          className="justify-between"
          IconRight={arrowIcon}
        />
      </View>
    );
  }
);

export default LocationPicker;
