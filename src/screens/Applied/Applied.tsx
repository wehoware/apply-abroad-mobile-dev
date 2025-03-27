/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
import React, {useCallback, useEffect, useState} from 'react';
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
import HeaderComponent from '../../components/HeaderComponent';
import {
  appliedCoursesListFetchRequest,
  categoriesFetchRequest,
  setFromScreen,
  setSelectedCourse,
} from '../../redux/slices/appSlice';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LoaderComponent from '../../components/LoaderComponent';

const Applied = () => {
  const navigation = useNavigation<stackProps>();
  const dispatch = useAppDispatch();
  const {theme, isFetching} = useAppSelector(state => state.common);
  const {userData} = useAppSelector(state => state.auth);
  const {categories, appliedCourses} = useAppSelector(state => state.app);
  const [orientation, setOrientation] = useState('');
  const [search, setSearch] = useState<string>('');
  const [categorieList, setCategories] = useState<any>([]);
  const [count, setCount] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [courses, setCourses] = useState<any>([]);

  useFocusEffect(
    useCallback(() => {
      lor(setOrientation);
    }, []),
  );

  useEffect(() => {
    const fetchData = async () => {
      // First dispatch to fetch categories
      await dispatch(categoriesFetchRequest());
      const data: any = {
        count: count,
        page: page,
        categoryId: categorieList[0]?.id,
        email: userData?.email,
      };
      await dispatch(appliedCoursesListFetchRequest(data));

      setCategories(categories);
      setCourses(appliedCourses);
    };

    fetchData();
  }, []);
  useEffect(() => {
    // if (categories.length > 0 || categories.length === 0) {
    //   setCategories(categories);
    // }
    if (appliedCourses.length > 0 || appliedCourses.length === 0) {
      setCourses(appliedCourses);
    }
  }, [appliedCourses]);
  console.log('categories', categories);

  const handleChange = async (id: number, ind: number) => {
    console.log('id======', id);

    const updatedArray = categories?.map((item: any, index: number) => ({
      id: item.id,
      name: item.name,
      select: index === ind,
      image: item.image,
      description: item.description,
    }));

    setCategories(updatedArray);
    const data: any = {
      count: count,
      page: page,
      categoryId: id,
      email: userData?.email,
    };
    await dispatch(appliedCoursesListFetchRequest(data));
  };

  const _renderCategories = ({item, index}: any) => {
    return (
      <TouchableOpacity
        onPress={() => handleChange(item.id, index)}
        style={[
          styles.categoriesBox,
          {
            backgroundColor: item.select
              ? resources.colors.primary
              : resources.colors.light_ash,
          },
        ]}>
        <Text
          style={[
            styles.categoriesName,
            {
              color: item.select
                ? resources.colors.white
                : resources.colors.light_ash1,
              fontWeight: item.select ? '800' : '700',
            },
          ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const _details = (item: any) => {
    dispatch(setSelectedCourse(item));
    dispatch(setFromScreen('Applied'));
    navigation.navigate('CourseDetails');
  };
  const countryChange = () => {
    navigation.navigate('CountryChange');
  };
  const _renderCourses = ({item}: any) => {
    return (
      <TouchableOpacity
        style={styles.courseBox}
        onPress={() => _details(item.course)}>
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
  const _ItemSeparator = () => {
    return <View style={styles.separate} />;
  };
  const _ListEmptyComponent = () => {
    return (
      <View style={styles.empty}>
        <Text style={styles.noData}>No data found</Text>
      </View>
    );
  };
  const styles = StyleSheet.create({
    main: {flex: 1, backgroundColor: resources.colors.white},
    header: {height: hp('8%'), width: wp('100%'), marginStart: hp('2%')},
    topText: {
      fontSize: hp('3%'),
      color: resources.colors.black,
      fontWeight: '500',
      fontFamily: resources.fonts.Aregular,
      width: wp('80%'),
    },
    searchBox: {
      height: hp('5.5%'),
      width: wp('78%'),
      borderColor: resources.colors.ash,
      borderWidth: 1,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: hp('1%'),
      marginStart: hp('2%'),
    },
    filter: {
      height: hp('5.5%'),
      width: wp('10%'),
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
      fontFamily: resources.fonts.AsemiBold,
      color: resources.colors.black,
      marginStart: hp('2%'),
      marginTop: hp('3%'),
      letterSpacing: 1,
    },
    list: {
      marginRight: 10,
      // marginTop: 10,
      marginLeft: hp('2%'),
      marginTop: hp('2%'),
    },
    categoriesName: {
      // fontWeight: '700',
      fontSize: hp('1.8%'),
      fontFamily: resources.fonts.Amedium,
      textAlign: 'center',
      padding: 10,
      letterSpacing: 1,
    },
    categoriesBox: {
      height: hp('6%'),
      // width: wp('20%'),
      paddingLeft: hp('2%'),
      paddingRight: hp('2%'),
      backgroundColor: resources.colors.ash,
      justifyContent: 'center',
      borderRadius: 12,
    },
    separate: {margin: 10},
    empty: {justifyContent: 'center', marginTop: hp('20%')},
    courseBox: {
      // height: hp('15%'),
      width: wp('90%'),
      borderColor: resources.colors.light_ash,
      borderWidth: 1,
      borderRadius: 12,
      flexDirection: 'row',
    },
    collegeText: {
      color: resources.colors.primary,
      fontWeight: '800',
      fontSize: hp('1.9%'),
      fontFamily: resources.fonts.Amedium,
      width: wp('42%'),
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
    starImage: {
      height: hp('2.4%'),
      width: wp('4%'),
      marginTop: hp('0.2%'),
      marginStart: hp('1%'),
    },
    // starImage: {
    //   height: hp('2.5%'),
    //   width: wp('4%'),
    //   marginStart: hp('1%'),
    // },
    locationName: {
      color: resources.colors.primary,
      fontWeight: '500',
      fontSize: hp('1.8%'),
      fontFamily: resources.fonts.Amedium,
      width: wp('25%'),
      marginStart: hp('0.5%'),
      marginTop: hp('0.3%'),
    },
    noData: {
      textAlign: 'center',
      color: resources.colors.ash,
      fontSize: hp('2.2%'),
      fontFamily: resources.fonts.Aregular,
      fontWeight: '500',
    },
    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <HeaderComponent
          // backgroundColor={theme.primary}
          countryImage={userData?.Country?.flagImage}
          name={'Applied Courses'}
          cap={resources.images.cap}
          countryChange={() => countryChange()}
        />
      </View>
      {isFetching ? (
        <View style={styles.loader}>
          <LoaderComponent size={hp('3.5%')} color={theme.primary} />
        </View>
      ) : null}
      <View style={{flexDirection: 'row'}}>
        <View style={styles.searchBox}>
          {/* <Image
            source={resources.images.Search}
            style={{height: hp('4%'), width: wp('6%'), marginLeft: hp('1%')}}
            resizeMode="contain"
          /> */}
          <AntDesign
            name={'search1'}
            size={20}
            color={resources.colors.ash}
            style={{marginLeft: hp('1%')}}
          />
          <TextInput
            style={{
              color: resources.colors.ash,
              fontSize: hp('2%'),
              fontFamily: resources.fonts.Amedium,
              fontWeight: '600',
              letterSpacing: 1,
            }}
            value={search}
            placeholderTextColor={resources.colors.ash}
            placeholder={'Search colleges , courses..'}
            onChangeText={val => {
              setSearch(val);
            }}
          />
        </View>
        <View style={styles.filter}>
          <Image
            source={resources.images.Filter}
            style={{height: hp('3%'), width: wp('6%')}}
          />
        </View>
      </View>
      <Text style={styles.categoriesText}>Categories</Text>
      <View style={styles.list}>
        <FlatList
          style={{width: wp('92%'), marginRight: hp('5')}}
          data={categorieList}
          renderItem={_renderCategories}
          horizontal
          ItemSeparatorComponent={_ItemSeparator}
        />
      </View>

      <View style={styles.list}>
        <FlatList
          style={{marginBottom: hp('30%')}}
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
