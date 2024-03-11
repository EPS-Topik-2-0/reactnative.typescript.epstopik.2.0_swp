import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  Alert,
} from "react-native";
import { Controller } from "react-hook-form";
import { PickerImageProps } from "./type";
import { Add } from "../../assets";
import ImagePicker from "react-native-image-crop-picker";

const widthImage = 262.28346457;
const heightImage = 340.07874016;

const PickerImage = ({
  control,
  name,
  errors,
  rules,
  onChange,
  height,
  width,
  type,
  ...props
}: PickerImageProps) => {
  const [browsedImage, setBrowsedImage] = React.useState<any>(null);
  const select = async () => {
    await ImagePicker.openPicker(
      type === "photo"
        ? {
            forceJpg: true,
            width: widthImage,
            height: heightImage,
            includeBase64: true,
            mediaType: "photo",
            compressImageQuality: 0.8,
          }
        : {
            compressImageMaxWidth: 1280,
            compressImageMaxHeight: 1280,
            compressImageQuality: 0.8,
            includeBase64: true,
            mediaType: "photo",
          }
    )
      .then((image) => {
        if (type === "photo") {
          if (image) {
            ImagePicker.openCropper({
              width: widthImage,
              height: heightImage,
              path: image.path,
              includeBase64: true,
              mediaType: "photo",
              forceJpg: true,
              compressImageQuality: 1,
            })
              .then((croop: any) => {
                setBrowsedImage(croop);
                if (onChange) {
                  onChange(croop);
                }
              })
              .catch((e) => {
                if (e.code === "E_PICKER_CANCELLED") {
                  Alert.alert("User Error Image");
                }
              });
          }
        } else {
          setBrowsedImage(image);
          if (onChange) {
            onChange(image);
          }
        }
      })
      .catch((e) => {
        if (e.code === "E_PICKER_CANCELLED") {
          Alert.alert("User Error cancel");
          return false;
        }
      });
  };

  return (
    <View style={[props.style, ,]}>
      <Controller
        rules={rules}
        control={control}
        render={({ field }) => (
          <TouchableOpacity
            style={[type === "photo" ? styles.butImage46 : styles.butImageFull]}
            onPress={() => {
              select();
            }}
          >
            {Platform.OS === "ios" ? (
              <Image
                source={field?.value?{uri:Object(field?.value)?.path}: browsedImage ? { uri: browsedImage?.path } : Add}
                style={[
                  type === "photo"
                    ? {
                        width: 160,
                        height: 240,
                        borderWidth: 1,
                        borderColor: "black",
                      }
                    : {
                        padding: 0,
                        resizeMode: "contain",
                        alignSelf: "center",
                        height: 220,
                        width: "100%",
                        borderWidth: 1,
                        borderColor: "black",
                      },
                  errors?.[name]
                    ? { borderColor: "#ff7979", borderWidth: 1 }
                    : {},
                ]}
              />
            ) : (
              <Image
                source={
                  field?.value?
                  {uri:`data:image/png;base64,${field?.value?.data}`}:
                  browsedImage
                    ? { uri: `data:image/png;base64,${browsedImage?.data}` }
                    : Add
                }
                style={[
                  type === "photo"
                    ? {
                        width: 160,
                        height: 240,
                        borderWidth: 1,
                        borderColor: "black",
                      }
                    : {
                        padding: 0,
                        resizeMode: "contain",
                        alignSelf: "center",
                        height: 220,
                        width: "100%",
                        borderWidth: 1,
                        borderColor: "black",
                      },
                  errors?.[name]
                    ? { borderColor: "#ff7979", borderWidth: 1 }
                    : {},
                ]}
              />
            )}
          </TouchableOpacity>
        )}
        name={name}
        defaultValue="" // Set default value if needed
      />
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
    // borderColor: "gray",
    // borderWidth: 1,
    borderRadius: 12,
  },
  butImage46: {
    alignSelf: "center",
    padding: 0,
    // width:130,
    // height:160,
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  butImage46Text: {
    fontSize: 18,
    textAlign: "center",
  },
  butImageFull: {
    alignSelf: "center",
    padding: 0,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
});

export default PickerImage;
