/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
} from '../../services/ResponsiveUIHelpers';
import resources from '../../resources';
import {useAppDispatch, useAppSelector} from '../../hooks/redux_hooks';
import HeaderComponent from '../../components/HeaderComponent';
import {getProfileFetch} from '../../redux/slices/authSlice';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {stackProps} from '../../navigation/types';
import {
  categoriesFetchRequest,
  courseListFetchRequest,
  courseListFetchRequestHome,
  courseListForYouFetchRequestHome,
  popularCollegesListFetchRequest,
  setCategoriesId,
  setFromScreen,
  setSelectedCollege,
  setSelectedCourse,
  topCoursesListFetchRequest,
} from '../../redux/slices/appSlice';
import LoaderComponent from '../../components/LoaderComponent';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NoDataComponent from '../../components/NoDataComponent';

const Home = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const {isLogged, redirect, userData} = useAppSelector(state => state.auth);
  const {
    courseList,
    categories,
    popularColleges,
    topCourses,
    courseListHome,
    courseListForYouHome,
  } = useAppSelector(state => state.app);
  const {theme, isFetching} = useAppSelector(state => state.common);
  const [orientation, setOrientation] = useState('');
  const [search, setSearch] = useState<string>('');
  const [courses, setCourses] = useState<any>([]);

  const [categoriesList, setCategoriesList] = useState<any>([]);
  const [colleges, setColleges] = useState<any>([]);

  const [topCourse, setTopCourse] = useState<any>([]);

  // const [colleges, setColleges] = useState<any>([
  //   {
  //     id: 1,
  //     collegeName: 'Lamton',
  //     image: resources.images.College1,
  //   },
  //   {
  //     id: 2,
  //     collegeName: 'Almoga',
  //     image: resources.images.College2,
  //   },
  //   {
  //     id: 3,
  //     collegeName: 'Windsor',
  //     image: resources.images.College3,
  //   },
  //   {
  //     id: 4,
  //     collegeName: 'Rostrum',
  //     image: resources.images.College4,
  //   },
  //   {
  //     id: 5,
  //     collegeName: 'Science',
  //     image: resources.images.College1,
  //   },
  // ]);
  // console.log('userData============', userData);

  const [itCourses, setITCourses] = useState<any>([]);
  const [count, setCount] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      // First dispatch to fetch categories
      await dispatch(categoriesFetchRequest());

      // After categories are fetched, dispatch courseListFetchRequest
      console.log(
        'userData?.interestedFieldsIds',
        userData?.interestedFieldsIds,
      );

      const data: any = {
        count: count,
        page: page,
        categoryId: userData?.interestedFieldsIds,
        countryId: userData?.Country?.id,
      };

      await dispatch(courseListFetchRequestHome(data));
      await dispatch(popularCollegesListFetchRequest(data));
      await dispatch(topCoursesListFetchRequest(data));
      await dispatch(courseListForYouFetchRequestHome(data));

      setCategoriesList(categories);
      setCourses(courseListHome);
      setITCourses(courseListForYouHome);
      setColleges(popularColleges);
      setTopCourse(topCourses);
    };

    fetchData();
  }, [dispatch, count, page, userData?.interestedFieldsIds]);
  useEffect(() => {
    if (categories.length > 0 || categories.length === 0) {
      setCategoriesList(categories);
    }
    if (courseListHome.length > 0 || courseListHome.length === 0) {
      setCourses(courseListHome);
      // setITCourses(courseListHome);
    }
    if (courseListForYouHome.length > 0 || courseListForYouHome.length === 0) {
      // setCourses(courseListHome);
      setITCourses(courseListForYouHome);
    }

    if (popularColleges.length > 0 || popularColleges.length === 0) {
      setColleges(popularColleges);
    }
    if (popularColleges.length > 0 || popularColleges.length === 0) {
      setColleges(popularColleges);
    }
    if (topCourses.length > 0 || topCourses.length === 0) {
      setTopCourse(topCourses);
    }
  }, [
    categories,
    courseListHome,
    popularColleges,
    topCourses,
    courseListForYouHome,
  ]);
  useFocusEffect(
    useCallback(() => {
      var backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          BackHandler.exitApp();

          return true;
        },
      );

      lor(setOrientation);

      return () => {
        backHandler.remove();
      };
    }, []),
  );
  const countryChange = () => {
    navigation.navigate('CountryChange');
  };
  const _details = (item: any) => {
    dispatch(setSelectedCollege(item));
    dispatch(setFromScreen('Home'));
    navigation.navigate('CollegeDetails');
  };
  const _courseDetails = (item: any) => {
    dispatch(setSelectedCourse(item));
    dispatch(setFromScreen('Courses'));
    navigation.navigate('CourseDetails');
  };

  const handleChange = async (id: number, ind: number) => {
    console.log('id======', id);
    dispatch(setCategoriesId(id));

    const updatedArray = categories?.map((item: any, index: number) => ({
      id: item.id,
      name: item.name,
      select: index === ind,
      image: item.image,
      description: item.description,
    }));

    setCategoriesList(updatedArray);
    const data: any = {
      count: count,
      page: page,
      categoryId: id,
      email: userData?.email,
    };
    navigation.navigate('Courses');
    // await dispatch(appliedCoursesListFetchRequest(data));
  };
  const _renderCourses = ({item}: any) => {
    return (
      <TouchableOpacity
        style={{marginTop: hp('1%')}}
        onPress={() => _courseDetails(item)}>
        <Image
          source={{uri: item?.mainImageSquare}}
          style={styles.courseImage}
          resizeMode="stretch"
        />
        <Text style={styles.courseName}>{item.specialization}</Text>
      </TouchableOpacity>
    );
  };

  const _renderITCourses = ({item}: any) => {
    return (
      <TouchableOpacity onPress={() => _courseDetails(item)}>
        <Image
          source={{uri: item?.mainImageSquare}}
          style={styles.itCourseImage}
          resizeMode="stretch"
        />
        <Text style={styles.courseName}>{item?.specialization}</Text>
      </TouchableOpacity>
    );
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
              fontWeight: '700',
            },
          ]}>
          {item?.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const _renderColleges = ({item}: any) => {
    return (
      <TouchableOpacity onPress={() => _details(item)}>
        <Image
          source={{uri: item?.mainImageSquare}}
          style={styles.collegeImage}
        />
        <Text style={styles.collegeName} numberOfLines={1}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  const _ItemSeparator = () => {
    return <View style={styles.separate} />;
  };
  const styles = StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: resources.colors.white,
    },
    header: {height: hp('8%'), marginStart: hp('2%'), width: wp('100')},
    topText: {
      fontSize: hp('3%'),
      color: resources.colors.black,
      marginStart: hp('2%'),
      fontWeight: '600',
      fontFamily: resources.fonts.AsemiBold,
      width: wp('80%'),
      marginTop: hp('1%'),
      letterSpacing: 0.1,
    },
    searchBox: {
      height: hp('6%'),
      width: wp('90%'),
      borderColor: resources.colors.ash,
      borderWidth: 1,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: hp('1.5%'),
      marginStart: hp('2%'),
    },
    courseMain: {
      flexDirection: 'row',
      marginStart: hp('2%'),
      marginTop: hp('3%'),
      alignItems: 'center',
    },
    courseText: {
      width: wp('75%'),
      fontFamily: resources.fonts.AsemiBold,
      fontSize: hp('2.6%'),
      fontWeight: '600',
      color: resources.colors.black,
    },
    courseImage: {
      height: hp('15%'),
      width: wp('30%'),
      borderRadius: 12,
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.6,
      shadowRadius: 12,
      elevation: 6,
    },
    seeMore: {
      fontSize: hp('1.6%'),
      color: resources.colors.primary,
      fontWeight: '600',
      fontFamily: resources.fonts.medium,
      textAlign: 'center',
      marginStart: hp('1%'),
    },
    courseName: {
      color: resources.colors.black,
      fontWeight: '600',
      fontSize: hp('1.8%'),
      fontFamily: resources.fonts.Abold,
      textAlign: 'center',
      marginTop: hp('1%'),
    },
    separate: {margin: 10},
    collegeImage: {
      height: hp('10%'),
      aspectRatio: 1,
      borderRadius: 100,
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 100,
      elevation: 6,
    },
    collegeName: {
      color: resources.colors.black,
      fontWeight: '600',
      fontSize: hp('1.6%'),
      fontFamily: resources.fonts.Abold,
      textAlign: 'center',
      marginTop: hp('1%'),
      width: wp('18%'),
    },
    categoriesName: {
      fontSize: hp('1.8%'),
      fontFamily: resources.fonts.AsemiBold,
      textAlign: 'center',
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
    // itCourseImage: {height: hp('25%'), width: wp('50%'), borderRadius: 12},
    itCourseImage: {
      height: hp('15%'),
      width: wp('30%'),
      borderRadius: 12,
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 12,
      elevation: 6,
    },

    list: {marginRight: 10, marginTop: 10, marginStart: hp('2%')},
    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
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
        <HeaderComponent
          countryImage={userData?.Country?.flagImage}
          name={''}
          cap={resources.images.cap}
          countryChange={() => countryChange()}
        />
      </View>
      <ScrollView>
        {isFetching ? (
          <View style={styles.loader}>
            <LoaderComponent size={hp('3.5%')} color={theme.primary} />
          </View>
        ) : null}
        <Text style={styles.topText}>Find a resource you want to learn!</Text>
        <View style={styles.searchBox}>
          <AntDesign
            name={'search1'}
            size={20}
            color={resources.colors.ash}
            style={{marginLeft: hp('1%')}}
          />
          <Text
            onPress={() => {
              navigation.navigate('Search');
            }}
            style={{
              color: resources.colors.black,
              fontSize: hp('2%'),
              fontFamily: resources.fonts.Amedium,
              fontWeight: '400',
              textAlign: 'center',
              // letterSpacing: 1,
            }}>
            {' '}
            Search Courses, Colleges
          </Text>
          {/* <Image
            source={resources.images.Search}
            style={{height: hp('4%'), width: wp('6%'), marginLeft: hp('1%')}}
            resizeMode="contain"
          /> */}
          {/* <TextInput
            style={{
              color: resources.colors.black,
              fontSize: hp('2%'),
              fontFamily: resources.fonts.Amedium,
              fontWeight: '400',
              // letterSpacing: 1,
            }}
            value={search}
            placeholderTextColor={resources.colors.ash}
            placeholder={'Search Courses, Colleges'}
            onChangeText={val => setSearch(val)}
          /> */}
        </View>
        <View style={[styles.courseMain, {marginTop: hp('2%')}]}>
          <Text style={styles.courseText}>Top Courses for you</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Courses')}>
            <Text style={styles.seeMore}>See More </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.list, {marginTop: 5}]}>
          <FlatList
            data={topCourse?.slice(0, 3)}
            renderItem={_renderCourses}
            horizontal
            ItemSeparatorComponent={_ItemSeparator}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={<NoDataComponent />}
          />
        </View>
        <View style={styles.courseMain}>
          <Text style={styles.courseText}>Categories</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('CategoriesList')}>
            <Text style={styles.seeMore}>See More</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.list, {marginTop: hp('2%')}]}>
          <FlatList
            // data={categoriesList?.slice(0, 4)}
            data={categoriesList}
            renderItem={_renderCategories}
            horizontal
            ItemSeparatorComponent={_ItemSeparator}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={<NoDataComponent />}
            // ListEmptyComponent={ListEmptyComponent}
          />
        </View>

        <View style={styles.courseMain}>
          <Text style={styles.courseText}>Popular Colleges</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Colleges')}>
            <Text style={styles.seeMore}>See More</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.list, {marginTop: hp('2%')}]}>
          <FlatList
            data={colleges.slice(0, 4)}
            renderItem={_renderColleges}
            horizontal
            ItemSeparatorComponent={_ItemSeparator}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={
              <NoDataComponent height={hp('15%')} width={wp('30%')} />
            }
            // ListEmptyComponent={ListEmptyComponent}
          />
        </View>

        <View style={styles.courseMain}>
          <Text style={styles.courseText}>Courses for you</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Courses')}>
            <Text style={styles.seeMore}>See More</Text>
          </TouchableOpacity>
        </View>
        <View
          style={[styles.list, {marginTop: hp('2%'), marginBottom: hp('2%')}]}>
          <FlatList
            data={itCourses}
            renderItem={_renderITCourses}
            horizontal
            ItemSeparatorComponent={_ItemSeparator}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={ListEmptyComponent}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
