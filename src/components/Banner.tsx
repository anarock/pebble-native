import * as React from "react";
import { View, StyleSheet, ImageURISource, Image } from "react-native";
import Text from "./Text";
import { colors } from "../theme";
import Button from "./Button";

const styles = StyleSheet.create({
  container: {
    height: 195,
    backgroundColor: "#fdf2da",
    width: "100%",
    position: "relative"
  },
  innerContainer: { padding: 25 },
  title: {
    marginBottom: 10
  },
  button: {
    backgroundColor: colors.gray.darker,
    marginTop: 24,
    height: 40,
    width: "50%"
  },
  image: {
    position: "absolute",
    height: 100,
    right: 0,
    bottom: -6,
    width: 220,
    resizeMode: "contain"
  },
  desc: {
    marginTop: 4
  }
});

interface BannerProps {
  title: string;
  description: string;
  image: ImageURISource;
  buttonText: string;
  imageStyle?: any;
  style?: any;
  onPress?: () => void;
}

// @ts-ignore
const Banner: React.FunctionComponent<BannerProps> = ({
  title,
  description,
  image,
  buttonText,
  imageStyle = {},
  style = {},
  onPress
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.innerContainer}>
        {!!image && <Image source={image} style={[styles.image, imageStyle]} />}

        <Text style={styles.title} size={13} color={colors.gray.dark}>
          {title}
        </Text>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          lineHeight={21}
          bold
          color={colors.gray.darker}
          style={styles.desc}
        >
          {description}
        </Text>

        {!!buttonText && (
          <Button type="primary" style={styles.button} onPress={onPress}>
            <Text color={colors.white.base} bold size={11}>
              {buttonText}
            </Text>
          </Button>
        )}
      </View>
    </View>
  );
};

export default Banner;
