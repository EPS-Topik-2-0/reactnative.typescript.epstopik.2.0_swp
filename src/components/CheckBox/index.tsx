import React from "react";
import {
  View,
  Platform,
  Image,
  Text,
  TouchableOpacity,
  Vibration,
  StyleSheet,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { CheckBoxProps } from "./type";
import themes from "../../themes";
import { BoxCheck, BoxUnCheck } from "../../assets";

const CheckBox = ({
  control,
  errors,
  helperText,
  name,
  rules,
  title,
  ...props
}: CheckBoxProps) => {
  return (
    <View style={[props.style]}>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TouchableOpacity
            style={styles.option}
            onPress={() => {
              Vibration.vibrate(1);
              onChange(!value);
            }}
          >
            {value ? (
              <Image source={BoxCheck} style={styles.imageCheck} />
            ) : (
              <Image source={BoxUnCheck} style={styles.imageCheck} />
            )}
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
  option: {
    flexDirection: "row",
    alignItems: "flex-start",
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
    fontSize: 14,
    color: themes.Primary.colorTextBlack,
    marginLeft: 5,
    width: "95%",
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
  imageCheck: {
    marginTop: Platform.OS === "ios" ? -5 : 0,
    width: 18,
    resizeMode: "contain",
  },
});

export default CheckBox;
