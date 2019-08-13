import { InputProps } from "../../components/typings/Input";

interface OperationalCountry {
  id: number;
  name: string;
  url_name: string;
  country_code: string;
}

export interface LoginProps {
  loginUserValue: string;
  onLoginUserChange: (value: string) => void;
  onSendOtp: (onSuccess: () => void, onError: () => void) => void;
  otpValue: string;
  onOtpChange: (value: string) => void;
  onResendOtp: () => void;
  onSignIn: () => void;
  countriesList: OperationalCountry[];
  onCountryChange: (country: OperationalCountry) => void;
  selectedCountry: number;
  footer?: React.ReactText | JSX.Element;
  onLoginHelp: () => void;
  otpLength: number;
  phoneInputProps?: Partial<InputProps>;
  isPhoneValid: boolean;
  tenantInputProps?: Partial<InputProps>;
  onTenantSubmit: (string) => Promise<void>;
  helpText?: React.ReactText | JSX.Element;
}

export interface LoginState {
  loginPage: number;
  sendingOTP: boolean;
  otpTimeout: boolean;
  tenant: string;
  isTenantValid: boolean;
  fetchingTenantConfig: boolean;
  tenantConfigFetched: boolean;
}
