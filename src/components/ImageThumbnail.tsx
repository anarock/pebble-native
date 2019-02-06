import * as React from "react";
import { View, StyleSheet, Image, ImageURISource } from "react-native";
import { colors } from "../theme";
import Text from "./Text";
import Touchable from "./shared/Touchable";

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.gray.lighter,
    width: 160,
    height: 110,
    padding: 5,
    borderRadius: 3
  },
  image: {
    overflow: "hidden",
    height: "50%",
    width: "100%"
  },
  text: {
    paddingHorizontal: 10
  },
  title: {
    marginTop: 2
  }
});

interface ImageThumbnailProps {
  image: ImageURISource;
  onPress?: () => void;
  title: string;
  subText: string;
  style?: any;
}

// @ts-ignore
const ImageThumbnail: React.FunctionComponent<ImageThumbnailProps> = ({
  image,
  onPress,
  title,
  subText,
  style = {}
}) => {
  return (
    <Touchable onPress={onPress}>
      <View style={[styles.container, style]}>
        <Image resizeMode="cover" source={image} style={styles.image} />
        <Text
          lineHeight={24}
          numberOfLines={1}
          ellipsizeMode="tail"
          size={13}
          bold
          style={[styles.text, styles.title]}
        >
          {title}
        </Text>
        <Text
          lineHeight={16}
          numberOfLines={1}
          ellipsizeMode="tail"
          size={11}
          color={colors.gray.dark}
          bold
          style={styles.text}
        >
          {subText}
        </Text>
      </View>
    </Touchable>
  );
};

export default ImageThumbnail;
