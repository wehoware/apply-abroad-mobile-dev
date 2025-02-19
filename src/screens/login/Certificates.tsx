/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-sequences */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  Modal,
  PermissionsAndroid,
  Linking,
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
import dayjs from 'dayjs';
import DatePicker from 'react-native-date-picker';
import RNPickerSelect from 'react-native-picker-select';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getDataFromAsync} from '../../services/AsyncService';
import {userCreateStage2Fetch} from '../../redux/slices/authSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Toaster} from '../../services/Toaster';
import {ApiEndPoints} from '../../API/ApiEndPoints';
import LoaderComponent from '../../components/LoaderComponent';
const certificateList: any = [
  {
    id: 1,
    image: resources.images.Masters,
    name: 'Masters / Post Graduation',
    status: 'Not Uploaded',
  },
  {
    id: 2,
    image: resources.images.Degree,
    name: 'Degree / Under Graduation',
    status: 'Not Uploaded',
  },
  {
    id: 3,
    image: resources.images.Intermediate,
    name: 'Intermediate/10+2',
    status: 'Not Uploaded',
  },
  {
    id: 4,
    image: resources.images.SSC,
    name: 'SSC/CBSC/ICSC',
    status: 'Not Uploaded',
  },
];
const Certificates = () => {
  const navigation = useNavigation<stackProps>();
  const dispatch = useAppDispatch();
  const {theme} = useAppSelector(state => state.common);

  const [certificates, setCertificates] = useState<any>(certificateList);
  const [institutionName, setInstitutionName] = useState<string>('');
  const [institutionNameError, setInstitutionNameError] =
    useState<boolean>(false);
  const [stream, setStream] = useState<string>('');
  const [streamError, setStreamError] = useState<boolean>(false);
  const [score, setScore] = useState<any>();
  const [scoreError, setScoreError] = useState<boolean>(false);
  const [maxScore, setMaxScore] = useState<any>('');
  const [maxScoreError, setMaxScoreError] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<any>();
  const [startDateError, setStartDateError] = useState<boolean>(false);
  const [endDate, setEndDate] = useState<any>();
  const [endDateError, setEndDateError] = useState<boolean>(false);
  const [type, setType] = useState<string>('');
  const [typeError, setTypeError] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [scoreTypeId, setScoreTypeId] = useState<any>();
  const [scoreTypeIdError, setScoreTypeIdError] = useState<any>();
  const {config, scoreTypes} = useAppSelector(state => state.app);
  const [items, setItems] = useState<any>(scoreTypes);

  const [image, setImage] = useState<any>('');
  const [imageError, setImageError] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
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
  const _onConfirm = (date: any) => {
    if (type === 'start') {
      setStartDate(date);
    } else if (type === 'end') {
      setEndDate(date);
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
  const _validateFields = () => {
    console.log('===========', score);

    let isInstitutionNameValid = institutionName.length > 0 ? true : false;
    let isStreamValid = stream.length > 0 ? true : false;
    let isScoreValid = score ? true : false;
    let isMaxScoreValid = maxScore ? true : false;
    let isScoreTypeIdValid = scoreTypeId ? true : false;
    let isStartDateValid = startDate ? true : false;
    let isImageValid = image ? true : false;
    if (
      isInstitutionNameValid &&
      isStreamValid &&
      isScoreValid &&
      isMaxScoreValid &&
      isScoreTypeIdValid &&
      isStartDateValid
    ) {
      setInstitutionNameError(false);
      setStreamError(false);
      setScoreError(false);
      setMaxScoreError(false);
      setScoreTypeIdError(false);
      setStartDateError(false);
      setImageError(false);
      _stageTwo();
    } else {
      setInstitutionNameError(!isInstitutionNameValid);
      setStreamError(!isStreamValid);
      setScoreError(!isScoreValid);
      setMaxScoreError(!isMaxScoreValid);
      setScoreTypeIdError(!isScoreTypeIdValid);
      setStartDateError(!isStartDateValid);
      setImageError(!isImageValid);
    }
  };

  const _stageTwo = async () => {
    let email = await getDataFromAsync(resources.AsyncConstants.email);
    let eduLevelId = await getDataFromAsync(
      resources.AsyncConstants.eduLevelId,
    );
    let course = await getDataFromAsync(resources.AsyncConstants.course);
    var data = {
      email: email,
      signUpStage: 2,
      educationDetails: [
        {
          eduLevelId: eduLevelId,
          institutionName: institutionName,
          course: course,
          stream: stream,
          score: score,
          maxScore: maxScore,
          scoreTypeId: scoreTypeId,
          startDate: startDate,
          endDate: endDate,
          isCurrent: endDate ? false : true,
          certPhoto: image,
        },
      ],
    };

    dispatch(userCreateStage2Fetch(data));
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
      height: hp('80%'),
      width: wp('95%'),
      backgroundColor: resources.colors.light_green,
      bottom: hp('5%'),
      alignSelf: 'center',
      borderRadius: 15,
    },
    boxText: {
      color: '#141B13',
      fontWeight: '700',
      fontSize: hp('3%'),
      marginTop: 20,
      fontFamily: resources.fonts.regular,
      // marginStart: 20,
      paddingTop: hp('3%'),
      paddingStart: hp('3%'),
    },
    start: {marginStart: 20},
    inputHeaderText: {
      fontSize: hp('1.9%'),
      color: '#141B13',
      fontWeight: '500',
      fontFamily: resources.fonts.medium,
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
      marginTop: hp('15%'),
      borderRadius: 5,
    },
    buttonSkip: {
      marginStart: 20,
      height: hp('6%'),
      width: wp('85%'),
      marginTop: hp('3%'),
      borderRadius: 5,
    },
    boxItem: {
      backgroundColor: resources.colors.white,
      height: hp('10%'),
      width: wp('85%'),
      marginStart: hp('2%'),
      borderColor: resources.colors.ash,
      borderWidth: 0.8,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemSeparate: {height: 20},
    circle: {
      height: hp('2%'),
      borderColor: resources.colors.ash,
      borderWidth: 1,
      width: wp('4%'),
      borderRadius: 100,
    },
    inputText: {
      color: resources.colors.ash,
      marginStart: hp('1%'),
      fontSize: hp('2%'),
      fontWeight: '500',
      fontFamily: resources.fonts.medium,
    },
    yellowCircle: {
      height: hp('3'),
      borderColor: '#FFC979',
      borderWidth: 7,
      width: wp('6'),
      borderRadius: 100,
      backgroundColor: resources.colors.white,
    },
    nameText: {
      color: resources.colors.black,
      width: wp('70%'),
      marginLeft: hp('2%'),
      fontSize: hp('1.8'),
      fontFamily: resources.fonts.regular,
      fontWeight: '700',
    },
    statusText: {
      color: resources.colors.ash,
      width: wp('70%'),
      marginLeft: hp('2%'),
      fontSize: hp('1.6'),
      fontFamily: resources.fonts.regular,
      fontWeight: '500',
    },
    inputStyle: {
      height: hp('6%'),
      width: wp('85%'),
      borderColor: '#AFAFAF',
      borderWidth: 1,
      borderRadius: 5,
      color: resources.colors.ash,
      fontSize: hp('1.8%'),
      fontWeight: '500',
      marginTop: hp('1%'),
      fontFamily: resources.fonts.regular,
      paddingLeft: 15,
    },

    inputStyle1: {
      height: hp('6%'),
      width: wp('40%'),
      borderColor: '#AFAFAF',
      borderWidth: 1,
      borderRadius: 5,
      color: resources.colors.ash,
      fontSize: hp('1.8%'),
      fontWeight: '500',
      marginTop: hp('1%'),
      fontFamily: resources.fonts.regular,
      paddingLeft: 15,
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
    modalText: {
      marginBottom: hp('2%'),
      textAlign: 'center',
      fontSize: hp('2%'),
      fontWeight: '500',
    },
    box1: {
      height: hp('6%'),
      width: wp('86%'),
      borderRadius: 5,
      borderWidth: 1,
      borderColor: resources.colors.ash,
      marginTop: hp('1%'),
      justifyContent: 'center',
      marginStart: hp('2%'),
    },
    errorText: {
      color: resources.colors.red,
      fontSize: hp('1.6%'),
      fontWeight: '500',
      fontFamily: resources.fonts.regular,
    },
  });

  const _renderItem = ({item}: any) => {
    return (
      <TouchableOpacity style={[styles.boxItem]}>
        <Image
          source={item.image}
          style={{height: hp('8'), width: wp('20%'), marginStart: hp('1%')}}
          resizeMode="contain"
        />
        <View>
          <Text style={styles.nameText}>{item.name}</Text>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const ItemSeparatorComponent = () => {
    return <View style={styles.itemSeparate} />;
  };

  return (
    <View style={styles.main}>
      <CustomStatusbar
        backgroundColor={theme.primary}
        barStyle={'light-content'}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Certificates</Text>
      </View>
      <View style={styles.box}>
        <View style={{marginTop: hp('4%')}}>
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
          <View style={styles.start}>
            {/* <Text style={styles.inputHeaderText}>Institution Name</Text> */}
            <TextInput
              placeholder="Enter Institution Name"
              placeholderTextColor={'#AFAFAF'}
              style={[
                styles.inputStyle,
                {
                  borderColor: institutionNameError
                    ? resources.colors.red
                    : resources.colors.ash,
                },
              ]}
              value={institutionName}
              onChangeText={val => setInstitutionName(val)}
            />
          </View>
          <View style={styles.start}>
            <TextInput
              placeholder="Enter Stream Name"
              placeholderTextColor={'#AFAFAF'}
              style={[
                styles.inputStyle,
                {
                  borderColor: streamError
                    ? resources.colors.red
                    : resources.colors.ash,
                },
              ]}
              value={stream}
              onChangeText={val => setStream(val)}
            />
          </View>
          <View>
            <RNPickerSelect
              placeholder={{value: '', label: 'Select Score Type'}}
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
                  color: 'gray', // Customize the text color here
                  paddingVertical: 10,
                  paddingHorizontal: 12,
                  borderWidth: 1,
                  // borderColor: resources.colors.ash,
                  borderColor: scoreTypeIdError
                    ? resources.colors.red
                    : resources.colors.ash,
                  borderRadius: 5,
                },
                inputAndroid: {
                  fontSize: hp('1.8%'),
                  color: resources.colors.ash,
                  paddingVertical: 10,
                  paddingHorizontal: 12,
                  height: hp('6%'),
                  width: wp('86%'),
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: scoreTypeIdError
                    ? resources.colors.red
                    : resources.colors.ash,
                  marginTop: hp('1%'),
                  justifyContent: 'center',
                  marginStart: hp('2%'),
                },
                placeholder: {
                  color: resources.colors.ash,
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
          <View style={{flexDirection: 'row'}}>
            <View style={styles.start}>
              <TextInput
                placeholder="Score"
                keyboardType="number-pad"
                placeholderTextColor={'#AFAFAF'}
                style={[
                  styles.inputStyle1,
                  {
                    borderColor: scoreError
                      ? resources.colors.red
                      : resources.colors.ash,
                  },
                ]}
                value={score}
                onChangeText={val => setScore(val)}
              />
            </View>
            <View style={styles.start}>
              <TextInput
                placeholder="Max Score"
                keyboardType="number-pad"
                placeholderTextColor={'#AFAFAF'}
                style={[
                  styles.inputStyle1,
                  {
                    borderColor: maxScoreError
                      ? resources.colors.red
                      : resources.colors.ash,
                  },
                ]}
                value={maxScore}
                onChangeText={val => setMaxScore(val)}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.start}
              onPress={() => {
                setOpen(true), setType('start');
              }}>
              <Text
                style={[
                  styles.inputStyle1,
                  {
                    justifyContent: 'center',
                    paddingTop: hp('1%'),
                    fontSize: hp('1.8%'),
                    borderColor: startDateError
                      ? resources.colors.red
                      : resources.colors.ash,
                  },
                ]}>
                {startDate
                  ? dayjs(startDate).format('DD/MM/YYYY')
                  : 'Start Date'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.start}
              onPress={() => {
                setOpen(true), setType('end');
              }}>
              <Text
                style={[
                  styles.inputStyle1,
                  {justifyContent: 'center', paddingTop: hp('1%')},
                ]}>
                {endDate ? dayjs(endDate).format('DD/MM/YYYY') : 'End Date'}
              </Text>
            </TouchableOpacity>
            <DatePicker
              modal
              open={open}
              date={new Date()}
              mode="date"
              onConfirm={date => {
                _onConfirm(date);
                setOpen(false);
              }}
              onCancel={() => {
                setOpen(false);
                setType('');
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              height: hp('15%'),
              width: wp('85%'),
              // borderColor: resources.colors.ash,
              borderColor: imageError
                ? resources.colors.red
                : resources.colors.ash,
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
                style={{height: hp('15%'), width: wp('85%'), borderRadius: 10}}
                // resizeMode="contain"
              />
            ) : (
              <AntDesign name={'plus'} size={25} color={resources.colors.ash} />
            )}
          </TouchableOpacity>
          {/* <FlatList
            data={certificates}
            renderItem={item => _renderItem(item)}
            ItemSeparatorComponent={ItemSeparatorComponent}
          /> */}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => _validateFields()}>
          <Text style={styles.signIn}>Next</Text>
        </TouchableOpacity>
      </View>
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

export default Certificates;
