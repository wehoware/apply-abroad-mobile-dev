import {StackNavigationProp} from '@react-navigation/stack';

export type StackNavigatorList = {
  Splash: undefined;
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  VerificationCode: undefined;
  PasswordVerificationCode: undefined;
  Education: undefined;
  Certificates: undefined;
  Category: undefined;
  UploadDocuments: undefined;
  Home: undefined;
  CourseDetails: undefined;
  CheckOut: undefined;
  Notifications: undefined;
  EditProfile: undefined;
  Profile: undefined;
  ChangePassword: undefined;
  UpdateProfile: undefined;
  Categories: undefined;
  Settings: undefined;
  CountrySelect: undefined;
};

export type stackProps = StackNavigationProp<StackNavigatorList>;
// export type bottomTabProps = BottomNavigationProps<TabNavigatorList>;
// export type stackBottomProps = CompositeNavigationProp<stackProps, >;
