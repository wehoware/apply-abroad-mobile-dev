/* eslint-disable no-sequences */
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
import {userCreateFetch} from '../../redux/slices/authSlice';
import useRedirect from '../../hooks/useRedirect';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CountrySelect = () => {
  const navigation = useNavigation<stackProps>();
  const dispatch = useAppDispatch();
  const {theme} = useAppSelector(state => state.common);
  const [selectedItems, setSelectedItems] = useState<any>({});
  const [search, setSearch] = useState<string>('');
  const {countries} = useAppSelector(state => state.app);
  const [countriesList, setcountriesList] = useState<any>(countries);
  const {isLogged, redirect} = useAppSelector(state => state.auth);
  useRedirect(redirect, 'replace');
  useEffect(() => {
    dispatch(countriesFetchRequest());
  }, []);
  const selectCountry = (item: any) => {
    setSelectedItems(item);
  };

  const _countrySave = async () => {
    console.log('selectedItems', selectedItems);
    let email = await getDataFromAsync(resources.AsyncConstants.email);
    let deviceId = await getDataFromAsync(resources.AsyncConstants.deviceId);
    let courseIds = await getDataFromAsync(resources.AsyncConstants.courseIds);

    const countryId = selectedItems.id;
    if (!countryId) {
      Toaster.error('Please select any Country');
    } else {
      let data = {
        email: email,
        signUpStage: 3,
        deviceId: deviceId,
        countryId: countryId,
        interestedFieldsIds: courseIds,
      };
      dispatch(userCreateFetch(data));
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
      borderColor: resources.colors.ash,
      borderWidth: 0.5,
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

  const educationSelection = (item1: any) => {
    const selectedId = item1.id;
    const updatedCountyList = countriesList.map((item: any) =>
      item.id === selectedId
        ? {...item, select: true}
        : {...item, select: false},
    );
    setcountriesList(updatedCountyList);
  };

  const searchCollege = (searchQuery: any) => {
    if (searchQuery.length > 2) {
      const filteredColleges = countries.filter((country: any) =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setcountriesList(filteredColleges);
    } else {
      setcountriesList(countries);
      setSelectedItems({});
    }
  };

  const _renderItems = ({item}: any) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          selectCountry(item), educationSelection(item);
        }}>
        <Image
          source={{uri: item?.flagImage}}
          style={{
            height: hp('8'),
            width: wp('16'),
            borderRadius: 10,
          }}
        />
        <Text style={{width: wp('55%'), marginStart: hp('2%')}}>
          {item.name}
        </Text>
        {item.select ? (
          <AntDesign name={'checkcircle'} size={20} color={'#33363F'} />
        ) : (
          <View style={styles.circle} />
        )}
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
        <Text style={styles.headerText}>Country</Text>
      </View>
      <View style={styles.box}>
        <View style={styles.searchBox}>
          <Image
            source={resources.images.Search}
            style={{height: hp('4%'), width: wp('6%'), marginLeft: hp('1%')}}
            resizeMode="contain"
          />
          <TextInput
            style={{
              color: resources.colors.ash,
              fontSize: hp('2%'),
              marginStart: hp('2%'),
            }}
            value={search}
            placeholderTextColor={resources.colors.ash}
            placeholder={'Search countries'}
            onChangeText={val => {
              setSearch(val), searchCollege(val);
            }}
          />
        </View>
        <View
          style={{
            marginTop: hp('3%'),
            marginStart: hp('2%'),
            height: hp('60%'),
          }}>
          <FlatList
            data={countriesList}
            renderItem={_renderItems}
            ItemSeparatorComponent={ItemSeparatorComponent}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={() => _countrySave()}>
          <Text style={styles.signIn}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CountrySelect;
