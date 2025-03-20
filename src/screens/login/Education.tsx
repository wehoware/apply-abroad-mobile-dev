/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
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
import RNPickerSelect from 'react-native-picker-select';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Toaster} from '../../services/Toaster';
import {setDataToAsync} from '../../services/AsyncService';

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
const Education = () => {
  const navigation = useNavigation<stackProps>();
  const dispatch = useAppDispatch();
  const {theme} = useAppSelector(state => state.common);
  const [educationList, setEducationList] = useState<any>(EducationList);
  const [educationVal, setEducationVal] = useState<string>('');
  const [educationLabel, setEducationLabel] = useState<any>('');
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

  const _education = () => {
    if (educationLabel) {
      setDataToAsync(resources.AsyncConstants.eduLevelId, educationVal);
      setDataToAsync(resources.AsyncConstants.course, educationLabel);
      navigation.navigate('Certificates');
    } else {
      Toaster.error('Please select Education');
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
      fontWeight: '900',
      fontFamily: resources.fonts.Abold,
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
    box1: {
      height: hp('6%'),
      width: wp('88%'),
      borderRadius: 10,
      borderWidth: 1,
      borderColor: resources.colors.ash,
      marginTop: hp('1%'),
      justifyContent: 'center',
      marginStart: hp('1%'),
    },
    boxText: {
      color: resources.colors.black,
      fontWeight: '600',
      fontSize: hp('2.6%'),
      marginTop: 20,
      fontFamily: resources.fonts.Aregular,
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
      marginTop: hp('40%'),
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
  const educationSelection = (item1: any) => {
    const selectedId = item1.id;
    const updatedEducationList = educationList.map((item: any) =>
      item.id === selectedId
        ? {...item, select: true}
        : {...item, select: false},
    );
    setEducationList(updatedEducationList);
  };
  const _renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={[
          styles.boxItem,
          {
            backgroundColor: item.select
              ? resources.colors.primary
              : resources.colors.white,
          },
        ]}
        onPress={() => educationSelection(item)}>
        <Text
          style={{
            color: resources.colors.ash,
            width: wp('70%'),
            marginLeft: hp('2%'),
            fontSize: hp('1.8'),
            fontFamily: resources.fonts.regular,
          }}>
          {item.name}
        </Text>
        {item.select ? (
          <View style={styles.yellowCircle} />
        ) : (
          <View style={styles.circle} />
        )}
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
        <Text style={styles.headerText}>Education</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.boxText}>What is your Higher Education?</Text>
        <View style={{marginTop: hp('2%')}}>
          <RNPickerSelect
            placeholder={{value: '', label: 'Select Education'}}
            onValueChange={value => {
              const selectedItem = items.find(
                (item: any) => item.value === value,
              );
              if (selectedItem) {
                setEducationVal(value);
                setEducationLabel(selectedItem.label);
              }
            }}
            items={items}
            useNativeAndroidPickerStyle={false}
            style={{
              inputIOS: {
                fontSize: hp('1.8%'),
                color: resources.colors.black,
                paddingVertical: 10,
                paddingHorizontal: 12,
                borderWidth: 1,
                borderColor: resources.colors.ash,
                borderRadius: 5,
              },
              inputAndroid: {
                fontSize: hp('1.8%'),
                color: resources.colors.black,
                paddingVertical: 10,
                paddingHorizontal: 12,
                borderWidth: 1,
                borderColor: resources.colors.ash,
                borderRadius: 5,
                marginTop: hp('1%'),
                justifyContent: 'center',
                marginStart: hp('2%'),
                height: hp('6%'),
                width: wp('86%'),
              },
              placeholder: {
                color: resources.colors.ash, // Customize the placeholder color here
              },
            }}
            Icon={() => {
              return (
                <Ionicons
                  size={25}
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
        {/* <View style={{marginTop: hp('4%')}}>
          <FlatList
            data={educationList}
            renderItem={item => _renderItem(item)}
            ItemSeparatorComponent={ItemSeparatorComponent}
          />
        </View> */}

        <TouchableOpacity style={styles.button} onPress={() => _education()}>
          <Text style={styles.signIn}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSkip}
          onPress={() => navigation.navigate('Category')}>
          <Text style={[styles.signIn, {color: resources.colors.black}]}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Education;
