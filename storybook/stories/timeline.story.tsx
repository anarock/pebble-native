import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import TimelineEvent from "../../src/components/TimelineEvent";
import { colors } from "../../src/theme";
import { ScrollView, View } from "react-native";
import { List } from "../../src/components";

storiesOf("Timeline", module).add("Default", () => (
  <ScrollView style={{ marginTop: 50 }}>
    <TimelineEvent
      title="Final Negotiation"
      subText="Marked by Ritesh Kumar"
      headerRight="14 May"
      backgroundColor={colors.gray.lightest}
      position="start"
    />
    <TimelineEvent
      iconName="site-visit-2"
      iconColor={colors.blue.base}
      iconBackgroundColor={colors.blue.light}
      title="Site visit by Ashish Shah"
      subText="25 May, 12:35 pm"
    />
    <TimelineEvent
      iconName="follow-up-2"
      iconColor={colors.green.base}
      iconBackgroundColor={colors.green.light}
      title="Site visit by Ashish Shah"
      subText="25 May, 12:35 pm"
      description="It is now possible to charter, rent or lease an aircraft for less than ever before and it has also become easier.
"
    />
    <TimelineEvent
      iconName="site-visit-2"
      iconColor={colors.red.base}
      iconBackgroundColor={colors.red.lightest}
      title="Site visit missed by Ashish Shah"
      subText="25 May, 12:35 pm"
      titleColor={colors.red.base}
    />
    <TimelineEvent
      title="Visit Done"
      subText="25 May, 12:35 pm"
      headerRight="14 May"
      backgroundColor={colors.gray.lightest}
      description={
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap"
          }}
        >
          <List
            style={{
              width: "50%",
              marginTop: 15
            }}
            title="Arnav Reddy"
            description="Sourcing Agent"
          />
          <List
            style={{
              width: "50%",
              marginTop: 15
            }}
            title="Arnav Reddy"
            description="Sourcing Agent"
          />
          <List
            style={{
              width: "50%",
              marginTop: 15
            }}
            title="Arnav Reddy"
            description="Sourcing Agent"
          />
          <List
            style={{
              width: "50%",
              marginTop: 15
            }}
            title="Arnav Reddy"
            description="Sourcing Agent"
          />
        </View>
      }
    />
    <TimelineEvent
      iconName="patchout"
      iconColor={colors.gray.base}
      iconBackgroundColor={colors.white.base}
      title="Patchout given to Krish Bhatt"
      subText="25 May, 12:35 pm"
      circularButtonStyle={{
        borderWidth: 1,
        borderColor: colors.gray.light
      }}
    />
    <TimelineEvent
      title="Failed"
      titleColor={colors.red.base}
      subText="Marked by Ritesh Kumar"
      headerRight="14 May"
      descriptionColor={colors.gray.darker}
      description="Reason : Sq. feet area"
      backgroundColor={colors.red.lightest}
      position="end"
    />
  </ScrollView>
));
