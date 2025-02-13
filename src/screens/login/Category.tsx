/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomStatusbar from '../../components/CustomStatusbar';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../hooks/redux_hooks';
import {stackProps} from '../../navigation/types';
import resources from '../../resources';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../services/ResponsiveUIHelpers';
import {categoriesFetchRequest} from '../../redux/slices/appSlice';
import SearchableDropdown from 'react-native-searchable-dropdown';
import colors from '../../resources/colors/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Toaster} from '../../services/Toaster';
import {setDataToAsync} from '../../services/AsyncService';

const Category = () => {
  const navigation = useNavigation<stackProps>();
  const dispatch = useAppDispatch();
  const {theme} = useAppSelector(state => state.common);
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const {categories} = useAppSelector(state => state.app);
  useEffect(() => {
    dispatch(categoriesFetchRequest());
  }, []);
  const _courseSave = () => {
    const idArray = selectedItems.map((item: any) => item.id);
    console.log('idArray', idArray.length);
    if (idArray.length < 1) {
      Toaster.error('Please select any Course');
    } else {
      setDataToAsync(resources.AsyncConstants.courseIds, idArray);
      navigation.navigate('CountrySelect');
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
    itemSeparate: {height: 20},
    circle: {
      height: hp('2%'),
      borderColor: resources.colors.ash,
      borderWidth: 1,
      width: wp('4%'),
      borderRadius: 100,
    },
    yellowCircle: {
      height: hp('3'),
      borderColor: '#FFC979',
      borderWidth: 7,
      width: wp('6'),
      borderRadius: 100,
      backgroundColor: resources.colors.white,
    },
  });

  return (
    <View style={styles.main}>
      <CustomStatusbar
        backgroundColor={theme.primary}
        barStyle={'light-content'}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Education</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.boxText}>
          What is your interested field of Study?
        </Text>

        <SearchableDropdown
          multi={true}
          selectedItems={selectedItems}
          onItemSelect={(item: any) => {
            const items = [...selectedItems, item]; // Adding new item to selectedItems
            setSelectedItems(items); // Update state
          }}
          containerStyle={{padding: 5}}
          onRemoveItem={(item: any, index: any) => {
            const items = selectedItems.filter(
              (sitem: any) => sitem.id !== item.id,
            );
            setSelectedItems(items);
          }}
          itemStyle={{
            padding: 10,
            marginTop: 2,
            backgroundColor: '#ddd',
            borderColor: '#bbb',
            borderWidth: 1,
            borderRadius: 5,
          }}
          itemTextStyle={{color: '#222'}}
          itemsContainerStyle={{maxHeight: 140}}
          items={categories}
          // defaultIndex={2}
          // chip={true}
          resetValue={false}
          textInputProps={{
            placeholder: 'Course name',
            underlineColorAndroid: 'transparent',
            placeholderTextColor: resources.colors.black,
            style: {
              padding: 12,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
              colors: resources.colors.black,
            },
            leftIcon: (
              <Icon
                name="search"
                size={20}
                color="#888"
                style={{marginRight: 10}} // Adjust icon spacing if needed
              />
            ),
          }}
          listProps={{
            nestedScrollEnabled: true,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 10,
            height: hp('40%'),
            width: wp('90%'),
            borderColor: resources.colors.ash,
            borderWidth: 1,
            borderRadius: 10,
            marginStart: hp('1%'),
          }}>
          {selectedItems.map((item: any, index: any) => (
            <View
              key={index}
              style={{
                backgroundColor: '#ddd',
                borderRadius: 15,
                paddingHorizontal: 10,
                paddingVertical: 5,
                marginRight: 5,
                marginBottom: 5,
                flexDirection: 'row', // Align icon and text in a row
                alignItems: 'center',
                marginTop: hp('1'),
              }}>
              <Text style={{color: '#333', marginRight: 5}}>{item.name}</Text>

              {/* Add the remove icon here */}
              <TouchableOpacity
                onPress={() => {
                  // Handle removing the item when the icon is clicked
                  const items = selectedItems.filter(
                    (sitem: any) => sitem.id !== item.id,
                  );
                  setSelectedItems(items);
                }}>
                <Icon
                  name="cancel" // Use the appropriate icon name
                  size={18}
                  color="#888"
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={() => _courseSave()}>
          <Text style={styles.signIn}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Category;
