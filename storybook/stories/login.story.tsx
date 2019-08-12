import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import { Login } from "../../src/recipes";
import Container from "../shared/Container";
import { View, Text } from "react-native";
import { boolean } from "@storybook/addon-knobs";

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

const FOOTER = (
  <View style={{ marginTop: 20 }}>
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor.
    </Text>
  </View>
);

storiesOf("Login", module).add("Default", () => (
  <Container
    initialState={{ username: "", otp: "", selectedCountry: COUNTRIES[0].id }}
  >
    {({ setState, store }) => (
      <Login
        onTenantSubmit={value => Promise.resolve(value)}
        countriesList={COUNTRIES}
        selectedCountry={store.selectedCountry}
        onCountryChange={country => setState({ selectedCountry: country.id })}
        loginUserValue={store.username}
        onLoginUserChange={username => setState({ username })}
        onSendOtp={onSuccess =>
          new Promise(resolve => {
            if (onSuccess) onSuccess();
          })
        }
        otpValue={store.otp}
        onOtpChange={otp => setState({ otp })}
        onResendOtp={() => {}}
        onSignIn={() => {}}
        footer={FOOTER}
        otpLength={4}
        onLoginHelp={() => {}}
        isPhoneValid={boolean("isPhoneValid", true)}
        phoneInputProps={{
          textInputStyles: {
            paddingTop: 7
          }
        }}
        tenantInputProps={{
          textInputStyles: {
            paddingTop: 7
          }
        }}
      />
    )}
  </Container>
));
