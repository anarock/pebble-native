import { StyleSheet, View, Text } from "react-native";
import * as React from "react";
import { Button, Icon, colors, Controls, Input } from "../";
// import OtpPage from "./OtpPage";

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
  EMAIL = 1,
  PHONE
}

enum LOGIN_PAGE {
  USER_PAGE = 1,
  OTP_PAGE
}

const LOGIN_METHODS = [
  { id: LOGIN_OPTIONS.PHONE, name: "Phone Number" },
  { id: LOGIN_OPTIONS.EMAIL, name: "Email Address" }
];

export default class Login extends React.PureComponent {
  state = {
    loginMethod: LOGIN_OPTIONS.PHONE,
    loginUser: "",
    loginPage: LOGIN_PAGE.USER_PAGE,
    sendingOTP: false
  };

  render() {
    const { loginMethod, loginUser, loginPage, sendingOTP } = this.state;

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
                onChange={({ selected }) =>
                  this.setState({ loginMethod: selected })
                }
              />
              <Input
                placeholder={
                  LOGIN_METHODS.find(option => option.id === loginMethod)!.name
                }
                onChange={value => this.setState({ loginUser: value })}
                value={loginUser}
                style={styles.loginUserInput}
                keyboardType={
                  loginMethod === LOGIN_OPTIONS.PHONE
                    ? "number-pad"
                    : "email-address"
                }
              />
              <Button
                type="primary"
                onPress={() => {
                  this.setState({ sendingOTP: true });
                  setTimeout(
                    () =>
                      this.setState({
                        sendingOTP: false,
                        loginPage: LOGIN_PAGE.OTP_PAGE
                      }),
                    2000
                  );
                }}
                disabled={!loginUser}
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
