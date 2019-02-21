import { StyleSheet, View, Text } from "react-native";
import * as React from "react";
import { Button, colors, Controls, Input, Select } from "../";
import Touchable from "../components/shared/Touchable";
import Countdown from "../components/shared/Countdown";

interface OperationalCountry {
  id: number;
  name: string;
  url_name: string;
  country_code: string;
}

interface LoginProps {
  loginUserValue: string;
  onLoginUserChange: (value: string) => void;
  onSendOtp: () => void;
  otpValue: string;
  onOtpChange: (value: string) => void;
  onResendOtp: () => void;
  onSignIn: () => void;
  countriesList: OperationalCountry[];
  onCountryChange: (country: OperationalCountry) => void;
  selectedCountry: number;
}

interface LoginState {
  loginMethod: number;
  loginPage: number;
  sendingOTP: boolean;
  otpTimeout: boolean;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25
  },
  loginHeader: {
    fontSize: 27,
    fontWeight: "bold"
  },
  loginSubHeader: {
    marginTop: 17,
    fontSize: 15,
    color: colors.gray.dark
  },
  formContainer: {
    marginTop: 30
  },
  loginUserInput: {
    marginTop: 60,
    flexDirection: "row"
  },
  userInfoWrap: {
    flexDirection: "row",
    alignItems: "center"
  },
  loginUserText: { fontSize: 15, fontWeight: "bold", flexGrow: 1 },
  textButton: {
    padding: 10,
    color: colors.violet.base,
    fontWeight: "bold"
  },
  otpInput: { marginRight: 20, flexShrink: 1, marginBottom: 0 },
  countrySelect: { width: 100, marginRight: 30 },
  phoneInput: { flex: 1, marginTop: 5 },
  otpInputWrap: { flexDirection: "row", marginTop: 70 }
});

enum LOGIN_OPTIONS {
  PHONE = 1,
  EMAIL
}

enum LOGIN_PAGE {
  USER_PAGE = 1,
  OTP_PAGE
}

const LOGIN_METHODS = [
  { id: LOGIN_OPTIONS.PHONE, name: "Phone Number" },
  { id: LOGIN_OPTIONS.EMAIL, name: "Email Address" }
];

export default class Login extends React.PureComponent<LoginProps, LoginState> {
  state = {
    loginMethod: LOGIN_OPTIONS.PHONE,
    loginPage: LOGIN_PAGE.USER_PAGE,
    sendingOTP: false,
    otpTimeout: false
  };

  onSendOtp = async () => {
    this.setState({ sendingOTP: true });
    await this.props.onSendOtp();
    this.setState({
      sendingOTP: false,
      loginPage: LOGIN_PAGE.OTP_PAGE
    });
  };

  onResendOtp = () => {
    this.setState({ otpTimeout: false });
    this.props.onResendOtp();
  };

  getOtpPage = () => {
    const { loginUserValue, otpValue, onOtpChange, onSignIn } = this.props;

    const { otpTimeout } = this.state;

    return (
      <>
        <View style={styles.userInfoWrap}>
          <Text style={styles.loginUserText}>{loginUserValue}</Text>
          <Touchable
            onPress={() => {
              this.setState({ loginPage: LOGIN_PAGE.USER_PAGE });
              onOtpChange("");
            }}
          >
            <Text style={styles.textButton}>Edit</Text>
          </Touchable>
        </View>
        <View style={styles.otpInputWrap}>
          <Input
            placeholder="Enter OTP"
            onChange={onOtpChange}
            value={otpValue}
            style={styles.otpInput}
          />
          <View>
            {otpTimeout && (
              <Touchable onPress={this.onResendOtp}>
                <Text style={styles.textButton}>Resend</Text>
              </Touchable>
            )}
            {!otpTimeout && (
              <Countdown
                style={{ marginTop: 10, fontWeight: "bold" }}
                time={10}
                onFinish={() => this.setState({ otpTimeout: true })}
              />
            )}
          </View>
        </View>
        <Button style={{ marginTop: 50 }} onPress={onSignIn}>
          Sign in
        </Button>
      </>
    );
  };

  render() {
    const { loginMethod, loginPage, sendingOTP } = this.state;
    const {
      onLoginUserChange,
      loginUserValue,
      countriesList,
      onCountryChange,
      selectedCountry
    } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.loginHeader}>Glad to see you!</Text>
        <Text style={styles.loginSubHeader}>Sign in to continue</Text>
        <View style={styles.formContainer}>
          {loginPage === LOGIN_PAGE.USER_PAGE && (
            <>
              <Controls
                type="radio"
                selected={loginMethod}
                data={LOGIN_METHODS}
                onChange={({ selected }) => {
                  onLoginUserChange("");
                  this.setState({ loginMethod: selected as number });
                }}
              />
              <View style={styles.loginUserInput}>
                {loginMethod === LOGIN_OPTIONS.EMAIL ? (
                  <Input
                    placeholder="Email Address"
                    onChange={onLoginUserChange}
                    value={loginUserValue}
                    keyboardType="email-address"
                  />
                ) : (
                  <>
                    <View style={styles.countrySelect}>
                      <Select
                        options={countriesList}
                        valueExtractor={item => item && item.country_code}
                        rowLabelExtractor={item =>
                          `${item.name} (${item.country_code})`
                        }
                        keyExtractor={item => item.id}
                        placeholder="ISD Code"
                        onSelect={onCountryChange}
                        selected={selectedCountry}
                      />
                    </View>
                    <View style={styles.phoneInput}>
                      <Input
                        placeholder="Phone"
                        required
                        value={loginUserValue}
                        keyboardType="phone-pad"
                        onChange={onLoginUserChange}
                      />
                    </View>
                  </>
                )}
              </View>
              <Button
                type="primary"
                onPress={this.onSendOtp}
                disabled={!loginUserValue}
                loading={sendingOTP}
              >
                Send OTP
              </Button>
            </>
          )}
          {loginPage === LOGIN_PAGE.OTP_PAGE && this.getOtpPage()}
        </View>
      </View>
    );
  }
}
