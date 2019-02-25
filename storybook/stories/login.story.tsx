import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import { Login } from "../../src/recipes";
import Container from "../shared/Container";

const COUNTRIES = [
  {
    id: 49,
    name: "India",
    url_name: "in",
    country_code: "+91"
  },
  {
    id: 120,
    name: "United Arab Emirates",
    url_name: "ae",
    country_code: "+971"
  },
  {
    id: 94,
    name: "Qatar",
    url_name: "qa",
    country_code: "+974"
  },
  {
    id: 51,
    name: "Iran",
    url_name: "ir",
    country_code: "+98"
  }
];

storiesOf("Login", module).add("Default", () => (
  <Container
    initialState={{ username: "", otp: "", selectedCountry: COUNTRIES[0].id }}
  >
    {({ setState, store }) => (
      <Login
        countriesList={COUNTRIES}
        selectedCountry={store.selectedCountry}
        onCountryChange={country => setState({ selectedCountry: country.id })}
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
