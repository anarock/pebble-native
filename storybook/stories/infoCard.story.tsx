import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import CenterView from "./CenterView";
import { InfoCard, List, Text } from "../../src/components";
import { View } from "react-native";
import { colors } from "../../src/theme";
import Touchable from "../../src/components/shared/Touchable";

storiesOf("InfoCard", module)
  .add("Default", () => (
    <CenterView style={{ paddingHorizontal: 0 }}>
      <View style={{ width: "100%" }}>
        <InfoCard
          onPress={() => {}}
          title="Additional Details"
          description="Have more information about Kasturi to add?"
          linkText="Click here to add"
          image={require("../../assets/dummy.png")}
          style={{
            imageWrapper: {
              width: 120,
              height: 120,
              bottom: -26
            }
          }}
        />
      </View>
    </CenterView>
  ))
  .add("Custom content", () => (
    <CenterView style={{ paddingHorizontal: 0 }}>
      <View style={{ width: "100%" }}>
        <InfoCard
          title="Additional Client Info"
          linkText="Hellllooooo"
          topRightElement={
            <Touchable>
              <Text color={colors.violet.base} size={13}>
                Edit
              </Text>
            </Touchable>
          }
        >
          <View style={{ marginTop: 8 }}>
            <List
              style={{ paddingVertical: 8 }}
              title="Age"
              description="Below 25"
            />
            <List
              style={{ paddingVertical: 8 }}
              title="Ethnicity"
              description="Marathi"
            />
            <List
              style={{ paddingVertical: 8 }}
              title="Residential Address"
              description="B-303, Piramal"
            />
            <List
              style={{ paddingVertical: 8 }}
              title="Age"
              description="Below 25"
            />
          </View>
        </InfoCard>
      </View>
    </CenterView>
  ))

  .add("Expandable content", () => (
    <CenterView style={{ paddingHorizontal: 0 }}>
      <View style={{ width: "100%" }}>
        <InfoCard
          title="Additional Client Info"
          linkText="View More"
          topRightElement={
            <Touchable>
              <Text color={colors.violet.base} size={13}>
                Edit
              </Text>
            </Touchable>
          }
          expandable
        >
          <View style={{ marginTop: 8 }}>
            <List
              style={{ paddingVertical: 8 }}
              title="Age"
              description="Below 25"
            />
            <List
              style={{ paddingVertical: 8 }}
              title="Ethnicity"
              description="Marathi"
            />
            <List
              style={{ paddingVertical: 8 }}
              title="Residential Address"
              description="B-303, Piramal Ananya, Ambedkar Road, Worli"
            />
            <List
              style={{ paddingVertical: 8 }}
              title="Residential Address"
              description="B-303, Piramal Ananya, Ambedkar Road, Worli"
            />
          </View>
        </InfoCard>
      </View>
    </CenterView>
  ));
