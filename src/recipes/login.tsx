import { StyleSheet, View } from "react-native";
import * as React from "react";
import { Button, Controls, Input, Select } from "../components";
import { colors } from "../theme";
import Touchable from "../components/shared/Touchable";
import Countdown from "../components/shared/Countdown";
import Text from "../components/Text";
import OTPInput from "react-native-otp";

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
  footer?: React.ReactText | JSX.Element;
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
  loginSubHeader: {
    marginTop: 17
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
  loginUserText: { flexGrow: 1 },
  textButton: {
    padding: 10,
    color: colors.violet.base,
    fontWeight: "bold"
  },
  otpInput: { marginRight: 20, flexShrink: 1, marginBottom: 0 },
  countrySelect: { width: 100, marginRight: 30 },
  phoneInput: { flex: 1 },
  otpInputWrap: { flexDirection: "row", alignItems: "center" },
  countdownStyles: { marginTop: 10, fontWeight: "bold", marginHorizontal: 10 },
  cellStyle: {
    borderWidth: 0,
    borderBottomWidth: 1,
    margin: 0,
    marginRight: 10
  },
  otpInputText: { flex: 1, alignItems: "flex-start" }
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
          <Text size={15} bold style={styles.loginUserText}>
            {loginUserValue}
          </Text>
          <Touchable
            onPress={() => {
              this.setState({
                loginPage: LOGIN_PAGE.USER_PAGE,
                otpTimeout: false
              });
              onOtpChange("");
            }}
          >
            <Text style={styles.textButton}>Edit</Text>
          </Touchable>
        </View>
        <View style={{ marginTop: 70 }}>
          <Text color={colors.gray.dark} size={12}>
            Enter OTP
          </Text>
          <View style={styles.otpInputWrap}>
            <View style={styles.otpInputText}>
              <OTPInput
                value={otpValue}
                onChange={onOtpChange}
                tintColor={colors.violet.base}
                offTintColor={colors.gray.base}
                otpLength={6}
                cellStyle={styles.cellStyle}
              />
            </View>
            <View style={{ flexShrink: 1 }}>
              {otpTimeout && (
                <Touchable onPress={this.onResendOtp}>
                  <Text style={styles.textButton}>Resend</Text>
                </Touchable>
              )}
              {!otpTimeout && (
                <Countdown
                  style={styles.countdownStyles}
                  onFinish={() => this.setState({ otpTimeout: true })}
                />
              )}
            </View>
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
      selectedCountry,
      footer
    } = this.props;

    return (
      <View style={styles.container}>
        <Text bold size={27}>
          Glad to see you!
        </Text>
        <Text size={15} color={colors.gray.dark} style={styles.loginSubHeader}>
          Sign in to continue
        </Text>
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
        {!!footer && footer}
      </View>
    );
  }
}
