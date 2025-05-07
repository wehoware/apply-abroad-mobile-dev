/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-sequences */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../hooks/redux_hooks';
import AntDesign from 'react-native-vector-icons/AntDesign';
import resources from '../../resources';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../services/ResponsiveUIHelpers';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const Search = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const {theme, isFetching} = useAppSelector(state => state.common);
  const [search, setSearch] = useState<string>('');
  const [collegeActive, setCollegeActive] = useState<boolean>(true);
  const [courseActive, setCourseActive] = useState<boolean>(false);
  const [collgesList, setCollegeList] = useState<any>([]);
  const [courseList, setCourseList] = useState<any>([]);
  const styles = StyleSheet.create({
    main: {
      flex: 1,
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
      fontWeight: '600',
      fontFamily: resources.fonts.AsemiBold,
    },
    box: {
      height: hp('5%'),
      backgroundColor: resources.colors.ash,
      width: wp('20%'),
      justifyContent: 'center',
      borderRadius: 12,
      marginStart: hp('2%'),
    },
    boxText: {
      textAlign: 'center',
      fontSize: hp('2%'),
      fontWeight: '600',
    },
    collegeImage: {
      height: hp('18%'),
      width: wp('38%'),
      borderRadius: 10,
      marginTop: hp('1.2%'),
      alignSelf: 'center',
    },
    collegeName: {
      color: resources.colors.black,
      fontWeight: '500',
      fontSize: hp('1.9%'),
      fontFamily: resources.fonts.Abold,
      marginStart: hp('2%'),
      marginTop: hp('1.5%'),
      width: wp('35%'),
    },
    locationName: {
      color: resources.colors.ash,
      fontWeight: '400',
      fontSize: hp('1.9%'),
      fontFamily: resources.fonts.Abold,
      width: wp('25%'),
      marginTop: hp('0.3%'),
    },
    starImage: {
      height: hp('2.4%'),
      width: wp('5%'),
      marginTop: hp('0.3%'),
    },
    collegeText: {
      color: resources.colors.primary,
      fontWeight: '800',
      fontSize: hp('1.9%'),
      fontFamily: resources.fonts.Amedium,
      width: wp('42%'),
    },
    courseBox: {
      // height: hp('15%'),
      width: wp('90%'),
      borderColor: resources.colors.light_ash,
      borderWidth: 1,
      borderRadius: 12,
      flexDirection: 'row',
    },
    courseText: {
      color: resources.colors.black,
      fontWeight: '600',
      fontSize: hp('1.8%'),
      fontFamily: resources.fonts.Abold,
      width: wp('50%'),
      lineHeight: hp('2.5%'),
      marginTop: hp('0.5%'),
    },
    feeText: {
      color: resources.colors.ash,
      fontWeight: '500',
      fontSize: hp('1.7%'),
      fontFamily: resources.fonts.Abold,
      width: wp('29%'),
    },
    statusText: {
      color: resources.colors.green,
      fontWeight: '700',
      fontSize: hp('1.6%'),
      fontFamily: resources.fonts.Amedium,
    },
    costText: {
      color: resources.colors.red,
      fontWeight: '700',
      fontSize: hp('1.6%'),
      fontFamily: resources.fonts.Abold,
      width: wp('12%'),
    },
  });
  const renderCollegeItem = ({item}: any) => {
    return (
      <TouchableOpacity style={styles.box}>
        <Image
          source={{uri: item?.mainImageSquare}}
          style={styles.collegeImage}
          resizeMode="cover"
        />
        <Text style={styles.collegeName} numberOfLines={1}>
          {item?.name}
        </Text>
        <View style={{flexDirection: 'row', marginTop: hp('0.5%')}}>
          <EvilIcons
            name="location"
            color={resources.colors.red}
            size={20}
            style={{marginStart: hp('1.4%'), marginTop: hp('0.5%')}}
          />
          <Text
            numberOfLines={1}
            style={[styles.locationName, {width: wp('25%')}]}>
            {item?.locations[0]?.city}
          </Text>
          <View style={{flexDirection: 'row', marginStart: hp('0.4%')}}>
            <Image
              source={resources.images.Star}
              style={styles.starImage}
              resizeMode="contain"
            />
            <Text
              style={[
                styles.locationName,
                {color: resources.colors.black, fontWeight: '600'},
              ]}>
              {item?.rating}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const renderCourseItem = ({item}: any) => {
    return (
      <TouchableOpacity style={styles.courseBox}>
        <Image
          source={{uri: item?.course.mainImageSquare}}
          style={{
            height: hp('13%'),
            width: wp('30'),
            marginTop: hp('1%'),
            marginStart: hp('0.5%'),
            borderRadius: 12,
            marginBottom: hp('1%'),
          }}
          resizeMode="stretch"
        />
        <View style={{marginTop: hp('1.2%'), marginStart: hp('1.5%')}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.collegeText} numberOfLines={1}>
              {item?.course?.name}
            </Text>
            <View
              style={{
                alignSelf: 'flex-end',
                marginRight: hp('2%'),
                flexDirection: 'row',
              }}>
              <Image
                source={resources.images.Star}
                style={styles.starImage}
                // resizeMode="contain"
              />
              <Text style={styles.locationName}>
                {item?.course?.rating.toFixed(1)}
              </Text>
            </View>
          </View>
          <Text style={[styles.courseText]}>
            {item?.course?.specialization}
          </Text>
          <Text style={styles.courseText}>
            {item?.course?.educationLevel?.name} ({item?.course?.code})
          </Text>
          <View style={{flexDirection: 'row', marginTop: hp('0.5%')}}>
            <Text style={styles.feeText}>Application Fee</Text>
            <View style={{flexDirection: 'row'}}>
              {item?.course?.applicationFees === 0 ? (
                <Text style={styles.costText}>Free</Text>
              ) : (
                <View style={{flexDirection: 'row'}}>
                  <FontAwesome
                    name={'dollar'}
                    color={resources.colors.red}
                    style={{marginTop: hp('0.3%')}}
                    size={12}
                  />
                  <Text style={styles.costText} numberOfLines={1}>
                    {item?.course?.applicationFees}
                  </Text>
                </View>
              )}
            </View>
            <Text style={styles.statusText}>{'Applied'}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const searchData = () => {
    console.log('=======', search);
  };
  const ListEmptyComponent = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: hp('1%'),
          height: hp('8%'),
          width: wp('90%'),
        }}>
        <Text
          style={{
            fontSize: hp('2%'),
            color: resources.colors.black,
            textAlign: 'center',
          }}>
          No Data found
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name={'left'}
            size={20}
            color={resources.colors.black}
            style={{width: wp('8%')}}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.headerText}
          placeholder="Search Courses, Colleges"
          placeholderTextColor={resources.colors.black}
          value={search}
          onChangeText={val => setSearch(val)}
          onEndEditing={() => searchData()}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => {
            setCourseActive(false), setCollegeActive(true);
          }}
          style={[
            styles.box,
            {
              backgroundColor: collegeActive
                ? resources.colors.primary
                : resources.colors.light_ash,
            },
          ]}>
          <Text
            style={[
              styles.boxText,
              {
                color: collegeActive
                  ? resources.colors.white
                  : resources.colors.light_ash1,
              },
            ]}>
            Colleges
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCourseActive(true), setCollegeActive(false);
          }}
          style={[
            styles.box,
            {
              backgroundColor: courseActive
                ? resources.colors.primary
                : resources.colors.light_ash,
            },
          ]}>
          <Text
            style={[
              styles.boxText,
              {
                color: courseActive
                  ? resources.colors.white
                  : resources.colors.light_ash1,
              },
            ]}>
            Courses
          </Text>
        </TouchableOpacity>
      </View>
      {collegeActive ? (
        <FlatList
          data={collgesList}
          renderItem={renderCollegeItem}
          ListEmptyComponent={ListEmptyComponent}
          numColumns={2}
          onEndReachedThreshold={0.5}
        />
      ) : null}

      {courseActive ? (
        <FlatList
          data={courseList}
          renderItem={renderCourseItem}
          ListEmptyComponent={ListEmptyComponent}
        />
      ) : null}
    </View>
  );
};

export default Search;
