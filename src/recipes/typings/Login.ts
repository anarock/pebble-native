import { InputProps } from "../../components/typings/Input";

export interface OperationalCountry {
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
  footer?: React.ReactNode;
  onLoginHelp: () => void;
  otpLength: number;
  phoneInputProps?: Partial<InputProps>;
  isPhoneValid: boolean;
  tenantInputProps?: Partial<InputProps>;
  onTenantSubmit: (tenant: string) => Promise<void>;
  helpText?: React.ReactNode;
}

export interface LoginState {
  loginPage: number;
  otpTimeout: boolean;
  tenant: string;
  isTenantValid: boolean;
  isSubmitButtonLoading: boolean;
  tenantConfigFetched: boolean;
}
