import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import { ActionModal, Button, Text } from "../../src/components";
import { TextInput, View } from "react-native";
import { colors } from "../../src/theme";
import { StyleSheet } from "react-native";
import Container from "../shared/Container";
import CenterView from "./CenterView";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 25
  }
});

storiesOf("ActionModal", module)
  .add("Default", () => (
    <Container initialState={{ show: false }}>
      {({ setState, store }) => (
        <>
          <CenterView>
            <Button
              onPress={() =>
                setState({
                  show: true
                })
              }
            >
              Show Modal
            </Button>
          </CenterView>
          <ActionModal
            visible={store.show}
            onClose={() =>
              setState({
                show: false
              })
            }
            title="Hello"
          />
        </>
      )}
    </Container>
  ))
  .add("Custom Header", () => (
    <Container initialState={{ show: false }}>
      {({ store, setState }) => (
        <>
          <CenterView>
            <Button
              onPress={() =>
                setState({
                  show: true
                })
              }
            >
              Show Modal
            </Button>
          </CenterView>
          <ActionModal
            visible={store.show}
            onClose={() =>
              setState({
                show: false
              })
            }
            style={{
              children: {
                paddingTop: 0
              }
            }}
            header={
              <View>
                <View style={styles.container}>
                  <Text>Add a note</Text>

                  <Text color={colors.violet.base} onPress={() => {}}>
                    Save
                  </Text>
                </View>
              </View>
            }
          >
            <TextInput
              placeholder="Enter Note"
              multiline
              numberOfLines={6}
              style={{
                textAlignVertical: "top"
              }}
            />
          </ActionModal>
        </>
      )}
    </Container>
  ));
