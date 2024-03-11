import React from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  Button,
  Platform,
} from "react-native";
import {
  useForm,
  Controller,
  useFormContext,
  useController,
} from "react-hook-form";
import { TextInputProps } from "./type";
import themes from "../../themes";

const TextInputForm = ({
  control,
  errors,
  helperText,
  name,
  rules,
  placeholder,
  startAdornment,
  endAdornment,
  phoneNumber,
  englishLetterNumber,
  englishLetter,
  ...props
}: TextInputProps) => {
  const formatPhoneNumber = (value: string) => {
    // Add a leading zero if the entered number doesn't start with zero
    if (value && value.length === 1 && value !== "0") {
      return `0${value}`;
    }
    const formattedPhoneNumber = value.replace(/[^\d]/g, '');
    return formattedPhoneNumber;
    // const regex = /^[0-9]*$/; // Regex pattern to allow numbers and English letters
    // if (regex.test(value)) {
    //   return `${value}`;
    // }
    // const modifiedText = value.replace(/[^,.]/g, "");
    // return modifiedText;
    // return value;
  };

  const validateEnglishLetterNumber = (value: string) => {
    // Custom validation to allow only numbers and English letters
    const regex = /^[0-9a-zA-Z]*$/; // Regex pattern to allow numbers and English letters
    if (regex.test(value)) {
      return `${value}`;
    }
    const modifiedText = value.replace(/[^A-Za-z]/g, "");
    return modifiedText;
  };
  const validateEnglishLetter = (value: string) => {
    // Custom validation to allow only numbers and English letters
    const regex = /^[a-zA-Z\s]*$/; // Regex pattern to allow numbers and English letters
    if (regex.test(value)) {
      return `${value}`;
    }
    const modifiedText = value.replace(/[^A-Za-z\s]/g, "");
    return modifiedText;
  };

  return (
    <View
      style={[
        styles.viewInput,
        props.style,
        errors[name] ? { borderColor: "#ff7979" } : {},
      ]}
    >
      {startAdornment ? (
        <View
          style={{
            justifyContent: "center",
            marginTop: 0,
            borderRightWidth: 1,
            paddingRight: 5,
            borderRightColor: themes.Primary.colorGrey,
          }}
        >
          {startAdornment}
        </View>
      ) : null}

      <View style={{ flexDirection: "column", flex: 1 }}>
        <Controller
          name={name}
          control={control}
          rules={rules}
          defaultValue=""
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              {...props}
              placeholderTextColor={themes.Primary.colorGrey}
              style={[styles.input, props.inputStyle]}
              onChangeText={(text) => {
                if (phoneNumber) {
                  onChange(formatPhoneNumber(text));
                } else if (englishLetterNumber === true) {
                  onChange(validateEnglishLetterNumber(text));
                } else if (englishLetter === true) {
                  onChange(validateEnglishLetter(text));
                } else {
                  onChange(text);
                  if (props.onChangeText) {
                    props.onChangeText(text);
                  }
                }
              }}
              value={value}
              onBlur={onBlur}
              placeholder={placeholder}
            />
          )}
        />
        {/* {errors[name] ? (
          <Text style={styles.errorText}>
            {helperText
              ? helperText
              : name.toLocaleUpperCase() + ` is required`}
          </Text>
        ) : (
          <View style={{ height: 10 }}></View>
        )} */}
      </View>
      <View style={{ justifyContent: "center", marginTop: 0 }}>
        {endAdornment}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 45,
    width: "100%",
    paddingHorizontal: 10,
    fontSize: 16,
    color: themes.Primary.colorTextBlack,
  },
  errorText: {
    color: "red",
    fontSize: 10,
    height: 16,
    marginLeft: -20,
  },
  viewInput: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 45,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
});

export default TextInputForm;
