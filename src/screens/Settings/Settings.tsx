/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  Switch,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import resources from '../../resources';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../services/ResponsiveUIHelpers';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {stackProps} from '../../navigation/types';
import {useAppDispatch, useAppSelector} from '../../hooks/redux_hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getDataFromAsync} from '../../services/AsyncService';
import {logoutRequest, logoutUserFetch} from '../../redux/slices/authSlice';
import useRedirect from '../../hooks/useRedirect';

const Settings = () => {
  const navigation = useNavigation<stackProps>();
  const dispatch = useAppDispatch();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const {isLogged, redirect} = useAppSelector(state => state.auth);
  useRedirect(redirect, 'replace');
  useEffect(() => {
    const fetchData = async () => {
      let deviceID = await getDataFromAsync(resources.AsyncConstants.deviceId);
      let userInfo = await getDataFromAsync(resources.AsyncConstants.userData);
    };

    fetchData();
  }, []);

  const logout = async () => {
    console.log('================');

    let deviceID = await getDataFromAsync(resources.AsyncConstants.deviceId);
    let userInfo = await getDataFromAsync(resources.AsyncConstants.userData);
    let data: any = {
      deviceId: deviceID,
      email: userInfo.email,
    };
    dispatch(logoutUserFetch(data));
  };
  return (
    <View style={styles.main}>
      <ImageBackground
        source={resources.images.Background}
        style={{height: hp('20%')}}
        resizeMode="cover">
        <Text style={styles.profileText}>My Profile</Text>
        <Image source={resources.images.Profile} style={styles.profileImage} />
      </ImageBackground>
      <View style={{marginTop: hp('10%'), justifyContent: 'center'}}>
        <Text style={styles.nameText}>Yellagandula Sai Akhil</Text>
        <Text style={styles.mailText}>saiakhill@gmail.com</Text>
      </View>
      <Text style={styles.themeText}>Theme</Text>
      <View style={styles.box}>
        <Ionicons
          name={'moon-outline'}
          size={20}
          color={resources.colors.black}
          style={{
            width: wp('8%'),
            marginLeft: hp('2%'),
          }}
        />
        <Text style={styles.text}>Dark Mode</Text>
        <Switch
          trackColor={{false: resources.colors.ash, true: resources.colors.ash}}
          thumbColor={
            isEnabled
              ? resources.colors.green_toaster
              : resources.colors.green_toaster
          }
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <Text style={styles.themeText}>Setting</Text>
      <View style={styles.box}>
        <FontAwesome
          name={'user-o'}
          size={20}
          color={resources.colors.black}
          style={{
            width: wp('8%'),
            marginLeft: hp('2%'),
          }}
        />
        <Text style={styles.text}>Edit Profile</Text>
        <AntDesign
          onPress={() => navigation.navigate('EditProfile')}
          name={'right'}
          size={20}
          color={resources.colors.black}
          style={{
            width: wp('8%'),
            marginLeft: hp('2%'),
          }}
        />
      </View>
      <View style={styles.box}>
        <Ionicons
          name={'notifications-outline'}
          size={20}
          color={resources.colors.black}
          style={{
            width: wp('8%'),
            marginLeft: hp('2%'),
          }}
        />
        <Text style={styles.text}>Notification</Text>
        <AntDesign
          onPress={() => navigation.navigate('Notifications')}
          name={'right'}
          size={20}
          color={resources.colors.black}
          style={{
            width: wp('8%'),
            marginLeft: hp('2%'),
          }}
        />
      </View>
      <TouchableOpacity style={styles.box} onPress={() => logout()}>
        <AntDesign
          name={'logout'}
          size={20}
          color={resources.colors.red}
          style={{
            width: wp('8%'),
            marginLeft: hp('2%'),
          }}
        />
        <Text style={[styles.text, {color: resources.colors.red}]}>
          Log Out
        </Text>
        <AntDesign
          name={'right'}
          size={20}
          color={resources.colors.red}
          style={{
            width: wp('8%'),
            marginLeft: hp('2%'),
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  profileText: {
    fontSize: hp('2.3%'),
    color: resources.colors.white,
    fontWeight: '600',
    fontFamily: resources.fonts.semiBold,
    height: hp('10%'),
    marginTop: hp('5%'),
    marginStart: hp('5%'),
  },
  profileImage: {
    height: hp('12%'),
    width: wp('25%'),
    alignSelf: 'center',
  },
  nameText: {
    textAlign: 'center',
    fontFamily: resources.fonts.semiBold,
    fontSize: hp('2.5%'),
    color: resources.colors.black,
    fontWeight: '600',
  },
  mailText: {
    textAlign: 'center',
    fontFamily: resources.fonts.light,
    fontSize: hp('2%'),
    color: resources.colors.ash,
    fontWeight: '400',
  },
  themeText: {
    marginStart: hp('2%'),
    color: resources.colors.light_green1,
    fontSize: hp('2%'),
    fontWeight: '600',
    fontFamily: resources.fonts.bold,
    marginTop: hp('2%'),
  },
  box: {
    marginStart: hp('2%'),
    height: hp('6%'),
    borderColor: resources.colors.ash,
    borderWidth: 1,
    borderRadius: 10,
    width: wp('90%'),
    marginTop: hp('1.5%'),
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  text: {
    width: wp('60%'),
    fontSize: hp('1.8%'),
    fontFamily: resources.fonts.medium,
    fontWeight: '600',
    color: resources.colors.black,
  },
});
