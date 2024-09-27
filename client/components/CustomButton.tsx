import { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

type CustomButtonProps = TouchableOpacityProps & {
  text: string;
  IconRight?: React.ComponentType<any>;
  IconLeft?: React.ComponentType<any>;
  bStyle?: string;
  tStyle?: string;
  handlePress: () => void;
};

const CustomButton = ({
  text,
  IconRight,
  IconLeft,
  bStyle,
  tStyle,
  handlePress,
  ...props
}: CustomButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const buttonStateHandler = async () => {
    setIsLoading(true);
    try {
      await handlePress();
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <TouchableOpacity
      onPress={buttonStateHandler}
      className={`flex-row items-center justify-center space-x-2 rounded-xl border-2 border-black w-full h-16 mt-4 px-4 ${bStyle}`}
      disabled={isLoading}
      {...props}
    >
      {IconLeft && <IconLeft />}
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text className={`text-xl font-bold ${tStyle}`}>{text}</Text>
      )}
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};

export default CustomButton;
