import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, Easing } from "react-native";
import themes from "../../themes";

const ThumbnailLoading = () => {
  const animatedColor = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedColor, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: false,
          easing: Easing.linear,
        }),
        Animated.timing(animatedColor, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: false,
          easing: Easing.linear,
        }),
      ])
    ).start();
  }, [animatedColor]);

  const backgroundColorInterpolate = animatedColor.interpolate({
    inputRange: [0, 1],
    outputRange: [themes.Primary.background, themes.Primary.colorGrey], // Change colors or add more colors as needed
  });

  const animatedStyle = {
    backgroundColor: backgroundColorInterpolate,
  };

  return <Animated.View style={[styles.box, animatedStyle]} />;
};

const styles = StyleSheet.create({
  box: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ThumbnailLoading;
