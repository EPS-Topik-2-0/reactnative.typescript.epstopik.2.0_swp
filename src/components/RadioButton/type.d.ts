import { Control, RegisterOptions, ReadFormState } from "react-hook-form";
import { ViewProps } from "react-native";
export type RadioButtonProps = {
  name: string;
  control?: Control;
  rules?: RegisterOptions;
  title: string;
  errors?: any;
  helperText?: string;
} & ViewProps;
