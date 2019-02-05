import { Image, StyleSheet, View } from "react-native";
import * as React from "react";
import { colors } from "../theme";
import Text from "./Text";
import Icon from "@anarock/pebble/native/Icon";
import { InfoCardProps, InfoCardState } from "./typings/InfoCard";
import Touchable from "./shared/Touchable";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white.base,
    marginBottom: 10
  },
  topSection: {
    paddingVertical: 20,
    paddingHorizontal: 25
  },
  bottomSection: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderTopWidth: 1,
    borderTopColor: colors.gray.lighter,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  imageWrapper: {
    width: 150,
    height: 60,
    marginTop: 10,
    alignSelf: "flex-end"
  },
  descriptionText: {
    width: "60%",
    height: 60,
    position: "absolute",
    marginTop: 10
  },
  content: {
    maxHeight: 200,
    overflow: "hidden",
    zIndex: 1
  },
  row: { flexDirection: "row", justifyContent: "space-between" }
});

class InfoCard extends React.Component<InfoCardProps, InfoCardState> {
  state: InfoCardState = {
    isOpen: false
  };

  private getFooter = () => {
    const { linkText, onPress, expandable } = this.props;
    const { isOpen } = this.state;

    if (expandable) {
      return (
        <Touchable
          onPress={() =>
            this.setState({
              isOpen: !isOpen
            })
          }
        >
          <View style={styles.bottomSection}>
            <Text color={colors.violet.base}>
              {isOpen ? "View Less" : "View More"}
            </Text>
            <Icon name={isOpen ? "arrow-up" : "arrow-down"} />
          </View>
        </Touchable>
      );
    }

    return (
      !!linkText && (
        <Touchable onPress={onPress}>
          <View style={styles.bottomSection}>
            <Text color={colors.violet.base}>{linkText}</Text>
          </View>
        </Touchable>
      )
    );
  };

  render() {
    const {
      title,
      description,
      image,
      content,
      topRightElement,
      expandable
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.topSection}>
          <View style={styles.row}>
            <Text size={13} color={colors.gray.dark}>
              {title}
            </Text>

            {topRightElement}
          </View>
          {content ? (
            <View
              style={
                expandable && !this.state.isOpen ? styles.content : undefined
              }
            >
              {content}
            </View>
          ) : (
            <View>
              {!!image && (
                <Image
                  style={styles.imageWrapper as any}
                  source={image}
                  resizeMode="contain"
                />
              )}
              {!!description && (
                <Text lineHeight={22} style={styles.descriptionText}>
                  {description}
                </Text>
              )}
            </View>
          )}
        </View>

        {this.getFooter()}
      </View>
    );
  }
}

export default InfoCard;
