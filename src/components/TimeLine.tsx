import React from "react";
import { View } from "react-native";
import colors from "../theme/colors";
import Text from "./Text";

const Header = ({ title, description }) => {
  return (
    <View
      style={{
        flexDirection: "row"
      }}
    >
      <View>
        <Text size={15} style={{ marginBottom: 8 }}>
          {title}
        </Text>
        <Text size={11} color={colors.gray.dark} lineHeight={10}>
          {description}
        </Text>
      </View>
      <View />
    </View>
  );
};

export default function() {
  return (
    <View
      style={{
        backgroundColor: colors.gray.lightest,
        marginTop: 50,
        paddingLeft: 70,
        paddingVertical: 20,
        paddingRight: 20
      }}
    >
      <Header title="Final Negotiation" description="Marked by Sarthak Garg" />
    </View>
  );
}
