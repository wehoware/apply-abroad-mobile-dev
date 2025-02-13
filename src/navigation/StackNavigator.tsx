import React from 'react';
import {StackNavigatorList} from '../navigation/types';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../screens/login/Login';
import Splash from '../screens/Splash';
import Signup from '../screens/login/SignUp';
import ForgotPassword from '../screens/login/ForgotPassword';
import WelcomScreen from '../screens/welcome/WelcomScreen';
// import Home from '../screens/home/Home';
import VerificationCode from '../screens/login/VerificationCode';
import Education from '../screens/login/Education';
import Certificates from '../screens/login/Certificates';
import Category from '../screens/login/Category';
import UploadDocuments from '../screens/login/UploadDocuments';
import TabNavigator from './TabNavigator';
import CourseDetails from '../screens/Applied/CourseDetails';
import CheckOut from '../screens/Applied/CheckOut';
import Notifications from '../screens/Settings/Notifications';
import EditProfile from '../screens/Settings/EditProfile';
import PasswordVerificationCode from '../screens/login/PasswordVerificationCode';
import CountrySelect from '../screens/login/CountrySelect';
const Stack = createStackNavigator<StackNavigatorList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Stack.Screen name={'Splash'} component={Splash} />
      <Stack.Screen name={'Welcome'} component={WelcomScreen} />
      <Stack.Screen name={'Login'} component={Login} />
      <Stack.Screen name={'Signup'} component={Signup} />
      <Stack.Screen name={'ForgotPassword'} component={ForgotPassword} />
      <Stack.Screen name={'VerificationCode'} component={VerificationCode} />
      <Stack.Screen name={'Education'} component={Education} />
      <Stack.Screen name={'Certificates'} component={Certificates} />
      <Stack.Screen name={'Category'} component={Category} />
      <Stack.Screen name={'CountrySelect'} component={CountrySelect} />
      <Stack.Screen name={'UploadDocuments'} component={UploadDocuments} />
      <Stack.Screen name={'Home'} component={TabNavigator} />
      <Stack.Screen name={'CourseDetails'} component={CourseDetails} />
      <Stack.Screen name={'CheckOut'} component={CheckOut} />
      <Stack.Screen name={'Notifications'} component={Notifications} />
      <Stack.Screen name={'EditProfile'} component={EditProfile} />
      <Stack.Screen
        name={'PasswordVerificationCode'}
        component={PasswordVerificationCode}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
