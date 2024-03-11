import { Control, RegisterOptions, ReadFormState } from "react-hook-form";
import { TextInputProps } from "react-native";
export type TextInputProps = {
  name: string;
  control?: Control;
  rules?: RegisterOptions;
  endAdornment?: null | JSX.Element;
  startAdornment?: null | JSX.Element;
  forceShowStartAdornment?: boolean;
  phoneNumber?: boolean;
  maxLenght?: number;
  placeholder: string;
  englishLetterNumber?: boolean;
  englishLetter?: boolean;
  errors?: any;
  helperText?: string;
  inputStyle?: TextInputProps["style"];
} & TextInputProps;
