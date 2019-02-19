import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import CenterView from "./CenterView";
import Login from "../../src/recipes/login";
import { colors } from "../../src/theme";
import Container from "../shared/Container";

storiesOf("Login", module).add("Default", () => (
  <Container initialState={{ username: "", otp: "" }}>
    {({ setState, store }) => (
      <Login
        loginUserValue={store.username}
        onLoginUserChange={username => setState({ username })}
        onSendOtp={() => new Promise(resolve => setTimeout(resolve, 2000))}
        otpValue={store.otp}
        onOtpChange={otp => setState({ otp })}
        onResendOtp={() => {}}
        onSignIn={() => {}}
      />
    )}
  </Container>
));
