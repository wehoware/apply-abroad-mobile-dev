/* eslint-disable react/no-unstable-nested-components */
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
  TextInput,
  Modal,
  Alert,
  Pressable,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import React, {useState} from 'react';
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
import dayjs from 'dayjs';
import DatePicker from 'react-native-date-picker';
import RNPickerSelect from 'react-native-picker-select';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {updateProfileFetch} from '../../redux/slices/authSlice';
import {Toaster} from '../../services/Toaster';
import {ApiEndPoints} from '../../API/ApiEndPoints';
import SubHeaderComponent from '../../components/SubHeaderComponent';
import LoaderComponent from '../../components/LoaderComponent';
const EducationList: any = [
  {
    id: 1,
    name: 'Masters / Post Graduation',
    select: false,
  },
  {
    id: 2,
    name: 'Degree / Under Graduation',
    select: false,
  },
  {
    id: 3,
    name: 'Intermediate/10+2',
    select: false,
  },
  {
    id: 4,
    name: '',
    select: false,
  },
];
const EditProfile = () => {
  const navigation = useNavigation<stackProps>();
  const dispatch = useAppDispatch();
  const {theme, isFetching} = useAppSelector(state => state.common);
  const {isLogged, redirect, userData} = useAppSelector(state => state.auth);
  const [fullName, setFullName] = useState<string>(userData?.fullName);
  const [education, setEducation] = useState<string>('');
  const [dob, setDob] = useState<any>(userData?.dob);
  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [image, setImage] = useState<any>(userData?.profilePhoto);
  const {config, scoreTypes} = useAppSelector(state => state.app);

  const [items, setItems] = useState<any>([
    {
      label: 'Masters / Post Graduation',
      value: '1',
    },
    {
      label: 'Degree / Under Graduation',
      value: '2',
    },
    {label: 'Intermediate/10+2', value: '3'},
    {label: 'SSC/CBSC/ICSC', value: '4'},
  ]);
  const [scoreTypeId, setScoreTypeId] = useState<any>();
  const [isFetch, setIsFetching] = useState<boolean>(false);
  const goback = () => {
    navigation.goBack();
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

  const _save = () => {
    const data: any = {
      fullName: fullName,
      dob: dob,
      countryCode: '',
      phoneNumber: userData?.phoneNumber,
      profilePhoto: image,
      interestedCountryId: userData?.interestedCountryId,
      interestedFieldsIds: userData?.interestedFieldsIds,
      isActive: true,
      id: userData?.id,
    };
    dispatch(updateProfileFetch(data));
  };
  console.log('image', image);
  const styles = StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: resources.colors.white,
      // marginStart: hp('2%'),
    },
    header: {
      height: hp('8%'),
      width: wp('100%'),
      marginStart: hp('1%'),
      alignContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerText: {
      textAlign: 'center',
      fontSize: hp('2%'),
      color: resources.colors.black,
      fontWeight: '700',
      fontFamily: resources.fonts.Aregular,
    },
    box: {
      height: hp('7%'),
      width: wp('90%'),
      borderRadius: 10,
      borderWidth: 1,
      borderColor: resources.colors.ash,
      marginTop: hp('1%'),
      justifyContent: 'center',
      marginStart: hp('2%'),
    },
    infoText: {
      fontSize: hp('2.5%'),
      fontWeight: '600',
      color: resources.colors.black,
      fontFamily: resources.fonts.AsemiBold,
      marginTop: hp('1%'),
      marginStart: hp('2%'),
    },
    text: {
      color: resources.colors.ash,
      fontSize: hp('2%'),
      marginTop: hp('2%'),
      marginStart: hp('2%'),
      fontFamily: resources.fonts.Amedium,
      fontWeight: '500',
    },
    inputText: {
      color: resources.colors.black,
      marginStart: hp('1%'),
      fontSize: hp('2%'),
      fontWeight: '500',
      fontFamily: resources.fonts.Amedium,
    },
    saveButton: {
      bottom: hp('5%'),
      position: 'absolute',
      height: hp('7%'),
      width: wp('90%'),
      backgroundColor: resources.colors.primary,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginStart: hp('2%'),
    },
    saveText: {
      fontSize: hp('2.2%'),
      color: resources.colors.white,
      fontFamily: resources.fonts.Amedium,
      fontWeight: '600',
      textAlign: 'center',
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
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: hp('2%'),
      textAlign: 'center',
      fontSize: hp('2%'),
      fontWeight: '500',
    },
    modalCamText: {
      textAlign: 'center',
      fontSize: hp('2%'),
      fontWeight: '600',
      fontFamily: resources.fonts.Amedium,
      color: resources.colors.light_ash1,
    },
    loader: {
      // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  return (
    <View style={styles.main}>
      {/* <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name={'left'}
            size={20}
            color={resources.colors.black}
            style={{width: wp('30%')}}
          />
        </TouchableOpacity>

        <Text style={styles.headerText}>Edit Profile</Text>
      </View> */}
      <SubHeaderComponent
        countryImage={''}
        name={'Edit Profile'}
        cap={resources.images.cap}
        goBack={() => goback()}
      />

      <Text
        style={{
          fontSize: hp('2.5%'),
          fontWeight: '600',
          color: resources.colors.black,
          fontFamily: resources.fonts.AsemiBold,
          marginStart: hp('2%'),
          marginTop: hp('2%'),
        }}>
        Profile Image
      </Text>

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          height: hp('15%'),
          width: wp('30%'),
          borderColor: resources.colors.ash,
          borderWidth: 1,
          justifyContent: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          alignItems: 'center',
          borderRadius: 10,
          marginTop: hp('1%'),
        }}>
        {image ? (
          <Image
            source={{uri: image}}
            style={{height: hp('15%'), width: wp('30%'), borderRadius: 10}}
            // resizeMode="contain"
          />
        ) : (
          <AntDesign name={'plus'} size={25} color={resources.colors.ash} />
        )}
      </TouchableOpacity>
      {isFetch ? (
        <View
          style={{
            // flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LoaderComponent size={hp('3.5%')} color={theme.primary} />
        </View>
      ) : null}
      <Text style={styles.infoText}>Information</Text>
      <Text style={styles.text}>Full Name</Text>
      <View style={styles.box}>
        <TextInput
          value={fullName}
          placeholder="Enter your fullname"
          placeholderTextColor={resources.colors.ash}
          style={styles.inputText}
          onChangeText={val => setFullName(val)}
        />
      </View>
      <Text style={styles.text}>Education</Text>
      <View>
        <RNPickerSelect
          // placeholder="Select Education"
          placeholder={{
            value: '',
            label: userData.StudentEducation[0].course
              ? userData.StudentEducation[0].course
              : 'Select Education',
          }}
          onValueChange={value => {
            const selectedItem = items.find(
              (item: any) => item.value === value,
            );
            if (selectedItem) {
              setScoreTypeId(value);
              // setEducationLabel(selectedItem.label);
            }
          }}
          useNativeAndroidPickerStyle={false}
          items={items}
          style={{
            inputIOS: {
              fontSize: hp('1.8%'),
              color: resources.colors.black, // Customize the text color here
              paddingVertical: 10,
              paddingHorizontal: 12,
              borderWidth: 1,
              // borderColor: resources.colors.ash,
              borderColor: resources.colors.ash,
              borderRadius: 5,
            },
            inputAndroid: {
              fontSize: hp('2%'),
              color: resources.colors.black,
              paddingVertical: 10,
              paddingHorizontal: 12,
              height: hp('7%'),
              width: wp('90%'),
              borderRadius: 5,
              borderWidth: 1,
              borderColor: resources.colors.ash,
              marginTop: hp('1%'),
              justifyContent: 'center',
              marginStart: hp('2%'),
              fontFamily: resources.fonts.Amedium,
              // marginStart: hp('2%'),
            },
            placeholder: {
              color: resources.colors.black,
              fontFamily: resources.fonts.Amedium,
              fontSize: hp('2%'),
              fontWeight: '500',
            },
          }}
          Icon={() => {
            return (
              <Ionicons
                size={20}
                color={resources.colors.ash}
                name="chevron-down"
                style={{
                  paddingRight: hp('4%'),
                  marginTop: hp('3%'),
                }}
              />
            );
          }}
        />
      </View>
      <Text style={styles.text}>Date of Birth</Text>
      <TouchableOpacity style={styles.box} onPress={() => setOpen(true)}>
        <Text style={styles.inputText}>
          {dob ? dayjs(dob).format('DD/MM/YYYY') : 'Enter Date of birth'}
        </Text>
      </TouchableOpacity>
      <DatePicker
        modal
        open={open}
        date={new Date()}
        mode="date"
        onConfirm={date => {
          setOpen(false);
          setDob(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        maximumDate={new Date()}
      />
      {isFetching ? (
        <View style={styles.loader}>
          <LoaderComponent size={hp('3.5%')} color={theme.primary} />
        </View>
      ) : null}
      <TouchableOpacity style={styles.saveButton} onPress={() => _save()}>
        <Text style={styles.saveText}>Update</Text>
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
              <Text style={styles.modalCamText}>Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EditProfile;
