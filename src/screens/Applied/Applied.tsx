/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import resources from '../../resources';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
} from '../../services/ResponsiveUIHelpers';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {stackProps} from '../../navigation/types';
import {useAppDispatch, useAppSelector} from '../../hooks/redux_hooks';

const Applied = () => {
  const navigation = useNavigation<stackProps>();
  const dispatch = useAppDispatch();
  const {theme} = useAppSelector(state => state.common);
  const [orientation, setOrientation] = useState('');
  const [search, setSearch] = useState<string>('');
  const [categories, setCategories] = useState<any>([
    {
      id: 1,
      name: 'Business',
      active: true,
    },
    {
      id: 2,
      name: 'Marketing',
      active: false,
    },
    {
      id: 3,
      name: 'Designer',
      active: false,
    },
    {
      id: 4,
      name: 'Software',
      active: false,
    },
    {
      id: 5,
      name: 'IT',
      active: false,
    },
    {
      id: 6,
      name: 'Managament',
      active: false,
    },
  ]);
  const [courses, setCourses] = useState<any>([
    {
      id: 1,
      collegeName: 'Lamton College',
      courseName: 'Artificial Intelligence Intelligence Intelligence',
      image: resources.images.AICourse,
      qulification: 'Postgraduate',
      rating: 4.5,
      fee: 120,
      status: 'Available',
    },
    {
      id: 2,
      collegeName: 'Almoga College',
      courseName: 'Web Development',
      image: resources.images.WebDevelopment,
      qulification: 'Postgraduate',
      rating: 4.5,
      fee: 120,
      status: 'Available',
    },
    {
      id: 3,
      collegeName: 'Lamton College',
      courseName: 'Chemical Engineering',
      image: resources.images.Chemical,
      qulification: 'Postgraduate',
      rating: 4.5,
      fee: 120,
      status: 'Available',
    },
    {
      id: 4,
      collegeName: 'Lamton College',
      courseName: 'Cloud Computing',
      image: resources.images.CloudCourse,
      qulification: 'Postgraduate',
      rating: 4.5,
      fee: 120,
      status: 'Available',
    },
  ]);

  useFocusEffect(
    useCallback(() => {
      lor(setOrientation);
    }, []),
  );
  const _renderCategories = ({item}: any) => {
    return (
      <View style={styles.categoriesBox}>
        <Text style={styles.categoriesName}>{item.name}</Text>
      </View>
    );
  };

  const _renderCourses = ({item}: any) => {
    return (
      <TouchableOpacity
        style={styles.courseBox}
        onPress={() => navigation.navigate('CourseDetails')}>
        <Image
          source={item.image}
          style={{
            height: hp('12%'),
            width: wp('30'),
            marginTop: hp('1%'),
            marginStart: hp('0.5%'),
            borderRadius: 12,
          }}
          resizeMode="contain"
        />
        <View style={{marginTop: hp('1%')}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.collegeText}>{item.collegeName}</Text>
            <Image
              source={resources.images.Star}
              style={styles.starImage}
              // resizeMode="contain"
            />
            <Text style={styles.locationName}>{item.rating}</Text>
          </View>
          <Text style={styles.courseText}>{item.courseName}</Text>
          <Text style={styles.courseText}>{item.qulification}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.feeText}>Application Fee</Text>
            <View style={{flexDirection: 'row'}}>
              <FontAwesome
                name={'dollar'}
                color={resources.colors.red}
                style={{marginTop: hp('0.5%')}}
                size={12}
              />
              <Text style={styles.costText}>{item.fee}</Text>
            </View>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const _ItemSeparator = () => {
    return <View style={styles.separate} />;
  };
  const _ListEmptyComponent = () => {
    return (
      <View style={styles.empty}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: hp('3%'),
            color: resources.colors.ash,
            marginTop: hp('20%'),
          }}>
          No data found
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.main}>
      <View style={styles.header} />
      <View style={{flexDirection: 'row'}}>
        <View style={styles.searchBox}>
          <Image
            source={resources.images.Search}
            style={{height: hp('4%'), width: wp('6%'), marginLeft: hp('1%')}}
            resizeMode="contain"
          />
          <TextInput
            style={{color: resources.colors.ash, fontSize: hp('2%')}}
            value={search}
            placeholderTextColor={resources.colors.ash}
            placeholder={'Search Courses, Colleges'}
            onChangeText={val => {
              setSearch(val);
            }}
          />
        </View>
        <View style={styles.filter}>
          <Image
            source={resources.images.Filter}
            style={{height: hp('4%'), width: wp('8%')}}
          />
        </View>
      </View>
      <Text style={styles.categoriesText}>Categories</Text>
      <View style={styles.list}>
        <FlatList
          style={{width: wp('100'), marginRight: hp('5')}}
          data={categories}
          renderItem={_renderCategories}
          horizontal
          ItemSeparatorComponent={_ItemSeparator}
        />
      </View>

      <View style={styles.list}>
        <FlatList
          style={{marginBottom: hp('26%')}}
          data={courses}
          renderItem={_renderCourses}
          ItemSeparatorComponent={_ItemSeparator}
          ListEmptyComponent={_ListEmptyComponent}
        />
      </View>
    </View>
  );
};

export default Applied;

const styles = StyleSheet.create({
  main: {flex: 1},
  header: {height: hp('8%'), width: wp('100%')},
  topText: {
    fontSize: hp('3%'),
    color: resources.colors.black,
    fontWeight: '500',
    fontFamily: resources.fonts.regular,
    width: wp('80%'),
  },
  searchBox: {
    height: hp('6%'),
    width: wp('75%'),
    borderColor: resources.colors.ash,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1%'),
    marginStart: hp('2%'),
  },
  filter: {
    height: hp('6%'),
    width: wp('15%'),
    borderColor: resources.colors.ash,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1%'),
    justifyContent: 'center',
    marginStart: hp('1%'),
  },
  categoriesText: {
    fontSize: hp('2.4%'),
    fontWeight: '600',
    fontFamily: resources.fonts.regular,
    color: resources.colors.black,
    marginStart: hp('2%'),
  },
  list: {marginRight: 10, marginTop: 10, marginLeft: hp('2%')},
  categoriesName: {
    color: '#808080',
    fontWeight: '600',
    fontSize: hp('1.6%'),
    fontFamily: resources.fonts.medium,
    textAlign: 'center',
    padding: 10,
  },
  categoriesBox: {
    height: hp('6%'),
    backgroundColor: resources.colors.ash,
    justifyContent: 'center',
    borderRadius: 12,
  },
  separate: {margin: 10},
  empty: {justifyContent: 'center'},
  courseBox: {
    height: hp('15%'),
    width: wp('90%'),
    borderColor: resources.colors.ash,
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: 'row',
  },
  collegeText: {
    color: resources.colors.primary,
    fontWeight: '800',
    fontSize: hp('2%'),
    fontFamily: resources.fonts.medium,
    width: wp('45%'),
  },
  courseText: {
    color: '#141B13',
    fontWeight: '600',
    fontSize: hp('1.7%'),
    fontFamily: resources.fonts.medium,
    width: wp('50%'),
  },
  feeText: {
    color: '#848484',
    fontWeight: '500',
    fontSize: hp('1.5%'),
    fontFamily: resources.fonts.medium,
    width: wp('30%'),
  },
  statusText: {
    color: resources.colors.green,
    fontWeight: '600',
    fontSize: hp('1.5%'),
    fontFamily: resources.fonts.medium,
  },
  costText: {
    color: resources.colors.red,
    fontWeight: '500',
    fontSize: hp('1.5%'),
    fontFamily: resources.fonts.medium,
    width: wp('12%'),
  },
  starImage: {
    height: hp('3%'),
    width: wp('4%'),
    marginStart: hp('0.5%'),
  },
  locationName: {
    color: resources.colors.primary,
    fontWeight: '600',
    fontSize: hp('1.8%'),
    fontFamily: resources.fonts.regular,
    width: wp('25%'),
    marginStart: hp('0.5%'),
  },
});
