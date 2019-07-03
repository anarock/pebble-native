import { StyleSheet, View, Platform } from "react-native";
import * as React from "react";
import { Button, Input, Select } from "../components";
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative"
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
  otpInput: {
    top: 0,
    position: "absolute",
    width: "100%",
    height: 50,
    zIndex: 2,
    fontSize: 1,
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
  },
  otpPageLoginHelp: { marginTop: 35 }
});

enum LOGIN_PAGE {
  USER_PAGE = 1,
  OTP_PAGE
}

export default class Login extends React.PureComponent<LoginProps, LoginState> {
  state = {
    loginPage: LOGIN_PAGE.USER_PAGE,
    sendingOTP: false,
    otpTimeout: false,
    tenant: "",
    isTenantValid: true,
    fetchingTenantConfig: false,
    tenantConfigFetched: false
  };

  onOtpSuccess = () =>
    this.setState({
      sendingOTP: false,
      loginPage: LOGIN_PAGE.OTP_PAGE
    });

  onOtpError = () => this.setState({ sendingOTP: false });

  onSendOtp = () => {
    this.setState({ sendingOTP: true });
    this.props.onSendOtp(this.onOtpSuccess, this.onOtpError);
  };

  onResendOtp = () => {
    this.setState({ otpTimeout: false });
    this.props.onResendOtp();
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
    const { otpTimeout } = this.state;

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
            {`${country.country_code}-${loginUserValue}`}
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
              cellParentStyle={styles.cellParentStyle}
              showCellParentBorderColor={true}
              style={styles.otpInput}
              selectionColor="transparent"
              secureTextEntry={true}
              keyboardType="number-pad"
              caretHidden={!!otpValue}
              textContentType="oneTimeCode"
            />
            <View style={{ padding: 10 }}>
              {otpTimeout && (
                <Touchable onPress={this.onResendOtp}>
                  <Text style={styles.resend}>Resend</Text>
                </Touchable>
              )}
              {!otpTimeout && <Countdown onFinish={this.onCountdownTimeUp} />}
            </View>
          </View>
        </View>
        <Text
          bold
          color={colors.violet.base}
          style={[styles.otpPageLoginHelp, styles.loginHelp]}
          onPress={onLoginHelp}
        >
          Get support for login
        </Text>
        <Button onPress={onSignIn} disabled={otpLength !== otpValue.length}>
          Sign in
        </Button>
      </>
    );
  };

  onTenantChange = value => {
    this.setState({
      isTenantValid: true,
      tenant: value
    });
  };

  onTenantSubmit = async () => {
    this.setState({ fetchingTenantConfig: true });
    try {
      await this.props.onTenantSubmit(this.state.tenant);
      this.setState({ tenantConfigFetched: true, fetchingTenantConfig: false });
    } catch {
      this.setState({
        isTenantValid: false,
        fetchingTenantConfig: true
      });
    }
  };

  onTenantEdit = () => {
    this.setState({
      tenantConfigFetched: false
    });
  };

  render() {
    const {
      loginPage,
      sendingOTP,
      tenant,
      isTenantValid,
      fetchingTenantConfig,
      tenantConfigFetched
    } = this.state;
    const {
      onLoginUserChange,
      loginUserValue,
      countriesList,
      onCountryChange,
      selectedCountry,
      footer,
      onLoginHelp,
      phoneInputProps,
      isPhoneValid,
      tenantInputProps
    } = this.props;

    const isButtonDisabled = !loginUserValue || !isPhoneValid;
    const extraProps = { autoFocus: true };

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
              {!tenantConfigFetched && (
                <Input
                  readOnly={tenantConfigFetched}
                  value={tenant}
                  placeholder="Company code"
                  onChange={this.onTenantChange}
                  errorMessage={
                    !isTenantValid ? "Please check the company code" : ""
                  }
                  inputProps={extraProps}
                  {...tenantInputProps}
                />
              )}
              {tenantConfigFetched && (
                <>
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
                    <Touchable onPress={this.onTenantEdit}>
                      <Text
                        style={styles.textButton}
                        color={colors.violet.base}
                        bold
                      >
                        Edit
                      </Text>
                    </Touchable>
                  </View>
                  <View style={styles.loginUserInput}>
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
                        errorMessage={isPhoneValid ? "" : "Invalid Phone"}
                        inputProps={extraProps}
                        {...phoneInputProps}
                      />
                    </View>
                  </View>
                </>
              )}
              <Text
                color={colors.violet.base}
                bold
                style={styles.loginHelp}
                onPress={onLoginHelp}
              >
                Get support for login
              </Text>
              <Button
                onPress={
                  tenantConfigFetched ? this.onSendOtp : this.onTenantSubmit
                }
                disabled={
                  tenantConfigFetched ? isButtonDisabled : !isTenantValid
                }
                loading={
                  tenantConfigFetched ? sendingOTP : fetchingTenantConfig
                }
              >
                {tenantConfigFetched ? "Send OTP" : "Submit"}
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
