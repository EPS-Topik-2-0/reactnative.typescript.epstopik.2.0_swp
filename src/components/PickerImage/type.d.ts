import { Control, RegisterOptions, ReadFormState } from "react-hook-form";
import RNPickerSelect from "react-native-picker-select";
import { ViewProps } from "react-native";
export type PickerImageProps = {
  name: string;
  control?: Control;
  rules?: RegisterOptions;
  errors?: any;
  helperText?: string;
  onChange?: (value: any) => void;
  width?: number;
  height?: number;
  type?: "photo" | "IdCard";
} & ViewProps;
