import { TextInput, TextInputProps, View } from "react-native";

type FormFieldProps = TextInputProps & {
  value: string;
  placeholder: string;
  containerStyles?: string;
};

const CustomInput = ({
  value,
  placeholder,
  containerStyles,
  ...props
}: FormFieldProps) => {
  return (
    <View className={`h-16 w-full flex-row mt-4 ${containerStyles}`}>
      <TextInput
        placeholder={placeholder}
        value={value}
        className="flex-1 px-4 border-2 border-black rounded-xl text-base"
        {...props}
      />
    </View>
  );
};

export default CustomInput;
