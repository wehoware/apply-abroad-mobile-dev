/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  TextInput,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import CustomStatusbar from '../../components/CustomStatusbar';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../hooks/redux_hooks';
import {stackProps} from '../../navigation/types';
import resources from '../../resources';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../services/ResponsiveUIHelpers';
import {countriesFetchRequest} from '../../redux/slices/appSlice';

import colors from '../../resources/colors/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Toaster} from '../../services/Toaster';
import {getDataFromAsync, setDataToAsync} from '../../services/AsyncService';
import {Image} from 'react-native';
import {
  setSelectedEducationData,
  userCreateFetch,
} from '../../redux/slices/authSlice';
import useRedirect from '../../hooks/useRedirect';
import AntDesign from 'react-native-vector-icons/AntDesign';
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
const EducationCertificates = () => {
  const navigation = useNavigation<stackProps>();
  const dispatch = useAppDispatch();
  const {theme} = useAppSelector(state => state.common);
  const [selectedItems, setSelectedItems] = useState<any>({});
  const [search, setSearch] = useState<string>('');
  const {countries} = useAppSelector(state => state.app);
  const {isLogged, redirect, userData} = useAppSelector(state => state.auth);
  const [certificates, setCertificates] = useState<any>(certificateList);
  const [selectedEducation, setSelectedEducation] = useState<any>(null);
  useRedirect(redirect, 'replace');
  useEffect(() => {
    dispatch(countriesFetchRequest());
  }, []);

  useEffect(() => {
    const updatedCertificates = certificateList.map((certificate: any) => {
      const isUploaded = userData?.StudentEducation?.some(
        (edu: any) => edu.course.trim() === certificate.name.trim(),
      );

      return {
        ...certificate,
        status: isUploaded ? 'Uploaded' : 'Not Uploaded',
      };
    });

    setCertificates(updatedCertificates);
  }, [userData]);

  const styles = StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: resources.colors.white,
    },
    // header: {
    //   backgroundColor: resources.colors.primary,
    //   height: hp('18%'),
    //   width: wp('100%'),
    //   justifyContent: 'center',
    //   alignContent: 'center',
    //   alignItems: 'center',
    // },
    header: {
      backgroundColor: resources.colors.primary,
      height: hp('18%'),
      width: wp('100%'),
      flexDirection: 'row',
      //   justifyContent: 'center',
      //   alignContent: 'center',
      //   alignItems: 'center',
    },
    headerText: {
      color: resources.colors.white,
      fontWeight: '600',
      fontFamily: resources.fonts.Amedium,
      fontSize: hp('2.5%'),
      marginTop: hp('5%'),
    },
    // headerText: {
    //   color: resources.colors.white,
    //   fontWeight: '600',
    //   fontFamily: resources.fonts.medium,
    //   fontSize: hp('3%'),
    // },
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
      position: 'absolute',
      bottom: hp('5%'),
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
      height: hp('6%'),
      width: wp('85%'),
      marginStart: hp('2%'),
      borderColor: resources.colors.ash,
      borderWidth: 0.8,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemSeparate: {
      width: wp('80%'),
      //   borderColor: resources.colors.ash,
      //   borderWidth: 0.5,
      margin: 10,
    },
    circle: {
      height: hp('2.5%'),
      borderColor: '#33363F',
      borderWidth: 2,
      width: wp('5%'),
      borderRadius: 100,
    },
    yellowCircle: {
      height: hp('2.5%'),
      borderColor: '#33363F',
      borderWidth: 7,
      width: wp('5%'),
      borderRadius: 100,
      backgroundColor: resources.colors.white,
    },
    searchBox: {
      height: hp('6%'),
      width: wp('83%'),
      borderColor: resources.colors.ash,
      borderWidth: 1,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: hp('6%'),
      marginStart: hp('2%'),
    },
  });

  const _renderItems = ({item}: any) => {
    const matchingEducation = userData?.StudentEducation.find(
      (edu: any) => edu.course.trim() === item.name.trim(),
    );

    const handlePress = (item1: any) => {
      console.log('item1', item1);

      if (matchingEducation) {
        setSelectedEducation(matchingEducation);
        console.log('Found Education Data:', matchingEducation);
        setDataToAsync(resources.AsyncConstants.eduLevelId, item1.id);
        setDataToAsync(resources.AsyncConstants.course, item1.name);
        dispatch(setSelectedEducationData(matchingEducation));
        navigation.navigate('EducationDetails');
      } else {
        setSelectedEducation(null);
        setDataToAsync(resources.AsyncConstants.eduLevelId, item1.id);
        setDataToAsync(resources.AsyncConstants.course, item1.name);
        console.log('No Education Found for:', item.name);
        dispatch(setSelectedEducationData({}));
        navigation.navigate('EducationDetails');
      }
    };
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          alignItems: 'center',
          height: hp('10%'),
          width: wp('88%'),
          borderRadius: 5,
          borderColor: resources.colors.light_ash,
          borderWidth: 1,
          backgroundColor: resources.colors.white,
        }}
        onPress={() => handlePress(item)}>
        <Image
          source={item.image}
          style={{
            height: hp('8'),
            width: wp('16'),
            borderRadius: 10,
            marginStart: hp('2%'),
          }}
        />
        <View>
          <Text
            style={{
              width: wp('55%'),
              marginStart: hp('2%'),
              color: resources.colors.black,
              fontWeight: '700',
              fontFamily: resources.fonts.Amedium,
              fontSize: hp('2%'),
            }}>
            {item.name}
          </Text>
          <Text
            style={{
              width: wp('55%'),
              marginStart: hp('2%'),
              color: resources.colors.ash,
              fontWeight: '500',
              fontFamily: resources.fonts.Aregular,
              fontSize: hp('1.8%'),
            }}>
            {item.status}
          </Text>
        </View>

        {/* {item.select ? (
          <AntDesign name={'checkcircle'} size={20} color={'#33363F'} />
        ) : (
          <View style={styles.circle} />
        )} */}
        {/* <Text style={{width: wp('60%'), marginStart: hp('2%')}}>0</Text> */}
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name={'left'}
            color={resources.colors.white}
            size={20}
            style={{
              marginStart: hp('2%'),
              marginTop: hp('5%'),
              width: wp('10%'),
            }}
          />
        </TouchableOpacity>

        <Text style={styles.headerText}>Certificates</Text>
      </View>
      {/* <View style={styles.header}>
        <Text style={styles.headerText}>Certificates</Text>
      </View> */}
      <View style={styles.box}>
        <View
          style={{
            marginTop: hp('8%'),
            marginStart: hp('2%'),
            height: hp('60%'),
          }}>
          <FlatList
            data={certificates}
            renderItem={_renderItems}
            ItemSeparatorComponent={ItemSeparatorComponent}
          />
        </View>
      </View>
    </View>
  );
};

export default EducationCertificates;
