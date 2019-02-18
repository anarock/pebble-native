import { StyleSheet, View, Text } from "react-native";
import * as React from "react";
import { Button, Icon, colors, Controls, Input } from "../";
// import OtpPage from "./OtpPage";

interface LoginProps {
  loginUserValue: string;
  loginUserChange: (value: string) => void;
  onSendOtp: () => void;
}

interface LoginState {
  loginMethod: number;
  loginPage: number;
  sendingOTP: boolean;
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
    marginTop: 60
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
    sendingOTP: false
  };

  onSendOtp = async () => {
    this.setState({ sendingOTP: true });
    await this.props.onSendOtp();
    this.setState({
      sendingOTP: false,
      loginPage: LOGIN_PAGE.OTP_PAGE
    });
  };

  render() {
    const { loginMethod, loginPage, sendingOTP } = this.state;
    const { loginUserChange, loginUserValue } = this.props;

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
                  loginUserChange("");
                  this.setState({ loginMethod: selected as number });
                }}
              />
              <Input
                placeholder={
                  LOGIN_METHODS.find(option => option.id === loginMethod)!.name
                }
                onChange={loginUserChange}
                value={loginUserValue}
                style={styles.loginUserInput}
                keyboardType={
                  loginMethod === LOGIN_OPTIONS.PHONE
                    ? "number-pad"
                    : "email-address"
                }
              />
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
          {loginPage === LOGIN_PAGE.OTP_PAGE && (
            <Text
              onPress={() => this.setState({ loginPage: LOGIN_PAGE.USER_PAGE })}
            >
              Something will come
            </Text>
            // <OtpPage
            //   loginUser={loginUser}
            //   onEditUser={() =>
            //     this.setState({ loginPage: LOGIN_PAGE.USER_PAGE })
            //   }
            // />
          )}
        </View>
      </View>
    );
  }
}
