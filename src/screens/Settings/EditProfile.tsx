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
import {useAppDispatch} from '../../hooks/redux_hooks';
import dayjs from 'dayjs';
import DatePicker from 'react-native-date-picker';
import RNPickerSelect from 'react-native-picker-select';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
const EditProfile = () => {
  const navigation = useNavigation<stackProps>();
  const dispatch = useAppDispatch();
  const [fullName, setFullName] = useState<string>('');
  const [education, setEducation] = useState<string>('');
  const [dob, setDob] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [image, setImage] = useState<any>('');

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
      setImage(result?.assets[0]?.uri);
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
      setImage(result?.assets[0]?.uri);
    } catch (error) {
      console.log(error, 'error');
    }
  };
  console.log('image', image);
  const styles = StyleSheet.create({
    main: {
      flex: 1,
      marginStart: hp('2%'),
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
      fontFamily: resources.fonts.regular,
    },
    box: {
      height: hp('7%'),
      width: wp('90%'),
      borderRadius: 10,
      borderWidth: 1,
      borderColor: resources.colors.ash,
      marginTop: hp('1%'),
      justifyContent: 'center',
    },
    infoText: {
      fontSize: hp('2.5%'),
      fontWeight: '600',
      color: resources.colors.black,
      fontFamily: resources.fonts.semiBold,
      marginTop: hp('1%'),
    },
    text: {
      color: resources.colors.ash,
      fontSize: hp('2%'),
      marginTop: hp('2%'),
    },
    inputText: {
      color: resources.colors.ash,
      marginStart: hp('1%'),
      fontSize: hp('2%'),
      fontWeight: '500',
      fontFamily: resources.fonts.medium,
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
    },
    saveText: {
      fontSize: hp('2%'),
      color: resources.colors.white,
      fontFamily: resources.fonts.medium,
      fontWeight: '600',
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
  });
  return (
    <View style={styles.main}>
      <TouchableOpacity style={styles.header}>
        <AntDesign
          name={'left'}
          size={20}
          color={resources.colors.black}
          onPress={() => navigation.goBack()}
          style={{width: wp('30%')}}
        />
        <Text style={styles.headerText}>Edit Profile</Text>
      </TouchableOpacity>
      <Text
        style={{
          fontSize: hp('2.5%'),
          fontWeight: '600',
          color: resources.colors.black,
          fontFamily: resources.fonts.semiBold,
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
      <View style={styles.box}>
        <RNPickerSelect
          // placeholder="Select Education"
          placeholder={{value: '', label: 'Select Education'}}
          onValueChange={value => setEducation(value)}
          items={[
            {
              label: 'Masters / Post Graduation',
              value: 'Masters / Post Graduation',
            },
            {
              label: 'Degree / Under Graduation',
              value: 'Degree / Under Graduation',
            },
            {label: 'Intermediate/10+2', value: 'Intermediate/10+2'},
            {label: 'SSC/CBSC/ICSC', value: 'SSC/CBSC/ICSC'},
          ]}
          style={{
            inputIOS: {
              fontSize: 16,
              color: 'gray', // Customize the text color here
              paddingVertical: 10,
              paddingHorizontal: 12,
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 5,
            },
            inputAndroid: {
              fontSize: 16,
              color: 'gray', // Customize the text color for Android here
              paddingVertical: 10,
              paddingHorizontal: 12,
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 5,
            },
            placeholder: {
              color: 'gray', // Customize the placeholder color here
            },
          }}
          Icon={() => {
            return (
              <Ionicons
                size={25}
                color={resources.colors.ash}
                name="chevron-down"
                style={{
                  paddingRight: hp('2%'),
                  marginTop: hp('2%'),
                }}
              />
            );
          }}
        />
      </View>
      <Text style={styles.text}>Date of Birth</Text>
      <TouchableOpacity style={styles.box} onPress={() => setOpen(true)}>
        <Text style={styles.inputText}>{dayjs(dob).format('DD/MM/YYYY')}</Text>
      </TouchableOpacity>
      <DatePicker
        modal
        open={open}
        date={dob}
        mode="date"
        onConfirm={date => {
          setOpen(false);
          setDob(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveText}>Save Change</Text>
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
              <Text>Camera</Text>
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
              <Text>Gallrey</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EditProfile;
