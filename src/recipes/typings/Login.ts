import { FC } from "react";
import { InputProps } from "../../components/typings/Input";

export interface OperationalCountry {
  id: number;
  name: string;
  url_name: string;
  country_code: string;
}

export interface LoginProps {
  countriesList: OperationalCountry[];
  getFooter?: FC<LoginState>;
  helpText?: React.ReactNode;
  isPhoneValid: boolean;
  loginUserValue: string;
  onCallOtp: (signin?: boolean) => void;
  onCountryChange: (country: OperationalCountry) => void;
  onLoginHelp: () => void;
  onLoginUserChange: (value: string) => void;
  onOtpChange: (value: string) => void;
  onResendOtp: (signin?: boolean) => void;
  onSendOtp: (
    onSuccess: () => void,
    onError: () => void,
    signin: boolean
  ) => void;
  onSignIn: () => void;
  onTenantSubmit: (tenant: string) => Promise<void>;
  otpLength: number;
  otpValue: string;
  phoneInputProps?: Partial<InputProps>;
  selectedCountry: number;
  smsOtpRetriesAllowed?: number;
  tenantInputProps?: Partial<InputProps>;
  newflow?: boolean;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  isEmailValid: boolean;
  isNameValid: boolean;
  name: string;
  email: string;
  onTenantSubmitWithoutCode: () => void;
}

export interface LoginState {
  fetchingTenantConfig: boolean;
  isSubmitButtonLoading: boolean;
  isTenantValid: boolean;
  loginPage: number;
  otpResendAttempts: number;
  otpTimeout: boolean;
  tenant: string;
  tenantConfigFetched: boolean;
  withoutCode: boolean;
  signin: boolean;
}
