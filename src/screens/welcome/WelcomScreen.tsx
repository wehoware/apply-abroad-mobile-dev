/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import resources from '../../resources';
import {useNavigation} from '@react-navigation/native';
import {stackProps} from '../../navigation/types';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
} from '../../services/ResponsiveUIHelpers';
import {getDataFromAsync, setDataToAsync} from '../../services/AsyncService';
const WelcomScreen = () => {
  const [count, setCount] = useState<number>(0);
  const navigation = useNavigation<stackProps>();

  const [orientation, setOrientation] = useState('');

  useEffect(() => {
    initialMount();
    lor(setOrientation);
  }, []);

  const initialMount = async () => {
    try {
      let isFirstTime = await getDataFromAsync(
        resources.AsyncConstants.isFirstTime,
      );

      if (isFirstTime == null) {
        await setDataToAsync(resources.AsyncConstants.isFirstTime, true);
      }
    } catch (error) {
      console.log('error in getting data from async ==>', error);
    }
  };

  const increment = () => {
    setCount(count + 1);
  };

  const styles = StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: resources.colors.white,
    },
    skip: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      margin: hp('3%'),
      height: hp('5%'),
    },
    skipText: {
      color: resources.colors.olive_green,
      fontSize: hp('2.3%'),
      fontFamily: resources.fonts.medium,
      fontWeight: '600',
      textAlign: 'center',
    },
    skipIcon: {marginTop: 8, marginStart: 5},
    button: {
      marginStart: 20,
      height: hp('6%'),
      width: wp('85%'),
      backgroundColor: resources.colors.primary,
      marginTop: hp('5%'),
      borderRadius: 5,
    },
    signIn: {
      color: resources.colors.white,
      marginTop: 10,
      fontWeight: '600',
      textAlign: 'center',
      fontSize: hp('2.0%'),
    },
    buttonSignUp: {
      marginStart: 20,
      height: hp('6%'),
      width: wp('85%'),
      borderWidth: 1,
      borderColor: resources.colors.olive_green,
      marginTop: hp('5%'),
      borderRadius: 5,
    },
    bootomView: {
      flexDirection: 'row',
      marginTop: hp('15%'),
      marginStart: hp('3%'),
      width: wp('95%'),
    },
    nextButton: {
      backgroundColor: resources.colors.primary,
      height: hp('5%'),
      width: wp('30%'),
      borderRadius: 5,
      justifyContent: 'center',
    },
    nextButtonText: {
      color: resources.colors.white,
      fontSize: hp('1.8%'),
      fontFamily: resources.fonts.medium,
      textAlign: 'center',
      fontWeight: '600',
    },
  });
  return (
    <View style={styles.main}>
      {count === 0 || count === 1 ? (
        <>
          <Pressable
            onPress={() => navigation.navigate('Login')}
            style={styles.skip}>
            <Text style={styles.skipText}>Skip</Text>
            <AntDesign
              name={'right'}
              color={resources.colors.olive_green}
              size={18}
              style={styles.skipIcon}
            />
          </Pressable>
        </>
      ) : (
        <View style={styles.skip} />
      )}
      <View
        style={{
          marginTop: hp('10%'),
          width: wp('100%'),
          height: hp('35%'),
        }}>
        <Image
          source={
            count === 0
              ? resources.images.Onboard1
              : count === 1
              ? resources.images.Onboard2
              : resources.images.Onboard3
          }
          style={{width: wp('100%'), height: hp('28%')}}
          resizeMode="contain"
        />
      </View>
      {count === 0 ? (
        <View style={{marginStart: hp('3%')}}>
          <Text
            style={{
              fontSize: hp('4%'),
              color: resources.colors.black,
              fontFamily: resources.fonts.bold,
            }}>
            Apply for Any{' '}
            <Text style={{color: resources.colors.primary}}>College</Text> From{' '}
            <Text style={{color: resources.colors.orange}}>Anywhere</Text>
          </Text>
        </View>
      ) : count === 1 ? (
        <View style={{marginStart: hp('3%')}}>
          <Text
            style={{
              fontSize: hp('4%'),
              color: resources.colors.black,
              fontFamily: resources.fonts.bold,
            }}>
            <Text style={{color: resources.colors.primary}}>Powerful</Text>
            <Text style={{color: resources.colors.orange}}>{'  A.I'}</Text>
            {'\n'}
            Ready to Help You
          </Text>
        </View>
      ) : (
        <View style={{marginStart: hp('3%')}}>
          <Text
            style={{
              fontSize: hp('4%'),
              color: resources.colors.black,
              fontFamily: resources.fonts.bold,
            }}>
            Live
            <Text style={{color: resources.colors.orange}}> Support</Text>{' '}
            {'from both'}
            <Text style={{color: resources.colors.primary}}> A.I</Text>
            <Text style={{color: resources.colors.orange}}> and</Text>
            <Text style={{color: resources.colors.primary}}> Professional</Text>
            {'\n'}
            Consultants
          </Text>
        </View>
      )}

      {count === 0 ? (
        <View style={{marginStart: hp('3%')}}>
          <Text
            style={{
              color: resources.colors.ash,
              fontFamily: resources.fonts.light,
              fontSize: hp('1.8%'),
            }}>
            Enjoy the ease of applying colleges from ush, without the
            constraints of time and agencies
          </Text>
        </View>
      ) : count === 1 ? (
        <View style={{marginStart: hp('3%')}}>
          <Text
            style={{
              color: resources.colors.ash,
              fontFamily: resources.fonts.light,
              fontSize: hp('1.8%'),
            }}>
            Dozens of professional mentors and Agencies Use our for their
            Business
          </Text>
        </View>
      ) : null}

      {count === 0 ? (
        <View style={styles.bootomView}>
          <View
            style={{
              width: wp('55%'),
              margin: 2,
              flexDirection: 'row',
            }}>
            <View
              style={{
                height: hp('1%'),
                backgroundColor:
                  count === 0
                    ? resources.colors.primary
                    : resources.colors.black,
                width: count === 0 ? wp('6%') : wp('2%'),
                borderRadius: 6,
                margin: 3,
              }}
            />
            <View
              style={{
                height: hp('1%'),
                backgroundColor: resources.colors.black,
                width: wp('2%'),
                borderRadius: 100,
                margin: 3,
              }}
            />
            <View
              style={{
                height: hp('1%'),
                backgroundColor: resources.colors.black,
                width: wp('2%'),
                borderRadius: 100,
                margin: 3,
              }}
            />
          </View>
          <View
            style={{
              width: wp('35%'),
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => increment()}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : count === 1 ? (
        <View style={styles.bootomView}>
          <View
            style={{
              width: wp('55%'),
              margin: 2,
              flexDirection: 'row',
            }}>
            <View
              style={{
                height: hp('1%'),
                backgroundColor: resources.colors.black,
                width: wp('2%'),
                borderRadius: 100,
                margin: 3,
              }}
            />
            <View
              style={{
                height: hp('1%'),
                backgroundColor:
                  count === 1
                    ? resources.colors.primary
                    : resources.colors.black,
                width: count === 1 ? wp('6%') : wp('2%'),
                borderRadius: 6,
                margin: 3,
              }}
            />

            <View
              style={{
                height: hp('1%'),
                backgroundColor: resources.colors.black,
                width: wp('2%'),
                borderRadius: 100,
                margin: 3,
              }}
            />
          </View>
          <View
            style={{
              width: wp('35%'),
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => increment()}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      {count === 2 ? (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signIn}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonSignUp}
            onPress={() => navigation.navigate('Signup')}>
            <Text
              style={[styles.signIn, {color: resources.colors.olive_green}]}>
              Create Account
            </Text>
          </TouchableOpacity>
        </>
      ) : null}
    </View>
  );
};

export default WelcomScreen;
