import React from "react";
import { View, Button, StyleSheet, Vibration, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";
import RNPickerSelect from "react-native-picker-select";
import { PickerSelectProps } from "./type";
import { IcBackDown } from "../../assets";
import themes from "../../themes";

const PickerSelect = ({
  control,
  name,
  errors,
  data,
  rules,
  onChange: change,
  ...props
}: PickerSelectProps) => {
  const handlePickerOpen = () => {
    // Vibration.vibrate(100);
  };

  return (
    <View
      style={[
        styles.container,
        props.style,
        errors[name] ? { borderColor: "#ff7979" } : {},
      ]}
    >
      <Controller
        rules={rules}
        control={control}
        render={({ field: { onChange, value } }) => (
          <RNPickerSelect
            onUpArrow={() => handlePickerOpen()}
            onClose={() => handlePickerOpen()}
            onOpen={() => handlePickerOpen()}
            onDownArrow={() => handlePickerOpen()}
            Icon={() => (
              <View style={{ marginTop: 5, marginEnd: -10 }}>
                <IcBackDown height={10} width={10} />
              </View>
            )}
            placeholder={{
              label: props.title,
              value: null,
            }}
            useNativeAndroidPickerStyle={false}
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 10,
                right: 12,
              },
              placeholder:{
                color:themes.Primary.colorGrey
              }
            }}
            onValueChange={(itemValue) => {
              if (change) {
                change(itemValue);
                onChange(itemValue);
              } else {
                onChange(itemValue);
              }
            }}
            items={data}
            value={value}
          />
        )}
        name={name}
        defaultValue="" // Set default value if needed
      />
      {/* {errors?.[name] && <Text>This field is required.</Text>} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 45,
    paddingHorizontal: 6,
    marginBottom: 2,
    width: "100%",
    fontSize: 16,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 12,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
    color: themes.Primary.colorTextBlack,
    paddingRight: 30,
    height: 40,
    fontSize: 16,
    fontFamily: themes.FontFamily.Hanuman,
  },
});

export default PickerSelect;
