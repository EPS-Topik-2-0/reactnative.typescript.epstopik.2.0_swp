import { Control, RegisterOptions, ReadFormState } from "react-hook-form";
import RNPickerSelect from "react-native-picker-select";
import { ViewProps } from "react-native";
export type PickerSelectProps = {
  name: string;
  control?: Control;
  rules?: RegisterOptions;
  title: string;
  errors?: any;
  helperText?: string;
  data: { label: string; value: string | number }[];
  onChange?: (value: number | string) => void;
} & ViewProps;
