import { StyleSheet, View } from "react-native";
import * as React from "react";
import { Button, Input, Select } from "../components";
import { colors } from "../theme";
import Touchable from "../components/shared/Touchable";
import Countdown from "../components/shared/Countdown";
import Text from "../components/Text";
import { LoginProps, LoginState, OperationalCountry } from "./typings/Login";
import OTPInput from "../components/OTPInput";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "space-between"
  },
  container: {
    padding: 25
  },
  header: {
    justifyContent: "flex-end",
    flexDirection: "row",
    marginTop: 25,
    marginRight: 25
  },
  loginSubHeader: {
    marginTop: 15,
    lineHeight: 18
  },
  formContainer: {
    marginTop: 30,
    paddingTop: 30
  },
  loginUserInput: {
    flexDirection: "row"
  },
  userInfoWrap: {
    flexDirection: "row",
    alignItems: "center"
  },
  companyInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20
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
    alignItems: "flex-start"
  },
  cellStyle: {
    borderWidth: 0,
    margin: 0,
    paddingVertical: 0,
    fontFamily: "anarock_medium"
  },
  cellParentStyle: {
    borderBottomWidth: 1,
    marginRight: 20,
    paddingBottom: 5
  },
  otpInputContainer: {
    height: 50
  },
  otpInput: {
    top: 0,
    position: "absolute",
    width: "100%",
    height: 50,
    zIndex: 2,
    fontSize: 1,
    color: "transparent"
  },
  otpResend: {
    flexDirection: "row",
    marginTop: 5
  },
  loginHelp: {
    marginBottom: 20,
    padding: 3,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  loginSupport: {
    alignSelf: "flex-end",
    marginTop: 20
  },
  loginHelpText: {
    alignSelf: "flex-start"
  },
  otpPageLoginHelp: { marginTop: 35 },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray.light
  }
});

enum LOGIN_PAGE {
  USER_PAGE = 1,
  OTP_PAGE
}

export default class Login extends React.PureComponent<LoginProps, LoginState> {
  state: Readonly<LoginState> = {
    loginPage: LOGIN_PAGE.USER_PAGE,
    otpTimeout: true,
    tenant: "",
    isTenantValid: true,
    fetchingTenantConfig: false,
    isSubmitButtonLoading: false,
    tenantConfigFetched: false,
    otpResendAttempts: 0,
    withoutCode: false,
    signin: false
  };

  onOtpSuccess = () =>
    this.setState({
      isSubmitButtonLoading: false,
      loginPage: LOGIN_PAGE.OTP_PAGE
    });

  onOtpError = () => this.setState({ isSubmitButtonLoading: false });

  onSendOtp = () => {
    const { signin } = this.state;
    this.setState({ isSubmitButtonLoading: true });
    this.props.onSendOtp(this.onOtpSuccess, this.onOtpError, signin);
  };

  onResendOtp = () => {
    const { onResendOtp, onCallOtp, smsOtpRetriesAllowed = 1 } = this.props;
    const { otpResendAttempts } = this.state;
    if (otpResendAttempts >= smsOtpRetriesAllowed) {
      onCallOtp();
    } else {
      onResendOtp();
    }
    this.setState({
      otpTimeout: false,
      otpResendAttempts: this.state.otpResendAttempts + 1
    });
  };

  onEdit = () => {
    this.setState({
      loginPage: LOGIN_PAGE.USER_PAGE,
      otpTimeout: false,
      otpResendAttempts: 0
    });
    this.props.onOtpChange("");
  };

  onCountdownTimeUp = () => this.setState({ otpTimeout: true });

  onSignIn = async () => {
    this.setState({ isSubmitButtonLoading: true });
    try {
      await this.props.onSignIn();
    } catch (e) {}
    this.setState({ isSubmitButtonLoading: false });
  };

  getOtpPage = () => {
    const {
      loginUserValue,
      otpValue,
      onOtpChange,
      otpLength,
      countriesList,
      selectedCountry,
      onLoginHelp,
      smsOtpRetriesAllowed = 1
    } = this.props;
    const { otpTimeout, isSubmitButtonLoading, otpResendAttempts } = this.state;

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
            {`${country?.country_code}-${loginUserValue}`}
          </Text>
          <Touchable onPress={this.onEdit} testID="edit-otp">
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
              testID="otp-input"
              value={otpValue}
              onChangeText={onOtpChange}
              tintColor={colors.violet.base}
              offTintColor={colors.gray.base}
              otpLength={otpLength}
              cellStyle={styles.cellStyle}
              cellParentStyle={styles.cellParentStyle}
              showCellParentBorderColor={true}
              containerStyle={styles.otpInputContainer}
              style={styles.otpInput}
              selectionColor="transparent"
              secureTextEntry={true}
              keyboardType="number-pad"
              caretHidden={!!otpValue}
              textContentType="oneTimeCode"
            />
            <View style={styles.otpResend}>
              <Text>Didn't receive code? </Text>
              {otpTimeout && (
                <Touchable onPress={this.onResendOtp} testID="resend-otp">
                  <Text color={colors.violet.base} bold>
                    {otpResendAttempts >= smsOtpRetriesAllowed
                      ? "Resend via call"
                      : "Resend"}
                  </Text>
                </Touchable>
              )}
              {!otpTimeout && <Countdown onFinish={this.onCountdownTimeUp} />}
            </View>
          </View>
        </View>
        <Text
          testID="support-link"
          bold
          color={colors.violet.base}
          style={[styles.otpPageLoginHelp, styles.loginHelp]}
          onPress={onLoginHelp}
        >
          Get support for login
        </Text>
        <Button
          loading={isSubmitButtonLoading}
          onPress={this.onSignIn}
          disabled={otpLength !== otpValue.length}
          testID="sign-in"
          style={{ marginTop: 20 }}
        >
          Sign in
        </Button>
      </>
    );
  };

  onTenantChange = (value: string) => {
    this.setState({
      isTenantValid: true,
      tenant: value
    });
  };

  onTenantSubmit = async () => {
    this.setState({ isSubmitButtonLoading: true });
    try {
      await this.props.onTenantSubmit(this.state.tenant);
      this.setState({
        tenantConfigFetched: true,
        isSubmitButtonLoading: false,
        withoutCode: true
      });
    } catch {
      this.setState({
        isTenantValid: false,
        isSubmitButtonLoading: false
      });
    }
  };

  onTenantEdit = () => {
    this.setState({
      tenantConfigFetched: false,
      withoutCode: false
    });
  };

  getText = () => {
    const { signin } = this.state;
    const { newflow } = this.props;
    return signin || !newflow
      ? "Sign in to continue"
      : "Enter your details to finish signing up";
  };

  render() {
    const {
      loginPage,
      tenant,
      isTenantValid,
      tenantConfigFetched,
      withoutCode,
      signin
    } = this.state;
    const {
      onLoginUserChange,
      loginUserValue,
      countriesList,
      onCountryChange,
      selectedCountry,
      getFooter = () => undefined,
      onLoginHelp,
      phoneInputProps,
      isPhoneValid,
      tenantInputProps,
      helpText,
      onNameChange,
      onEmailChange,
      name,
      email,
      isEmailValid,
      isNameValid,
      newflow
    } = this.props;

    const isButtonDisabled = !loginUserValue || !isPhoneValid;

    return (
      <View style={styles.wrapper}>
        {loginPage === LOGIN_PAGE.USER_PAGE && newflow && (
          <Touchable
            onPress={() =>
              this.setState({
                signin: !signin,
                tenantConfigFetched: false,
                withoutCode: false
              })
            }
            style={styles.header}
          >
            <Text color={colors.violet.base}>
              {!signin ? "Login" : "Create new account"}
            </Text>
          </Touchable>
        )}
        <View style={styles.container}>
          <Text bold size={27} color={colors.gray.darker}>
            {signin || !newflow ? "Glad to see you" : "Create an account"}
          </Text>
          <Text
            size={15}
            color={colors.gray.dark}
            style={styles.loginSubHeader}
          >
            {this.getText()}
          </Text>
          <View style={styles.formContainer}>
            {loginPage === LOGIN_PAGE.USER_PAGE && (
              <>
                {!tenantConfigFetched && !withoutCode && (
                  <Input
                    readOnly={tenantConfigFetched}
                    value={tenant}
                    placeholder="Company code"
                    onChange={this.onTenantChange}
                    errorMessage={
                      !isTenantValid ? "Please check the company code" : ""
                    }
                    inputProps={{
                      autoFocus: true,
                      testID: "company-input"
                    }}
                    {...tenantInputProps}
                  />
                )}
                {(tenantConfigFetched || withoutCode) && (
                  <>
                    {tenantConfigFetched && (
                      <View style={styles.companyInfo}>
                        <Text size={15}>
                          <Text color={colors.gray.dark}>Company Code: </Text>
                          <Text
                            bold
                            color={colors.gray.darker}
                            style={styles.loginUserText}
                          >
                            {tenant.toUpperCase()}
                          </Text>
                        </Text>
                        <Touchable
                          onPress={this.onTenantEdit}
                          testID="edit-company"
                        >
                          <Text
                            style={styles.textButton}
                            color={colors.violet.base}
                            bold
                          >
                            Edit
                          </Text>
                        </Touchable>
                      </View>
                    )}
                    {newflow &&
                      (withoutCode || tenantConfigFetched) &&
                      !signin && (
                        <View style={{ flex: 1 }}>
                          <Input
                            readOnly={!withoutCode}
                            value={name}
                            placeholder="Full Name"
                            onChange={onNameChange}
                            errorMessage={
                              !isNameValid ? "Please enter your name" : ""
                            }
                            inputProps={{
                              autoFocus: true,
                              testID: "full-name"
                            }}
                          />
                          <Input
                            readOnly={!withoutCode}
                            value={email}
                            placeholder="Email"
                            onChange={onEmailChange}
                            errorMessage={
                              !isEmailValid
                                ? "Please enter a valid email address"
                                : ""
                            }
                            inputProps={{
                              autoFocus: true,
                              testID: "email"
                            }}
                          />
                        </View>
                      )}
                    <View style={styles.loginUserInput}>
                      <View style={styles.countrySelect}>
                        <Select<OperationalCountry>
                          type="radio"
                          testIdPrefix="countries"
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
                          errorMessage={isPhoneValid ? "" : "Invalid Phone"}
                          inputProps={{
                            autoFocus: true,
                            testID: "phone-input"
                          }}
                          {...phoneInputProps}
                        />
                      </View>
                    </View>
                  </>
                )}
                <Button
                  testID="submit-btn"
                  onPress={() =>
                    tenantConfigFetched || withoutCode
                      ? this.onSendOtp()
                      : this.onTenantSubmit()
                  }
                  disabled={
                    tenantConfigFetched || withoutCode
                      ? isButtonDisabled
                      : !isTenantValid
                  }
                >
                  {tenantConfigFetched || withoutCode
                    ? "Verify Details"
                    : "Next"}
                </Button>
                {newflow &&
                  loginPage === LOGIN_PAGE.USER_PAGE &&
                  !tenantConfigFetched && (
                    <View style={styles.separatorContainer}>
                      <View style={styles.separator} />
                      <Text style={{ paddingHorizontal: 10 }}>or</Text>
                      <View style={styles.separator} />
                    </View>
                  )}
                {newflow &&
                  loginPage === LOGIN_PAGE.USER_PAGE &&
                  !tenantConfigFetched && (
                    <Button
                      type="secondary"
                      onPress={() =>
                        this.setState({
                          withoutCode: !withoutCode,
                          tenantConfigFetched: false
                        })
                      }
                    >
                      {signin ? "Login " : "Sign-up "}
                      {withoutCode ? "with" : "without"} company code
                    </Button>
                  )}
                <View style={styles.loginHelp}>
                  {helpText && (
                    <Text
                      color={colors.gray.base}
                      bold
                      style={styles.loginHelpText}
                      onPress={onLoginHelp}
                    >
                      {helpText}
                    </Text>
                  )}
                  <Text
                    color={colors.violet.base}
                    bold
                    style={styles.loginSupport}
                    onPress={onLoginHelp}
                  >
                    Need Support?
                  </Text>
                </View>
              </>
            )}
            {loginPage === LOGIN_PAGE.OTP_PAGE && this.getOtpPage()}
          </View>
        </View>
        {getFooter(this.state)}
      </View>
    );
  }
}
