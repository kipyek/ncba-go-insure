import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";


export interface AuthNavigationProps<
  RouteName extends keyof AuthenticationRoutes
> {
  navigation: CompositeNavigationProp<
    NativeStackNavigationProp<AuthenticationRoutes, RouteName>,
    DrawerNavigationProp<AppRoutes, "Home">
  >;
  route: RouteProp<AuthenticationRoutes, RouteName>;
}

export interface HomeNavigationProps<RouteName extends keyof HomeRoutes> {
  navigation: DrawerNavigationProp<HomeRoutes, RouteName>,
  route: RouteProp<HomeRoutes, RouteName>;
}


export type AppRoutes = {
  Authentication: undefined;
  Home: undefined;
  AuthHome: any;
  ForgotPassword: any;
  LoginOTP: any;
  Register: any;
}

export type AuthenticationRoutes = {
  Login: undefined;
  AuthHome: any;
  Register: any;
  Help: any;
  GetQuote: any;
  LoginOTP: any;
  ForgotPassword: any;
  RegisterOTP: any;
  ResetPassword: any;

};

export type HomeRoutes = {
  Dashboard: undefined;
  Main: any;
  Profile: any;
  Transaction: any;
  Quote: any;
  QuoteBenefit: any;
  QuoteRequest: any;
  QuoteList: any;
  QuoteFinish: any;
  QuoteConfirm: any;
  Home: any;
  Claim: any;
  ClaimForm: any;
  QuoteDetails: any;
  ClaimDocuments: any;
  IpfDocument: any;
  ClaimsDocumentsScreen: any;
  ClaimSuccess: any;
  RenewRequest: any;
  RenewList: any;
  RenewBenefit: any;
  RenewConfirm: any;
  RenewFinish: any;
  Details: any
}