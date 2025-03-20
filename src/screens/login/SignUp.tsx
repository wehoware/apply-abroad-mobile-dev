/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import CustomStatusbar from '../../components/CustomStatusbar';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../hooks/redux_hooks';
import {stackProps} from '../../navigation/types';
import resources from '../../resources';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
} from '../../services/ResponsiveUIHelpers';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {emailValidator, passwordValidator} from '../../services/Validators';
import useRedirect from '../../hooks/useRedirect';
import {userOTPFetch} from '../../redux/slices/authSlice';
import {setDataToAsync} from '../../services/AsyncService';
const SignUp = () => {
  const navigation = useNavigation<stackProps>();
  const dispatch = useAppDispatch();
  const {theme} = useAppSelector(state => state.common);
  const [orientation, setOrientation] = useState('');
  const [visible, setVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>('');
  const [fullNameError, setFullNameError] = useState<boolean>(false);
  const [password, SetPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const {isLogged, redirect} = useAppSelector(state => state.auth);
  useRedirect(redirect, 'replace');
  useFocusEffect(
    useCallback(() => {
      var backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          BackHandler.exitApp();

          return true;
        },
      );

      lor(setOrientation);

      return () => {
        backHandler.remove();
      };
    }, []),
  );

  const _validateFields = () => {
    let isEmailValid =
      email.length > 0
        ? emailValidator(email) === true
          ? true
          : false
        : false;

    let isFullNameValid = fullName.length > 0 ? true : false;
    let isPasswordValid = password.length > 0 ? true : false;

    // let isPasswordValid =
    //   password.length > 0
    //     ? passwordValidator(password) === true
    //       ? true
    //       : false
    //     : false;

    if (isEmailValid && isFullNameValid && isPasswordValid) {
      setEmailError(false);
      setPasswordError(false);
      setFullNameError(false);

      handleSignUp();
    } else {
      setEmailError(!isEmailValid);
      setFullNameError(!isFullNameValid);
      setPasswordError(!isPasswordValid);
    }
  };

  const handleSignUp = () => {
    var data = {
      email: email.toLowerCase(),
    };
    dispatch(userOTPFetch(data));
    setDataToAsync(resources.AsyncConstants.email, email.toLowerCase());
    setDataToAsync(resources.AsyncConstants.fullname, fullName);
    setDataToAsync(resources.AsyncConstants.password, password);
    // navigation.navigate('VerificationCode');
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
      fontWeight: '900',
      fontFamily: resources.fonts.Abold,
      fontSize: hp('3%'),
    },
    start: {marginStart: 20},
    box: {
      height: hp('83%'),
      width: wp('95%'),
      backgroundColor: resources.colors.light_green,
      bottom: hp('5%'),
      alignSelf: 'center',
      borderRadius: 15,
    },
    boxText: {
      color: resources.colors.black,
      fontWeight: '400',
      fontSize: hp('1.8%'),
      marginTop: 20,
      padding: 20,
      fontFamily: resources.fonts.Amedium,
    },
    inputHeaderText: {
      fontSize: hp('1.9%'),
      color: resources.colors.black,
      fontWeight: '500',
      fontFamily: resources.fonts.Abold,
    },

    inputStyle: {
      height: hp('6%'),
      width: wp('85%'),
      borderColor: resources.colors.ash,
      borderWidth: 1,
      borderRadius: 5,
      color: resources.colors.black,
      fontSize: hp('1.8%'),
      fontWeight: '500',
      marginTop: hp('1%'),
      fontFamily: resources.fonts.Aregular,
      paddingLeft: 15,
    },
    inputStyle1: {
      height: hp('6%'),
      width: wp('75%'),
      color: resources.colors.black,
      fontSize: hp('1.8%'),
      fontWeight: '500',
      fontFamily: resources.fonts.Aregular,
      paddingLeft: 15,
    },
    passwordStyle: {
      height: hp('6%'),
      width: wp('85%'),
      borderColor: resources.colors.ash,
      borderWidth: 1,
      borderRadius: 5,
      flexDirection: 'row',
      fontWeight: '500',
      alignItems: 'center',
      marginTop: hp('1%'),
      fontFamily: resources.fonts.regular,
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
      marginTop: hp('2%'),
      borderRadius: 5,
    },
    buttonSignUp: {
      marginStart: 20,
      height: hp('6%'),
      width: wp('85%'),
      borderWidth: 1,
      borderColor: resources.colors.primary,
      marginTop: hp('3%'),
      borderRadius: 5,
    },
    errorText: {
      color: resources.colors.red,
      fontSize: hp('1.6%'),
      fontWeight: '500',
      fontFamily: resources.fonts.regular,
    },
    termsText: {
      fontSize: hp('1.8%'),
      color: resources.colors.black,
      fontWeight: '400',
      fontFamily: resources.fonts.Amedium,
    },
  });
  return (
    <View style={styles.main}>
      <CustomStatusbar
        backgroundColor={theme.primary}
        barStyle={'light-content'}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Ready to Study!</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.boxText}>Fill in the data below to continue</Text>
        <View style={styles.start}>
          <Text style={styles.inputHeaderText}>E-mail</Text>
          <TextInput
            placeholder="Enter your E-mail"
            placeholderTextColor={'#AFAFAF'}
            style={[
              styles.inputStyle,
              {
                borderColor: !emailError
                  ? resources.colors.ash
                  : resources.colors.red,
              },
            ]}
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
            Full Name
          </Text>
          <TextInput
            placeholder="Enter your Full Name"
            placeholderTextColor={'#AFAFAF'}
            style={[
              styles.inputStyle,
              {
                borderColor: !fullNameError
                  ? resources.colors.ash
                  : resources.colors.red,
              },
            ]}
            keyboardType="default"
            value={fullName}
            onChangeText={val => setFullName(val)}
          />

          {fullNameError ? (
            <Text style={styles.errorText}>{'Please enter fullname'}</Text>
          ) : null}
        </View>

        <View style={styles.start}>
          <Text style={[styles.inputHeaderText, {marginTop: hp('1%')}]}>
            Password
          </Text>
          <View
            style={[
              styles.passwordStyle,
              {
                borderColor: !passwordError
                  ? resources.colors.ash
                  : resources.colors.red,
              },
            ]}>
            <TextInput
              placeholder="Enter your Password"
              placeholderTextColor={'#AFAFAF'}
              style={styles.inputStyle1}
              secureTextEntry={!visible ? true : false}
              value={password}
              onChangeText={val => SetPassword(val)}
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
          <Text
            style={styles.forgotText}
            onPress={() => navigation.navigate('ForgotPassword')}>
            Forgot Password
          </Text>
        </View>
        <View style={[styles.start, {marginTop: hp('8%')}]}>
          <Text style={styles.termsText}>
            By registering, you agree to the
            <Text style={{color: resources.colors.primary}}>
              Terms of Service
            </Text>
            and{' '}
            <Text style={{color: resources.colors.primary}}>
              Privacy Policy
            </Text>{' '}
            Fundrises
          </Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => _validateFields()}
          // onPress={() => handleSignUp()}
        >
          <Text style={styles.signIn}>Continue</Text>
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

export default SignUp;
