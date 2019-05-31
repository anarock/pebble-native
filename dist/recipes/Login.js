import { StyleSheet, View } from "react-native";
import * as React from "react";
import { Button, Input, Select } from "../components";
import { colors } from "../theme";
import Touchable from "../components/shared/Touchable";
import Countdown from "../components/shared/Countdown";
import Text from "../components/Text";
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
    borderBottomWidth: 1,
    margin: 0,
    marginRight: 20,
    paddingVertical: 0,
    paddingBottom: 5,
    fontFamily: "anarock_medium"
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
var LOGIN_PAGE;
(function(LOGIN_PAGE) {
  LOGIN_PAGE[(LOGIN_PAGE["USER_PAGE"] = 1)] = "USER_PAGE";
  LOGIN_PAGE[(LOGIN_PAGE["OTP_PAGE"] = 2)] = "OTP_PAGE";
})(LOGIN_PAGE || (LOGIN_PAGE = {}));
export default class Login extends React.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      loginPage: LOGIN_PAGE.USER_PAGE,
      sendingOTP: false,
      otpTimeout: false,
      tenant: "",
      isTenantValid: true,
      fetchingTenantConfig: false,
      tenantConfigFetched: false
    };
    this.onOtpSuccess = () =>
      this.setState({
        sendingOTP: false,
        loginPage: LOGIN_PAGE.OTP_PAGE
      });
    this.onOtpError = () => this.setState({ sendingOTP: false });
    this.onSendOtp = () => {
      this.setState({ sendingOTP: true });
      this.props.onSendOtp(this.onOtpSuccess, this.onOtpError);
    };
    this.onResendOtp = () => {
      this.setState({ otpTimeout: false });
      this.props.onResendOtp();
    };
    this.onEdit = () => {
      this.setState({
        loginPage: LOGIN_PAGE.USER_PAGE,
        otpTimeout: false
      });
      this.props.onOtpChange("");
    };
    this.onCountdownTimeUp = () => this.setState({ otpTimeout: true });
    this.getOtpPage = () => {
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
      return React.createElement(
        React.Fragment,
        null,
        React.createElement(
          View,
          { style: styles.userInfoWrap },
          React.createElement(
            Text,
            {
              size: 15,
              bold: true,
              color: colors.gray.darker,
              style: styles.loginUserText
            },
            `${country.country_code}-${loginUserValue}`
          ),
          React.createElement(
            Touchable,
            { onPress: this.onEdit },
            React.createElement(
              Text,
              {
                style: styles.textButton,
                color: colors.violet.base,
                bold: true
              },
              "Edit"
            )
          )
        ),
        React.createElement(
          View,
          { style: { marginTop: 60 } },
          React.createElement(
            Text,
            { color: colors.gray.dark, size: 12 },
            "Enter OTP"
          ),
          React.createElement(
            View,
            { style: styles.otpInputWrap },
            React.createElement(OTPInput, {
              value: otpValue,
              onChange: onOtpChange,
              tintColor: colors.violet.base,
              offTintColor: colors.gray.base,
              otpLength: otpLength,
              cellStyle: styles.cellStyle,
              style: styles.otpInput,
              selectionColor: "transparent",
              secureTextEntry: true,
              keyboardType: "number-pad",
              caretHidden: !!otpValue
            }),
            React.createElement(
              View,
              { style: { padding: 10 } },
              otpTimeout &&
                React.createElement(
                  Touchable,
                  { onPress: this.onResendOtp },
                  React.createElement(Text, { style: styles.resend }, "Resend")
                ),
              !otpTimeout &&
                React.createElement(Countdown, {
                  onFinish: this.onCountdownTimeUp
                })
            )
          )
        ),
        React.createElement(
          Text,
          {
            bold: true,
            color: colors.violet.base,
            style: [styles.otpPageLoginHelp, styles.loginHelp],
            onPress: onLoginHelp
          },
          "Get support for login"
        ),
        React.createElement(
          Button,
          { onPress: onSignIn, disabled: otpLength !== otpValue.length },
          "Sign in"
        )
      );
    };
    this.onTenantChange = value => {
      this.setState({
        isTenantValid: true,
        tenant: value
      });
    };
    this.onTenantSubmit = async () => {
      this.setState({ fetchingTenantConfig: true });
      try {
        await this.props.onTenantSubmit(this.state.tenant);
        this.setState({
          tenantConfigFetched: true,
          fetchingTenantConfig: false
        });
      } catch {
        this.setState({
          isTenantValid: false,
          fetchingTenantConfig: true
        });
      }
    };
    this.onTenantEdit = () => {
      this.setState({
        tenantConfigFetched: false
      });
    };
  }
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
    return React.createElement(
      View,
      { style: styles.container },
      React.createElement(
        Text,
        { bold: true, size: 27, color: colors.gray.darker },
        "Glad to see you!"
      ),
      React.createElement(
        Text,
        { size: 15, color: colors.gray.dark, style: styles.loginSubHeader },
        "Sign in to continue"
      ),
      React.createElement(
        View,
        { style: styles.formContainer },
        loginPage === LOGIN_PAGE.USER_PAGE &&
          React.createElement(
            React.Fragment,
            null,
            !tenantConfigFetched &&
              React.createElement(
                Input,
                Object.assign(
                  {
                    readOnly: tenantConfigFetched,
                    value: tenant,
                    placeholder: "Company code",
                    onChange: this.onTenantChange,
                    errorMessage: !isTenantValid
                      ? "Please check the company code"
                      : "",
                    inputProps: extraProps
                  },
                  tenantInputProps
                )
              ),
            tenantConfigFetched &&
              React.createElement(
                React.Fragment,
                null,
                React.createElement(
                  View,
                  { style: styles.companyInfo },
                  React.createElement(
                    Text,
                    { size: 15 },
                    React.createElement(
                      Text,
                      { color: colors.gray.dark },
                      "Company Code: "
                    ),
                    React.createElement(
                      Text,
                      {
                        bold: true,
                        color: colors.gray.darker,
                        style: styles.loginUserText
                      },
                      tenant.toUpperCase()
                    )
                  ),
                  React.createElement(
                    Touchable,
                    { onPress: this.onTenantEdit },
                    React.createElement(
                      Text,
                      {
                        style: styles.textButton,
                        color: colors.violet.base,
                        bold: true
                      },
                      "Edit"
                    )
                  )
                ),
                React.createElement(
                  View,
                  { style: styles.loginUserInput },
                  React.createElement(
                    View,
                    { style: styles.countrySelect },
                    React.createElement(Select, {
                      options: countriesList,
                      valueExtractor: item => item && item.country_code,
                      rowLabelExtractor: item =>
                        `${item.name} (${item.country_code})`,
                      keyExtractor: item => item.id,
                      placeholder: "ISD Code",
                      onSelect: onCountryChange,
                      selected: selectedCountry
                    })
                  ),
                  React.createElement(
                    View,
                    { style: styles.phoneInput },
                    React.createElement(
                      Input,
                      Object.assign(
                        {
                          placeholder: "Phone",
                          value: loginUserValue,
                          keyboardType: "phone-pad",
                          onChange: onLoginUserChange,
                          errorMessage: isPhoneValid ? "" : "Invalid Phone",
                          inputProps: extraProps
                        },
                        phoneInputProps
                      )
                    )
                  )
                )
              ),
            React.createElement(
              Text,
              {
                color: colors.violet.base,
                bold: true,
                style: styles.loginHelp,
                onPress: onLoginHelp
              },
              "Get support for login"
            ),
            React.createElement(
              Button,
              {
                onPress: tenantConfigFetched
                  ? this.onSendOtp
                  : this.onTenantSubmit,
                disabled: tenantConfigFetched
                  ? isButtonDisabled
                  : !isTenantValid,
                loading: tenantConfigFetched ? sendingOTP : fetchingTenantConfig
              },
              tenantConfigFetched ? "Send OTP" : "Submit"
            )
          ),
        loginPage === LOGIN_PAGE.OTP_PAGE && this.getOtpPage()
      ),
      footer
    );
  }
}
//# sourceMappingURL=Login.js.map
