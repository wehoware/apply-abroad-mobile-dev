/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import CustomStatusbar from '../../components/CustomStatusbar';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../hooks/redux_hooks';
import {stackProps} from '../../navigation/types';
import resources from '../../resources';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../services/ResponsiveUIHelpers';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import useRedirect from '../../hooks/useRedirect';
import {emailValidator} from '../../services/Validators';
import {setDataToAsync} from '../../services/AsyncService';
import {userPasswordOTPFetch} from '../../redux/slices/authSlice';
const ForgotPassword = () => {
  const navigation = useNavigation<stackProps>();
  const dispatch = useAppDispatch();
  const {theme} = useAppSelector(state => state.common);
  const [visible, setVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  // const [password, SetPassword] = useState<string>('');

  const [emailError, setEmailError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [retypePassword, setRetypePassword] = useState<string>('');
  const [retypePasswordError, setRetypePasswordError] =
    useState<boolean>(false);

  // useEffect(() => {
  //   const deviceIds = DeviceInfo.getDeviceId();
  //   setDeviceId(deviceIds);
  //   setDataToAsync(resources.AsyncConstants.deviceId, deviceIds);
  // }, []);

  const {isLogged, redirect} = useAppSelector(state => state.auth);
  useRedirect(redirect, 'replace');
  const _validateFields = () => {
    let isEmailValid =
      email.length > 0
        ? emailValidator(email) === true
          ? true
          : false
        : false;

    let isPasswordValid = password.length > 0 ? true : false;
    let isRetypePasswordValid = retypePassword.length > 0 ? true : false;
    if (isEmailValid && isPasswordValid) {
      setEmailError(false);
      setPasswordError(false);
      setRetypePasswordError(false);

      handlePassword();
    } else {
      setEmailError(!isEmailValid);
      setPasswordError(!isPasswordValid);
      setRetypePasswordError(!isRetypePasswordValid);
    }
  };
  const handlePassword = () => {
    var data = {
      email: email.toLowerCase(),
    };
    dispatch(userPasswordOTPFetch(data));
    setDataToAsync(resources.AsyncConstants.email, email.toLowerCase());
    setDataToAsync(resources.AsyncConstants.password, password);
    // navigation.navigate('Home');
  };

  const styles = StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: resources.colors.white,
    },
    header: {
      backgroundColor: resources.colors.primary,
      height: hp('18%'),
      width: wp('100%'),
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },
    headerText: {
      color: resources.colors.white,
      fontWeight: '600',
      fontFamily: resources.fonts.medium,
      fontSize: hp('3%'),
    },
    box: {
      height: hp('70%'),
      width: wp('95%'),
      backgroundColor: resources.colors.light_green,
      bottom: hp('5%'),
      alignSelf: 'center',
      borderRadius: 15,
    },
    boxText: {
      color: '#141B13',
      fontWeight: '400',
      fontSize: hp('2.1%'),
      marginTop: 20,
      // marginStart: 20,
      padding: 20,
    },
    inputHeaderText: {
      fontSize: hp('1.8%'),
      color: '#141B13',
      fontWeight: '500',
      fontFamily: resources.fonts.medium,
    },
    start: {marginStart: 20},
    inputStyle: {
      height: hp('6%'),
      width: wp('85%'),
      borderColor: '#AFAFAF',
      borderWidth: 1,
      borderRadius: 5,
      color: resources.colors.black,
      fontSize: hp('1.8%'),
      fontWeight: '500',
      marginTop: hp('1%'),
      fontFamily: resources.fonts.regular,
      paddingLeft: 15,
    },
    inputStyle1: {
      height: hp('6%'),
      width: wp('75%'),
      color: resources.colors.black,
      fontSize: hp('1.8%'),
      fontWeight: '500',
      fontFamily: resources.fonts.regular,
      paddingLeft: 15,
    },
    passwordStyle: {
      height: hp('6%'),
      width: wp('85%'),
      borderColor: '#AFAFAF',
      borderWidth: 1,
      borderRadius: 5,
      flexDirection: 'row',
      fontWeight: '500',
      alignItems: 'center',
      marginTop: hp('1%'),
    },
    forgotText: {
      color: resources.colors.primary,
      marginTop: 10,
      fontWeight: '700',
    },
    signIn: {
      color: resources.colors.white,
      marginTop: 10,
      fontWeight: '600',
      textAlign: 'center',
      fontSize: hp('2.0%'),
    },
    button: {
      marginStart: 20,
      height: hp('6%'),
      width: wp('85%'),
      backgroundColor: resources.colors.primary,
      marginTop: hp('5%'),
      borderRadius: 5,
    },
    buttonSignUp: {
      marginStart: 20,
      height: hp('6%'),
      width: wp('85%'),
      borderWidth: 1,
      borderColor: resources.colors.primary,
      marginTop: hp('5%'),
      borderRadius: 5,
    },
    errorText: {
      color: resources.colors.red,
      fontSize: hp('1.6%'),
      fontWeight: '500',
      fontFamily: resources.fonts.regular,
    },
  });

  return (
    <View style={styles.main}>
      <CustomStatusbar
        backgroundColor={theme.primary}
        barStyle={'light-content'}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Hello Welcome!</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.boxText}>
          Log in or create an account to start learning with other great people
        </Text>
        <View style={styles.start}>
          <Text style={styles.inputHeaderText}>E-mail</Text>
          <TextInput
            placeholder="Enter your E-mail"
            placeholderTextColor={'#AFAFAF'}
            style={styles.inputStyle}
            keyboardType="email-address"
            value={email}
            onChangeText={val => setEmail(val)}
          />
          {emailError ? (
            <Text style={styles.errorText}>{'Please enter email'}</Text>
          ) : null}
        </View>

        <View style={styles.start}>
          <Text style={[styles.inputHeaderText, {marginTop: hp('1%')}]}>
            Password
          </Text>
          <View style={styles.passwordStyle}>
            <TextInput
              placeholder="Enter your Password"
              placeholderTextColor={'#AFAFAF'}
              style={styles.inputStyle1}
              secureTextEntry={!visible ? true : false}
              value={password}
              onChangeText={val => setPassword(val)}
            />
            <FontAwesome
              name={!visible ? 'eye-slash' : 'eye'}
              size={20}
              color="#AFAFAF"
              onPress={() => setVisible(!visible)}
            />
          </View>
          {passwordError ? (
            <Text style={styles.errorText}>{'Please enter password'}</Text>
          ) : null}
        </View>

        <View style={styles.start}>
          <Text style={[styles.inputHeaderText, {marginTop: hp('1%')}]}>
            Retype Password
          </Text>
          <View style={styles.passwordStyle}>
            <TextInput
              placeholder="Retype your Password"
              placeholderTextColor={'#AFAFAF'}
              style={styles.inputStyle1}
              secureTextEntry={!visible ? true : false}
              value={retypePassword}
              onChangeText={val => setRetypePassword(val)}
            />
            <FontAwesome
              name={!visible ? 'eye-slash' : 'eye'}
              size={20}
              color="#AFAFAF"
              onPress={() => setVisible(!visible)}
            />
          </View>
          {retypePasswordError ? (
            <Text style={styles.errorText}>
              {'Please enter retype password'}
            </Text>
          ) : null}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => _validateFields()}>
          <Text style={styles.signIn}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSignUp}
          onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.signIn, {color: resources.colors.black}]}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPassword;
