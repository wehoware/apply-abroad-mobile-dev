/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  BackHandler,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
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
import DeviceInfo from 'react-native-device-info';
import {userLoginFetch} from '../../redux/slices/authSlice';
import useRedirect from '../../hooks/useRedirect';
import {setDataToAsync} from '../../services/AsyncService';
import {
  categoriesFetchRequest,
  countriesFetchRequest,
  scoreTypesFetchRequest,
} from '../../redux/slices/appSlice';
import LoaderComponent from '../../components/LoaderComponent';
const Login = () => {
  const navigation = useNavigation<stackProps>();
  const dispatch = useAppDispatch();
  const {theme, isFetching, isError} = useAppSelector(state => state.common);
  const [visible, setVisible] = useState<boolean>(false);
  const [orientation, setOrientation] = useState('');
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [deviceId, setDeviceId] = useState<string>('');
  const {categories, countries, scoreTypes} = useAppSelector(
    state => state.app,
  );
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

    if (isEmailValid && isPasswordValid) {
      setEmailError(false);
      setPasswordError(false);

      handleLogin();
    } else {
      setEmailError(!isEmailValid);
      setPasswordError(!isPasswordValid);
    }
  };

  useEffect(() => {
    const deviceIds = DeviceInfo.getDeviceId();
    setDeviceId(deviceIds);
    setDataToAsync(resources.AsyncConstants.deviceId, deviceIds);
    dispatch(categoriesFetchRequest());
    dispatch(countriesFetchRequest());
    dispatch(scoreTypesFetchRequest());
  }, []);

  const handleLogin = () => {
    var data = {
      email: email.toLowerCase(),
      password,
      deviceId,
    };
    dispatch(userLoginFetch(data));

    // navigation.navigate('Home');
  };
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
    box: {
      height: hp('78%'),
      width: wp('95%'),
      backgroundColor: resources.colors.light_green,
      bottom: hp('5%'),
      alignSelf: 'center',
      borderRadius: 15,
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 15,
      elevation: 6,
    },
    inputHeaderText: {
      fontSize: hp('1.9%'),
      color: resources.colors.black,
      fontWeight: '500',
      fontFamily: resources.fonts.Abold,
    },
    forgotText: {
      color: resources.colors.primary,
      marginTop: 10,
      fontWeight: '500',
      fontFamily: resources.fonts.Abold,
    },
    lineMain: {
      flexDirection: 'row',
      width: wp('95%'),
      justifyContent: 'center',
      marginTop: hp('4%'),
      marginBottom: hp('2%'),
      // backgroundColor: 'red',
    },
    boxText: {
      color: resources.colors.black,
      fontWeight: '400',
      fontSize: hp('1.8%'),
      marginTop: 20,
      padding: 20,
      fontFamily: resources.fonts.Amedium,
    },
    start: {marginStart: 20},
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
      width: wp('72%'),
      color: resources.colors.black,
      fontSize: hp('1.8%'),
      fontWeight: '500',
      fontFamily: resources.fonts.Aregular,
      // paddingLeft: 15,
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
      fontFamily: resources.fonts.Aregular,
      paddingLeft: 15,
    },

    signIn: {
      color: resources.colors.white,
      // marginTop: 10,
      fontWeight: '900',
      textAlign: 'center',
      fontSize: hp('1.8%'),
      fontFamily: resources.fonts.Abold,
    },
    button: {
      marginStart: 20,
      height: hp('6%'),
      width: wp('85%'),
      backgroundColor: resources.colors.primary,
      marginTop: hp('3%'),
      borderRadius: 5,
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 6,
      justifyContent: 'center',
    },
    buttonSignUp: {
      marginStart: 20,
      height: hp('6%'),
      width: wp('85%'),
      borderWidth: 1,
      borderColor: resources.colors.primary,
      marginTop: hp('3%'),
      borderRadius: 5,
      justifyContent: 'center',
      // shadowOpacity: 0.2,
      // shadowRadius: 5,
      // elevation: 6,
    },
    googleLogin: {
      marginStart: 20,
      height: hp('6%'),
      width: wp('85%'),
      borderWidth: 1,
      borderColor: resources.colors.primary,
      marginTop: hp('2%'),
      borderRadius: 5,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    googleText: {
      color: resources.colors.darkBlack,
      fontSize: hp('1.8%'),
      fontFamily: resources.fonts.bold,
      fontWeight: '600',
      marginLeft: hp('1%'),
      textAlign: 'center',
    },

    text: {
      // justifyContent: 'center',
      textAlign: 'center',
      color: resources.colors.ash,
      paddingStart: 10,
      marginRight: 10,
    },
    line: {
      width: wp('20%'),
      height: hp('0.3%'),
      backgroundColor: resources.colors.ash,
      alignSelf: 'center',
    },
    errorText: {
      color: resources.colors.red,
      fontSize: hp('1.6%'),
      fontWeight: '500',
      fontFamily: resources.fonts.regular,
    },
    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.main}>
      <CustomStatusbar
        backgroundColor={theme.primary}
        barStyle={'light-content'}
      />
      <View style={styles.header}>
        {/* <Text style={styles.headerText}>Hello Welcome!</Text> */}
        <Text style={styles.headerText}>Sign In</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.boxText}>
          Log in or create an account to start learning with other great people
        </Text>
        <View style={styles.start}>
          {isFetching ? (
            <View style={styles.loader}>
              <LoaderComponent size={hp('3.5%')} color={theme.primary} />
            </View>
          ) : null}
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
              style={[styles.inputStyle1]}
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
          <Text
            style={styles.forgotText}
            onPress={() => navigation.navigate('ForgotPassword')}>
            Forgot Password
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => _validateFields()}>
          <Text style={styles.signIn}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.lineMain}>
          <View style={styles.line} />
          <Text style={styles.text}>or sign in with</Text>
          <View style={styles.line} />
        </View>
        <TouchableOpacity style={styles.googleLogin}>
          <Image
            source={resources.images.GoogleImage}
            style={{height: hp('2%'), width: wp('4%')}}
            resizeMode="contain"
          />
          <Text style={styles.googleText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSignUp}
          // onPress={() => navigation.navigate('Category')}>
          onPress={() => navigation.navigate('Signup')}>
          <Text style={[styles.signIn, {color: resources.colors.black}]}>
            Create Account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
