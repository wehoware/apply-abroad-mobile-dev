/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Image, Text, View} from 'react-native';

import resources from '../resources';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../services/ResponsiveUIHelpers';
// import Dots from './components/Dots';
import CustomStatusbar from '../components/CustomStatusbar';
import {useAppDispatch, useAppSelector} from '../hooks/redux_hooks';
import {useNavigation} from '@react-navigation/native';
import {stackProps} from '../navigation/types';
import {getDataFromAsync} from '../services/AsyncService';
import {setMode, setTheme} from '../redux/slices/commonSlice';
import {lightTheme} from '../resources/colors/colors';
// import {formatUserData} from '../services/Helpers';
import {getProfileFetch} from '../redux/slices/authSlice';
import {updateConfig} from '../redux/slices/appSlice';

const Splash = () => {
  const navigation = useNavigation<stackProps>();
  const dispatch = useAppDispatch();
  const {theme} = useAppSelector(state => state.common);

  const onComponentMount = async () => {
    try {
      var isTokenThere = await getDataFromAsync(
        resources.AsyncConstants.authToken,
      );
      var isFirstTime = await getDataFromAsync(
        resources.AsyncConstants.isFirstTime,
      );
      console.log('isTokenThere', isTokenThere);

      if (isTokenThere !== null && isTokenThere !== '') {
        navigation.navigate('Home');
        // navigation.navigate("SignUp", {
        //   screen: "TabHome",
        // });
      } else if (isFirstTime == null) {
        navigation.navigate('Welcome');
      } else {
        navigation.navigate('Login');
      }
    } catch (error) {
      console.log('error in component mount ==>', error);
    }
  };

  const setAppTheme = async () => {
    let _theme = await getDataFromAsync(resources.AsyncConstants.theme);
    let _mode = await getDataFromAsync(resources.AsyncConstants.mode);

    if (_theme == null) {
      dispatch(setTheme(lightTheme));
      dispatch(setMode('light'));
    } else {
      dispatch(setTheme(_theme));
      dispatch(setMode(_mode));
    }
  };

  const setUserData = async () => {
    let user = await getDataFromAsync(resources.AsyncConstants.userData);
    dispatch(
      updateConfig({
        AWS_ACCESS_KEY: 'AKIAXYKJROLXUUUMMX6Y',
        AWS_BUCKET_NAME: 'studyabrdstudyabrd',
        AWS_REGION: 'ca-central-1',
        AWS_SECRET_KEY: '+opxyV1mHOqEuY31Xvoz9WDBuiD4npqNfPTdIQfB',
      }),
    );
    if (user !== null) {
      dispatch(getProfileFetch());
    }
  };

  useEffect(() => {
    setTimeout(() => {
      onComponentMount();
      setAppTheme();
      setUserData();
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <CustomStatusbar
        backgroundColor={theme.primary}
        barStyle={'light-content'}
      />

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.primary,
          flex: 1,
        }}>
        <Image
          source={resources.images.cap}
          style={{
            width: wp('20%'),
            height: hp('10%'),
            resizeMode: 'contain',
          }}
        />
        <Text
          style={{
            color: resources.colors.white,
            fontSize: hp('4%'),
            fontFamily: resources.fonts.bold,
            lineHeight: 40,
            fontWeight: '700',
          }}>
          Edu App
        </Text>
      </View>
    </View>
  );
};

export default Splash;
