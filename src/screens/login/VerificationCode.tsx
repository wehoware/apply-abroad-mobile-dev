/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
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
import {getDataFromAsync} from '../../services/AsyncService';
import {userOTPValidateFetch} from '../../redux/slices/authSlice';

const VerificationCode = () => {
  const navigation = useNavigation<stackProps>();

  const dispatch = useAppDispatch();
  const {theme} = useAppSelector(state => state.common);
  const [orientation, setOrientation] = useState('');
  const [otp1, setOtp1] = useState<string>('');
  const [otp1Error, setOtp1Error] = useState<boolean>(false);

  const [otp2, setOtp2] = useState<string>();
  const [otp2Error, setOtp2Error] = useState<boolean>(false);

  const [otp3, setOtp3] = useState<string>();
  const [otp3Error, setOtp3Error] = useState<boolean>(false);

  const [otp4, setOtp4] = useState<string>();
  const [otp4Error, setOtp4Error] = useState<boolean>(false);

  const [otp5, setOtp5] = useState<string>();
  const [otp5Error, setOtp5Error] = useState<boolean>(false);

  const [otp6, setOtp6] = useState<string>();
  const [otp6Error, setOtp6Error] = useState<boolean>(false);

  // const [timeInSeconds, setTimeInSeconds] = useState(60);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [timeLeft, setTimeLeft] = useState(60); // Initialize at 60 seconds
  const [isActive, setIsActive] = useState(true); // Timer
  const _validateFields = () => {
    let otp: any = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;
    _otpValidate(otp);
  };

  const _otpValidate = async (otp: any) => {
    console.log('otp----------', otp);

    let email = await getDataFromAsync(resources.AsyncConstants.email);
    let fullname = await getDataFromAsync(resources.AsyncConstants.fullname);
    let password = await getDataFromAsync(resources.AsyncConstants.password);
    var data = {
      email: email,
      fullName: fullname,
      otp: otp,
      password: password,
      signUpStage: 1,
    };

    dispatch(userOTPValidateFetch(data));
  };
  // const formatTime = (seconds: number) => {
  //   const minutes = Math.floor(seconds / 60); // Get the minutes
  //   const remainingSeconds = seconds % 60; // Get the remaining seconds
  //   return `${minutes < 10 ? '0' : ''}${minutes}:${
  //     remainingSeconds < 10 ? '0' : ''
  //   }${remainingSeconds}`;
  // };

  // useEffect(() => {
  //   timer();
  //   // Cleanup interval when component unmounts
  //   return () => {
  //     if (intervalId) {
  //       clearInterval(intervalId); // Clear the interval using the stored ID
  //     }
  //   };
  // });
  // const timer = () => {
  //   const id = setInterval(() => {
  //     setTimeInSeconds((prevTime: any) => {
  //       if (prevTime <= 0) {
  //         clearInterval(id); // Clear the interval when time reaches 0
  //         return 0; // Prevent negative values
  //       }
  //       return prevTime - 1;
  //     });
  //   }, 1000);
  // };

  useEffect(() => {
    let interval: any;

    // If the timer is active and time left is more than 0, decrease the time every second
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval); // Stop the timer when it reaches zero
    }

    // Cleanup interval on component unmount or timer is paused
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (timeInSeconds: any) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
    )}`;
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

  const handleNumberPress = (num: string) => {
    console.log('111111111', num);
    if (!otp1) {
      setOtp1(num);
      console.log('OTP 1:', num);
    } else if (!otp2) {
      setOtp2(num);
      console.log('OTP 2:', num);
    } else if (!otp3) {
      setOtp3(num);
      console.log('OTP 3:', num);
    } else if (!otp4) {
      setOtp4(num);
      console.log('OTP 4:', num);
    } else if (!otp5) {
      setOtp5(num);
      console.log('OTP 5:', num);
    } else if (!otp6) {
      setOtp6(num);
      console.log('OTP 6:', num);
    }
  };
  const handleBackspace = () => {
    if (otp6 !== '') {
      setOtp6('');
    } else if (otp5 !== '') {
      setOtp5('');
    } else if (otp4 !== '') {
      setOtp4('');
    } else if (otp3 !== '') {
      setOtp3('');
    } else if (otp2 !== '') {
      setOtp2('');
    } else if (otp1 !== '') {
      setOtp1('');
    }
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
      height: hp('78%'),
      width: wp('95%'),
      backgroundColor: resources.colors.light_green,
      bottom: hp('5%'),
      alignSelf: 'center',
      borderRadius: 15,
    },
    inputHeaderText: {
      fontSize: hp('1.9%'),
      color: '#141B13',
      fontWeight: '500',
      fontFamily: resources.fonts.medium,
    },
    boxText: {
      color: '#141B13',
      fontWeight: '400',
      fontSize: hp('2.1%'),
      marginTop: 20,
      // marginStart: 20,
      padding: 20,
    },
    start: {marginStart: 20},
    inputStyle: {
      height: hp('6'),
      width: wp('12%'),
      justifyContent: 'center',
      borderRadius: 5,
      marginStart: hp('1%'),
      color: resources.colors.white,
      textAlign: 'center',
      fontSize: hp('2.5%'),
      fontWeight: '600',
      fontFamily: resources.fonts.bold,
    },
    inputStyle1: {
      height: hp('6%'),
      width: wp('72%'),
      color: resources.colors.black,
      fontSize: hp('1.8%'),
      fontWeight: '500',
      fontFamily: resources.fonts.regular,
      // paddingLeft: 15,
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
      fontFamily: resources.fonts.regular,
      paddingLeft: 15,
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
      fontSize: hp('1.8%'),
    },
    button: {
      marginStart: 20,
      height: hp('6%'),
      width: wp('85%'),
      backgroundColor: resources.colors.primary,
      marginTop: hp('3%'),
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
    googleLogin: {
      marginStart: 20,
      height: hp('6%'),
      width: wp('85%'),
      borderWidth: 1,
      borderColor: resources.colors.primary,
      marginTop: hp('3%'),
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
    },
    lineMain: {
      flexDirection: 'row',
      width: wp('100%'),
      justifyContent: 'center',
      marginTop: 10,
    },
    text: {
      justifyContent: 'center',
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
    otpBox: {
      flexDirection: 'row',
      marginStart: hp('1%'),
      width: wp('90%'),
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    numberPad: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: wp('80%'),
      justifyContent: 'space-between',
      marginStart: hp('1%'),
    },
    numberButton: {
      width: wp('25%'),
      height: hp('9%'),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: resources.colors.light_orange,
      borderRadius: 5,
      marginStart: hp('2%'),
      marginTop: 10,
    },

    noButton: {
      width: wp('25%'),
      height: hp('9%'),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      marginStart: hp('2%'),
      marginTop: 10,
    },
    numberText: {
      fontSize: hp('3%'),
      fontWeight: '600',
      color: resources.colors.black,
    },
    backButton: {
      width: wp('25%'),
      height: hp('9%'),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: resources.colors.primary,
      borderRadius: 5,
      marginStart: hp('2%'),
      marginTop: 10,
    },
  });

  return (
    <View style={styles.main}>
      <CustomStatusbar
        backgroundColor={theme.primary}
        barStyle={'light-content'}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Verification</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.boxText}>
          Please enter the verification code sent to S********a@test.com
        </Text>
        <View style={styles.otpBox}>
          {[otp1, otp2, otp3, otp4, otp5, otp6].map((otp: any, index: any) => (
            <TextInput
              key={index}
              style={[
                styles.inputStyle,
                {
                  backgroundColor: otp
                    ? resources.colors.primary
                    : resources.colors.ash,
                },
              ]}
              value={otp}
              maxLength={1}
              editable={false}
            />
          ))}
        </View>
        <View style={{marginTop: hp('2')}}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: hp('2%'),
              fontFamily: resources.fonts.regular,
              color: resources.colors.ash,

              fontWeight: '500',
            }}>
            {'Valid until '}
            <Text style={{color: resources.colors.red}}>
              {formatTime(timeLeft)}
              {/* {formatTime(timeInSeconds)} */}
            </Text>
          </Text>
        </View>

        <View style={styles.numberPad}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.numberButton}
              onPress={() => handleNumberPress('1')}>
              <Text style={styles.numberText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.numberButton}
              onPress={() => handleNumberPress('2')}>
              <Text style={styles.numberText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.numberButton}
              onPress={() => handleNumberPress('3')}>
              <Text style={styles.numberText}>3</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.numberButton}
              onPress={() => handleNumberPress('4')}>
              <Text style={styles.numberText}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.numberButton}
              onPress={() => handleNumberPress('5')}>
              <Text style={styles.numberText}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.numberButton}
              onPress={() => handleNumberPress('6')}>
              <Text style={styles.numberText}>6</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.numberButton}
              onPress={() => handleNumberPress('7')}>
              <Text style={styles.numberText}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.numberButton}
              onPress={() => handleNumberPress('8')}>
              <Text style={styles.numberText}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.numberButton}
              onPress={() => handleNumberPress('9')}>
              <Text style={styles.numberText}>9</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.noButton}>
              {/* <Text></Text> */}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.numberButton}
              onPress={() => handleNumberPress('0')}>
              <Text style={styles.numberText}>0</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBackspace}>
              <Text style={styles.numberText}>{'⌫'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => _validateFields()}>
          <Text style={styles.signIn}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VerificationCode;
