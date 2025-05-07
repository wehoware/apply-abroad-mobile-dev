/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  TextInput,
} from 'react-native';
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
// import SearchableDropdown from 'react-native-searchable-dropdown';
import colors from '../../resources/colors/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Toaster} from '../../services/Toaster';
import {setDataToAsync} from '../../services/AsyncService';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Category = () => {
  const navigation = useNavigation<stackProps>();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
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
  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  // Handle search input change
  const handleSearchChange = (text: string) => {
    setSearch(text);
  };

  // Handle checkbox selection
  const handleOptionSelect = (optionValue: string) => {
    let updatedOptions;
    if (selectedItems.includes(optionValue)) {
      updatedOptions = selectedItems.filter(
        (item: any) => item !== optionValue,
      );
    } else {
      updatedOptions = [...selectedItems, optionValue];
    }
    selectedItems(updatedOptions);
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
      alignItems: 'center',
      flexDirection: 'row',
    },
    headerText: {
      color: resources.colors.white,
      fontWeight: '900',
      fontFamily: resources.fonts.Abold,
      fontSize: hp('3%'),
      marginStart: hp('2%'),
    },
    box: {
      height: hp('80%'),
      width: wp('95%'),
      backgroundColor: resources.colors.light_green,
      bottom: hp('5%'),
      alignSelf: 'center',
      borderRadius: 15,
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 15,
      elevation: 6,
    },
    boxText: {
      color: resources.colors.black,
      fontWeight: '600',
      fontSize: hp('2.4%'),
      marginTop: 20,
      fontFamily: resources.fonts.Aregular,
      // marginStart: 20,
      paddingTop: hp('3%'),
      paddingStart: hp('3%'),
      marginBottom: 20,
    },
    start: {marginStart: 20},

    signIn: {
      color: resources.colors.white,
      justifyContent: 'center',

      // marginTop: 10,
      fontWeight: '700',
      textAlign: 'center',
      fontSize: hp('2.0%'),
      fontFamily: resources.fonts.Abold,
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
      justifyContent: 'center',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 6,
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

    searchInput: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    option: {
      // padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
      flexDirection: 'row',
      height: hp('5%'),
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },
    optionText: {
      fontSize: hp('1.8%'),
      color: resources.colors.black,
      fontFamily: resources.fonts.Amedium,
      fontWeight: '400',
      width: wp('78%'),
      marginStart: wp('2%'),
    },
    selectedOption: {
      fontWeight: '700',
      color: resources.colors.black,
      width: wp('75%'),
      fontFamily: resources.fonts.Amedium,
      fontSize: hp('1.8%'),
    },
    selectContainer: {
      width: wp('88%'),
      marginStart: hp('2%'),
      borderColor: '#bbb',
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      flexDirection: 'row',
    },
    dropdown: {
      marginTop: 5,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      backgroundColor: '#fff',
      maxHeight: 200,
      width: wp('88%'),
      marginStart: hp('2%'),
    },
    selectedValues: {
      color: resources.colors.black,
      fontFamily: resources.fonts.Aregular,
      fontWeight: '400',
      fontSize: hp('2%'),
      width: wp('70%'),
      marginStart: wp('3%'),
    },
  });

  return (
    <View style={styles.main}>
      <CustomStatusbar
        backgroundColor={theme.primary}
        barStyle={'light-content'}
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons
            name={'chevron-left'}
            size={40}
            color={resources.colors.white}
            style={{
              width: wp('30%'),
              marginTop: hp('0.6%'),
              marginStart: hp('2%'),
            }}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Category</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.boxText}>
          What is your interested field of Study?
        </Text>
        <TouchableOpacity
          style={styles.selectContainer}
          onPress={toggleDropdown}>
          <AntDesign
            name={'search1'}
            color={resources.colors.black}
            size={20}
          />
          <Text style={styles.selectedValues}>Course name</Text>
          <AntDesign
            name={isOpen ? 'up' : 'down'}
            color={resources.colors.black}
            size={20}
          />
        </TouchableOpacity>
        {isOpen && (
          <View style={styles.dropdown}>
            <FlatList
              data={categories}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => {
                const isSelected = selectedItems.some(
                  (s: any) => s.id === item.id,
                );

                return (
                  <View style={styles.option}>
                    <Text
                      onPress={() => {
                        if (!isSelected) {
                          // Add item
                          const updatedItems = [...selectedItems, item];
                          setSelectedItems(updatedItems);
                        }
                      }}
                      style={[
                        styles.optionText,
                        isSelected && styles.selectedOption,
                      ]}>
                      {item.name}
                    </Text>
                    {isSelected ? (
                      <TouchableOpacity
                        onPress={() => {
                          // Handle removing the item when the icon is clicked
                          const items = selectedItems.filter(
                            (sitem: any) => sitem.id !== item.id,
                          );
                          setSelectedItems(items);
                        }}>
                        <Icon
                          name="close" // Use the appropriate icon name
                          size={18}
                          color={resources.colors.black}
                        />
                      </TouchableOpacity>
                    ) : null}
                    {/* </TouchableOpacity> */}
                  </View>
                );
              }}
            />
          </View>
        )}

        {/* <SearchableDropdown
          multi={true}
          selectedItems={selectedItems}
          onItemSelect={(item: any) => {
            const items = [...selectedItems, item];
            setSelectedItems(items); // Update state
          }}
          containerStyle={{
            // padding: 5,
            width: wp('88%'),
            marginStart: hp('2%'),
            borderColor: '#bbb',
            borderWidth: 1,
            borderRadius: 10,
          }}
          onRemoveItem={(item: any, index: any) => {
            const items = selectedItems.filter(
              (sitem: any) => sitem.id !== item.id,
            );
            setSelectedItems(items);
          }}
          itemStyle={{
            padding: 10,
            marginTop: 2,
            backgroundColor: resources.colors.white,
            paddingLeft: hp('5%'),
            fontFamily: resources.fonts.Aregular,
            fontWeight: '400',
            fontSize: hp('1.8%'),
            // borderColor: '#bbb',
            // borderWidth: 1,
            // borderRadius: 5,
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
              color: resources.colors.black,
              paddingLeft: hp('5%'),
              fontFamily: resources.fonts.Aregular,
              fontWeight: '400',
              fontSize: hp('2%'),
            },

            leftIcon: (
              <Icon
                name="search"
                size={20}
                color={resources.colors.black}
                style={{marginRight: 10}}
              />
            ),
          }}
          listProps={{
            nestedScrollEnabled: true,
          }}
        /> */}
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 10,
            height: hp('25%'),
            width: wp('88%'),
            marginStart: hp('2%'),
            borderColor: resources.colors.ash,
            borderWidth: 1,
            borderRadius: 10,
            // marginStart: hp('1%'),
          }}>
          {selectedItems.map((item: any, index: any) => (
            <View
              key={index}
              style={{
                // backgroundColor: '#ddd',
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 5,
                marginRight: 5,
                marginBottom: 5,
                flexDirection: 'row', // Align icon and text in a row
                alignItems: 'center',
                marginTop: hp('1'),
                marginStart: hp('1%'),
                borderColor: resources.colors.ash,
                borderWidth: 1,
              }}>
              <Text
                style={{
                  color: resources.colors.black,
                  marginRight: 5,
                  fontFamily: resources.fonts.AsemiBold,
                  fontWeight: '500',
                  fontSize: hp('1.8%'),
                }}>
                {item.name}
              </Text>

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
                  name="close" // Use the appropriate icon name
                  size={15}
                  color={resources.colors.black}
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
