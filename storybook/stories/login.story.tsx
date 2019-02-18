import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import CenterView from "./CenterView";
import Login from "../../src/recipes/login";
import { colors } from "../../src/theme";
import Container from "../shared/Container";

storiesOf("Login", module).add("Default", () => (
  <Container initialState={{ username: "" }}>
    {({ setState, store }) => (
      <Login
        loginUserValue={store.username}
        loginUserChange={username => setState({ username })}
        onSendOtp={() => new Promise(resolve => setTimeout(resolve, 2000))}
      />
    )}
  </Container>
));
