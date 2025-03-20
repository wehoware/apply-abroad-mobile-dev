/* eslint-disable react-hooks/exhaustive-deps */
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
  Modal,
  PermissionsAndroid,
  Linking,
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
import {
  logoutRequest,
  logoutUserFetch,
  updateProfileFetch,
} from '../../redux/slices/authSlice';
import useRedirect from '../../hooks/useRedirect';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ApiEndPoints} from '../../API/ApiEndPoints';
import {Toaster} from '../../services/Toaster';
import LoaderComponent from '../../components/LoaderComponent';
import {scoreTypesFetchRequest} from '../../redux/slices/appSlice';
const Settings = () => {
  const navigation = useNavigation<stackProps>();
  const dispatch = useAppDispatch();
  const [isEnabled, setIsEnabled] = useState(false);
  const {theme} = useAppSelector(state => state.common);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const {isLogged, redirect, userData} = useAppSelector(state => state.auth);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [image, setImage] = useState<any>(userData?.profilePhoto);
  useRedirect(redirect, 'replace');
  useEffect(() => {
    const fetchData = async () => {
      let deviceID = await getDataFromAsync(resources.AsyncConstants.deviceId);
      let userInfo = await getDataFromAsync(resources.AsyncConstants.userData);
    };
    dispatch(scoreTypesFetchRequest());
    fetchData();
  }, []);

  const logout = async () => {
    let deviceID = await getDataFromAsync(resources.AsyncConstants.deviceId);
    let userInfo = await getDataFromAsync(resources.AsyncConstants.userData);
    let data: any = {
      deviceId: deviceID,
      email: userInfo.email,
    };
    dispatch(logoutUserFetch(data));
  };

  const requestCameraPermission = async () => {
    setModalVisible(false);
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Education Camera Permission',
          message:
            'Education App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);

      if (granted === 'granted') {
        capturePhoto();
      } else {
        await Linking.openSettings();
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const capturePhoto = async () => {
    setModalVisible(false);
    try {
      const result: any = await launchCamera({
        saveToPhotos: true,
        mediaType: 'photo',
        includeBase64: false,
        includeExtra: true,
        quality: 0.8,
      });
      console.log('result capture', result);
      // setImage(result?.assets[0]?.uri);
      setPickerResponse(result);
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const chooseFromGallery = async () => {
    setModalVisible(false);
    try {
      const result: any = await launchImageLibrary({
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: false,
        includeExtra: true,
        quality: 0.8,
      });
      console.log('result chooseFromGallery', result);
      setPickerResponse(result);
      // setImage(result?.assets[0]?.uri);
    } catch (error) {
      console.log(error, 'error');
    }
  };
  const setPickerResponse = async (response: any) => {
    console.log('file response', response);

    if (response?.assets) {
      setIsFetching(true);
      const formData = new FormData();
      formData.append('folder', 'student');
      formData.append('subfolder', 'mlrit');
      const file = {
        uri: response?.assets[0]?.uri,
        type: response?.assets[0]?.type,
        name: response?.assets[0]?.fileName,
      };

      formData.append('file', file);

      try {
        const res = await fetch(
          resources.config.baseURL + '/' + ApiEndPoints.imageUpload,
          {
            method: 'POST',
            body: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        const results = await res.json();
        if (results?.status) {
          setIsFetching(false);
          setImage(results?.fileUrl);
          const data: any = {
            fullName: userData?.fullName,
            dob: userData?.dob,
            countryCode: '',
            phoneNumber: '',
            profilePhoto: results?.fileUrl,
            interestedCountryId: userData?.interestedCountryId,
            interestedFieldsIds: userData?.interestedFieldsIds,
            isActive: true,
            id: userData?.id,
          };
          dispatch(updateProfileFetch(data));
        } else {
          Toaster.error(results?.message);
          setIsFetching(false);
        }
        console.log('Upload response:', results);
      } catch (error) {
        console.error('Error uploading file:', error);
        setIsFetching(false);
      }
    } else {
      console.log('No image selected');
      setIsFetching(false);
    }
  };

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
      width: wp('98%'),
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
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      height: hp('28%'),
      width: wp('90%'),
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      // alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalText: {
      marginBottom: hp('2%'),
      textAlign: 'center',
      fontSize: hp('2%'),
      fontWeight: '600',
      fontFamily: resources.fonts.Amedium,
      color: resources.colors.light_ash1,
    },
    modalCamText: {
      textAlign: 'center',
      fontSize: hp('2%'),
      fontWeight: '600',
      fontFamily: resources.fonts.Amedium,
      color: resources.colors.light_ash1,
    },
  });
  return (
    <View style={styles.main}>
      <ImageBackground
        source={resources.images.Background}
        style={{height: hp('20%')}}
        resizeMode="cover">
        <Text style={styles.profileText}>My Profile</Text>
        {image ? (
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image source={{uri: image}} style={styles.profileImage} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              source={resources.images.Profile}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        )}
      </ImageBackground>
      {isFetching ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LoaderComponent size={hp('3.5%')} color={theme.primary} />
        </View>
      ) : null}
      <View style={{marginTop: hp('10%'), justifyContent: 'center'}}>
        <Text style={styles.nameText}>{userData?.fullName}</Text>
        <Text style={styles.mailText}>{userData?.email}</Text>
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
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <AntDesign
            name={'right'}
            size={20}
            color={resources.colors.black}
            style={{
              width: wp('8%'),
              marginLeft: hp('2%'),
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.box}>
        <MaterialCommunityIcons
          name={'book-education'}
          size={20}
          color={resources.colors.black}
          style={{
            width: wp('8%'),
            marginLeft: hp('2%'),
          }}
        />
        <Text style={styles.text}>Education Details</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('EducationCertificates')}>
          <AntDesign
            name={'right'}
            size={20}
            color={resources.colors.black}
            style={{
              width: wp('8%'),
              marginLeft: hp('2%'),
            }}
          />
        </TouchableOpacity>
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
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <AntDesign
            name={'right'}
            size={20}
            color={resources.colors.black}
            style={{
              width: wp('8%'),
              marginLeft: hp('2%'),
            }}
          />
        </TouchableOpacity>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={{
                right: hp('2%'),
                position: 'absolute',
                marginTop: hp('1%'),
                height: hp('4%'),
                width: wp('8%'),
                borderRadius: 100,
                backgroundColor: resources.colors.primary,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AntDesign
                name={'close'}
                size={20}
                color={resources.colors.white}
              />
            </TouchableOpacity>

            <Text style={styles.modalText}>Upload image from</Text>
            <TouchableOpacity
              onPress={() => requestCameraPermission()}
              style={{
                flexDirection: 'row',
                height: hp('6%'),
                width: wp('75%'),
                borderColor: resources.colors.ash,
                borderWidth: 1,
                borderRadius: 10,
                alignItems: 'center',
              }}>
              <FontAwesome
                name={'camera'}
                size={25}
                color={resources.colors.ash}
                style={{marginStart: hp('2%'), width: wp('10%')}}
              />
              <Text style={styles.modalCamText}>Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => chooseFromGallery()}
              style={{
                flexDirection: 'row',
                height: hp('6%'),
                width: wp('75%'),
                borderColor: resources.colors.ash,
                borderWidth: 1,
                borderRadius: 10,
                marginTop: hp('2%'),
                alignItems: 'center',
              }}>
              <AntDesign
                name={'picture'}
                size={25}
                color={resources.colors.ash}
                style={{marginStart: hp('2%'), width: wp('10%')}}
              />
              <Text style={styles.modalCamText}>Gallrey</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Settings;
