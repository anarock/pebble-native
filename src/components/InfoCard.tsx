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
    width: 200,
    height: 140,
    position: "absolute",
    bottom: -45,
    right: -25
  },
  descriptionText: {
    width: "60%",
    height: 60,
    position: "absolute",
    marginTop: 20
  },
  content: {
    maxHeight: 190,
    overflow: "hidden",
    zIndex: 1
  },
  defaultContent: {
    height: 80
  },
  row: { flexDirection: "row", justifyContent: "space-between" }
});

class InfoCard extends React.Component<InfoCardProps, InfoCardState> {
  state: InfoCardState = {
    isOpen: false
  };

  private getFooter = () => {
    const { linkText, onPress, expandable, disabled } = this.props;
    const { isOpen } = this.state;

    if (expandable) {
      return (
        <Touchable
          onPress={
            !disabled
              ? () =>
                  this.setState({
                    isOpen: !isOpen
                  })
              : undefined
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
        <Touchable disabled={disabled} onPress={onPress}>
          <View style={styles.bottomSection}>
            <Text color={disabled ? colors.gray.base : colors.violet.base}>
              {linkText}
            </Text>
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
      topRightElement,
      expandable,
      children,
      style = {},
      content
    } = this.props;

    const _children = content || children;

    return (
      <View style={[styles.container, style.container]}>
        <View style={[styles.topSection, style.topSection]}>
          <View style={[styles.row, style.heading]}>
            <Text size={13} color={colors.gray.dark}>
              {title}
            </Text>

            {topRightElement}
          </View>
          {_children ? (
            <View
              style={
                expandable && !this.state.isOpen ? styles.content : undefined
              }
            >
              {_children}
            </View>
          ) : (
            <View style={styles.defaultContent}>
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
