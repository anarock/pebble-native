import * as React from "react";
import { ImageURISource } from "react-native";
interface ImageThumbnailProps {
  image: ImageURISource;
  onPress?: () => void;
  title: string;
  subText: string;
  style?: any;
}
declare const ImageThumbnail: React.FunctionComponent<ImageThumbnailProps>;
export default ImageThumbnail;
