import { StyleSheet, View } from "react-native";
import * as React from "react";
import { Button, Controls, Input, Select } from "../components";
import { colors } from "../theme";
import Touchable from "../components/shared/Touchable";
import Countdown from "../components/shared/Countdown";
import Text from "../components/Text";
import { LoginProps, LoginState } from "./typings/Login";
import OTPInput from "react-native-otp";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25
  },
  loginSubHeader: {
    marginTop: 15
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
  loginUserText: {
    flexGrow: 1
  },
  textButton: {
    padding: 10
  },
  countrySelect: {
    width: 100,
    marginRight: 30
  },
  phoneInput: {
    flex: 1
  },
  otpInputWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative"
  },
  countdownStyles: {
    fontWeight: "bold"
  },
  cellStyle: {
    borderWidth: 0,
    borderBottomWidth: 1,
    margin: 0,
    marginRight: 20,
    paddingVertical: 0,
    paddingBottom: 5
  },
  otpInput: {
    top: 0,
    position: "absolute",
    width: "100%",
    height: 50,
    zIndex: 2,
    fontSize: 1,
    fontFamily: "anarock_medium",
    color: "transparent"
  },
  resend: {
    color: colors.violet.base,
    fontWeight: "bold"
  },
  loginHelp: {
    marginBottom: 22,
    padding: 3,
    alignSelf: "flex-end"
  }
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

  onOtpSuccess = () =>
    this.setState({
      sendingOTP: false,
      loginPage: LOGIN_PAGE.OTP_PAGE
    });

  onOtpError = () => this.setState({ sendingOTP: false });

  onSendOtp = async () => {
    this.setState({ sendingOTP: true });
    const selectedLoginOption =
      this.state.loginMethod === LOGIN_OPTIONS.PHONE ? "phone" : "email";
    await this.props.onSendOtp(
      selectedLoginOption,
      this.onOtpSuccess,
      this.onOtpError
    );
  };

  onResendOtp = () => {
    const selectedLoginOption =
      this.state.loginMethod === LOGIN_OPTIONS.PHONE ? "phone" : "email";
    this.setState({ otpTimeout: false });
    this.props.onResendOtp(selectedLoginOption);
  };

  onEdit = () => {
    this.setState({
      loginPage: LOGIN_PAGE.USER_PAGE,
      otpTimeout: false
    });
    this.props.onOtpChange("");
  };

  onCountdownTimeUp = () => this.setState({ otpTimeout: true });

  getOtpPage = () => {
    const {
      loginUserValue,
      otpValue,
      onOtpChange,
      onSignIn,
      otpLength,
      countriesList,
      selectedCountry,
      onLoginHelp
    } = this.props;
    const { otpTimeout, loginMethod } = this.state;

    const country = countriesList.find(
      country => country.id === selectedCountry
    );

    return (
      <>
        <View style={styles.userInfoWrap}>
          <Text
            size={15}
            bold
            color={colors.gray.darker}
            style={styles.loginUserText}
          >
            {loginMethod === LOGIN_OPTIONS.PHONE
              ? `${country.country_code}-${loginUserValue}`
              : loginUserValue}
          </Text>
          <Touchable onPress={this.onEdit}>
            <Text style={styles.textButton} color={colors.violet.base} bold>
              Edit
            </Text>
          </Touchable>
        </View>
        <View style={{ marginTop: 60 }}>
          <Text color={colors.gray.dark} size={12}>
            Enter OTP
          </Text>
          <View style={styles.otpInputWrap}>
            <OTPInput
              value={otpValue}
              onChange={onOtpChange}
              tintColor={colors.violet.base}
              offTintColor={colors.gray.base}
              otpLength={otpLength}
              cellStyle={styles.cellStyle}
              style={styles.otpInput}
              selectionColor="transparent"
              secureTextEntry={true}
              keyboardType="number-pad"
              caretHidden={!!otpValue}
            />
            <View style={{ padding: 10 }}>
              {otpTimeout && (
                <Touchable onPress={this.onResendOtp}>
                  <Text style={styles.resend}>Resend</Text>
                </Touchable>
              )}
              {!otpTimeout && (
                <Countdown
                  style={styles.countdownStyles}
                  onFinish={this.onCountdownTimeUp}
                />
              )}
            </View>
          </View>
        </View>
        <Text
          bold
          color={colors.violet.base}
          style={[{ marginTop: 35 }, styles.loginHelp]}
          onPress={onLoginHelp}
        >
          Unable to login?
        </Text>
        <Button onPress={onSignIn} disabled={otpLength !== otpValue.length}>
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
      footer,
      onLoginHelp
    } = this.props;

    return (
      <View style={styles.container}>
        <Text bold size={27} color={colors.gray.darker}>
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
              <Text
                color={colors.violet.base}
                bold
                style={[{ marginTop: -15 }, styles.loginHelp]}
                onPress={onLoginHelp}
              >
                Unable to login?
              </Text>
              <Button
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
        {footer}
      </View>
    );
  }
}
