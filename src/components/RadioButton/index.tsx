import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { RadioButtonProps } from "./type";
import themes from "../../themes";

const RadioButton = ({
  control,
  errors,
  helperText,
  name,
  rules,
  title,
  ...props
}: RadioButtonProps) => {
  return (
    <View style={[styles.container, props.style]}>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TouchableOpacity
            style={styles.option}
            onPress={() => onChange(!value)}
          >
            <View style={styles.radioButton}>
              {value ? <View style={styles.radioInner} /> : null}
            </View>
            <Text style={styles.label}>{title}</Text>
          </TouchableOpacity>
        )}
        name={name}
        defaultValue={false}
      />
      {errors?.[name] ? (
        <Text style={styles.errorText}>
          {helperText ? helperText : name.toLocaleUpperCase() + ` is required`}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    marginVertical: 10,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  radioButton: {
    height: 15,
    width: 15,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: themes.Primary.border,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 100,
    backgroundColor: themes.Primary.mainColor,
    borderWidth: 1,
    borderColor: themes.Primary.border,
  },
  label: {
    fontSize: 12,
    color: themes.Primary.colorGrey,
    fontFamily: themes.FontFamily.Hanuman,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default RadioButton;
