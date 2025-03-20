/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../services/ResponsiveUIHelpers';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../hooks/redux_hooks';
import {stackProps} from '../../navigation/types';
import resources from '../../resources';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import SubHeaderComponent from '../../components/SubHeaderComponent';
import {
  appliedCoursesListFetchRequest,
  categoriesFetchRequest,
  courseListFetchRequest,
  setFromScreen,
  setSelectedCourse,
} from '../../redux/slices/appSlice';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LoaderComponent from '../../components/LoaderComponent';
const CollegeDetails = () => {
  const navigation = useNavigation<stackProps>();
  const dispatch = useAppDispatch();
  const {selectedCollege, fromScreen} = useAppSelector(state => state.app);
  const [infoActive, setInfoActive] = useState<boolean>(true);
  const {categories, courseList} = useAppSelector(state => state.app);
  const [courses, setCourses] = useState<any>([]);
  const [categorieList, setCategories] = useState<any>([]);
  const [salaryScaleActive, setSalaryScaleActive] = useState<boolean>(false);
  const [count, setCount] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [expanded, setExpanded] = useState(false);
  const maxLines = 4; // Limit initial lines
  const {userData} = useAppSelector(state => state.auth);
  const {theme, isFetching} = useAppSelector(state => state.common);
  useEffect(() => {
    const fetchData = async () => {
      // await dispatch(categoriesFetchRequest());
      setCategories(categories);
      const data: any = {
        count: count,
        page: page,
        categoryId: categories[0]?.id,
        email: userData?.email,
        countryId: userData?.Country?.id,
      };
      await dispatch(courseListFetchRequest(data));

      setCourses(courseList);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (courseList.length > 0 || courseList.length === 0) {
      setCourses(courseList);
    }
  }, [courseList]);
  const goback = () => {
    navigation.goBack();
  };
  const styles = StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: resources.colors.white,
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
      fontWeight: '700',
      fontFamily: resources.fonts.regular,
    },
    collegeText: {
      fontSize: hp('2.4%'),
      color: resources.colors.black,
      fontFamily: resources.fonts.semiBold,
      fontWeight: '600',
      width: wp('80%'),
      marginStart: hp('3%'),
      marginTop: hp('1.5%'),
      letterSpacing: 0.2,
    },
    text: {
      fontSize: hp('1.8%'),
      color: resources.colors.primary,
      fontFamily: resources.fonts.medium,
      fontWeight: '500',
      width: wp('50%'),
      letterSpacing: 0.2,
    },
    groupImage: {height: hp('2.8%'), width: wp('8%'), marginStart: hp('1.5%')},
    starText: {
      fontSize: hp('1.8%'),
      color: resources.colors.black,
      fontFamily: resources.fonts.medium,
      fontWeight: '500',
      marginStart: hp('1%'),
    },
    contentHead: {
      marginStart: hp('1%'),
      marginTop: hp('2%'),
      fontSize: hp('2.2%'),
      fontFamily: resources.fonts.Abold,
      fontWeight: '600',
    },
    contentText: {
      marginStart: hp('3%'),
      marginTop: hp('2%'),
      fontSize: hp('2%'),
      fontFamily: resources.fonts.regular,
      fontWeight: '400',
      color: resources.colors.black,
      letterSpacing: 0.4,
      marginHorizontal: hp('4%'),
      lineHeight: hp('3%'),
      textAlign: 'justify',
    },
    textHead: {
      marginStart: hp('3%'),
      marginTop: hp('2%'),
      fontSize: hp('2.2%'),
      fontFamily: resources.fonts.semiBold,
      fontWeight: '700',
      width: wp('92%'),
      color: resources.colors.black,
    },
    LocationText: {
      marginStart: hp('3%'),
      marginTop: hp('2%'),
      fontSize: hp('2%'),
      fontFamily: resources.fonts.semiBold,
      fontWeight: '700',
      width: wp('92%'),
      color: resources.colors.black,
    },
    LocationText1: {
      marginStart: hp('2%'),
      marginTop: hp('1%'),
      fontSize: hp('2%'),
      fontFamily: resources.fonts.Amedium,
      fontWeight: '500',
      width: wp('92%'),
      color: resources.colors.black,
    },
    button: {
      height: hp('10%'),
      width: wp('92%'),
      backgroundColor: '#F9F9F9',
      borderRadius: 12,
      marginTop: hp('3%'),
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    salaryButton: {
      height: hp('6%'),
      width: wp('42%'),
      borderRadius: 12,
      justifyContent: 'center',
    },
    salaryText: {
      textAlign: 'center',
      fontSize: hp('2%'),
      fontWeight: '600',
      fontFamily: resources.fonts.medium,
    },
    mainText: {
      marginTop: hp('2%'),
      marginStart: hp('2%'),
      fontSize: hp('1.7%'),
      fontWeight: '400',
      fontFamily: resources.fonts.semiBold,
      color: resources.colors.black,
      width: wp('95%'),
    },
    subText: {
      fontSize: hp('1.7%'),
      fontWeight: '400',
      color: resources.colors.black,
      fontFamily: resources.fonts.Aregular,
    },
    subText1: {
      fontSize: hp('1.8%'),
      fontWeight: '100',
      color: resources.colors.black,
      fontFamily: resources.fonts.regular,
      marginStart: hp('2%'),
    },
    courseBox: {
      // height: hp('15%'),
      width: wp('90%'),
      borderColor: resources.colors.light_ash,
      borderWidth: 1,
      borderRadius: 12,
      flexDirection: 'row',
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
    separate: {margin: 10},
    empty: {justifyContent: 'center', marginTop: hp('20%')},
    noData: {
      textAlign: 'center',
      color: resources.colors.ash,
      fontSize: hp('2.2%'),
      fontFamily: resources.fonts.Aregular,
      fontWeight: '500',
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
    collegeNameText: {
      color: resources.colors.primary,
      fontWeight: '800',
      fontSize: hp('1.9%'),
      fontFamily: resources.fonts.Amedium,
      width: wp('41%'),
    },
    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  const handleChange = async (id: number, ind: number) => {
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
      countryId: userData?.Country?.id,
    };

    await dispatch(courseListFetchRequest(data));
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
      <TouchableOpacity style={styles.courseBox} onPress={() => _details(item)}>
        <Image
          source={{uri: item?.mainImage}}
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
            <Text style={styles.collegeNameText} numberOfLines={1}>
              {item?.name}
            </Text>
            <View
              style={{
                alignSelf: 'flex-end',
                marginRight: hp('3%'),
                flexDirection: 'row',
              }}>
              <Image
                source={resources.images.Star}
                style={styles.starImage}
                // resizeMode="contain"
              />
              <Text style={styles.locationName}>{item?.rating.toFixed(1)}</Text>
            </View>
          </View>
          <Text style={[styles.courseText]}>{item?.specialization}</Text>
          <Text style={styles.courseText}>
            {item?.educationLevel?.name} ({item?.code})
          </Text>
          <View style={{flexDirection: 'row', marginTop: hp('0.5%')}}>
            <Text style={styles.feeText}>Application Fee</Text>
            <View style={{flexDirection: 'row'}}>
              {item?.applicationFees === 0 ? (
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
                    {item?.applicationFees}
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
  return (
    <View style={styles.main}>
      <SubHeaderComponent
        countryImage={''}
        name={'College Details'}
        cap={resources.images.cap}
        goBack={() => goback()}
      />

      <ScrollView>
        <Image
          source={{uri: selectedCollege?.mainImage}}
          style={{
            height: hp('25%'),
            width: wp('95%'),
            borderRadius: 12,
            marginStart: hp('1%'),
            marginTop: hp('2%'),
          }}
          resizeMode="stretch"
          // resizeMode="contain"
        />

        <Text style={styles.collegeText}>{selectedCollege?.name}</Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: hp('2%'),
            alignItems: 'center',
          }}>
          <Image
            source={resources.images.GroupMembers}
            style={styles.groupImage}
            resizeMode="contain"
          />

          <Text style={styles.text}>
            {selectedCollege?.appliedCount} Students Applied
          </Text>

          <Image
            source={resources.images.Star}
            style={{height: hp('3%'), width: wp('4%')}}
            // resizeMode="contain"
          />
          {/* <Text style={styles.starText}>
              {selectedCollege?.rating.toFixed(1)}
              {'  '}
              {selectedCollege?.reviewCount !== 0
                ? `(${selectedCollege?.reviewCount} Reviews)`
                : null}
            </Text> */}

          <Text style={styles.starText}>
            {selectedCollege?.rating.toFixed(1)}
          </Text>

          <Text style={styles.starText}>
            {'('}
            {selectedCollege?.reviewCount} Reviews{')'}
          </Text>
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              setInfoActive(true);
              setSalaryScaleActive(false);
            }}
            style={[
              styles.salaryButton,
              {
                backgroundColor: infoActive
                  ? resources.colors.primary
                  : resources.colors.white,
              },
            ]}>
            <Text
              style={[
                styles.salaryText,
                {
                  color: infoActive
                    ? resources.colors.white
                    : resources.colors.primary,
                },
              ]}>
              Info
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setInfoActive(false);
              setSalaryScaleActive(true);
            }}
            style={[
              styles.salaryButton,
              {
                backgroundColor: salaryScaleActive
                  ? resources.colors.primary
                  : resources.colors.white,
              },
            ]}>
            <Text
              style={[
                styles.salaryText,
                {
                  color: salaryScaleActive
                    ? resources.colors.white
                    : resources.colors.primary,
                },
              ]}>
              Reviews
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.textHead}>Location</Text>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(selectedCollege?.website);
          }}>
          <Text style={[styles.LocationText]}>
            {selectedCollege?.locations[0]?.addressOne} {'\n'}
            {selectedCollege?.locations[0]?.addressTwo ? (
              <Text style={[styles.LocationText1]}>
                {selectedCollege?.locations[0]?.addressTwo}
                {' ,'}{' '}
              </Text>
            ) : null}
            <Text style={[styles.LocationText1]}>
              {selectedCollege?.locations[0]?.city}
            </Text>
          </Text>
        </TouchableOpacity>
        <Text style={styles.textHead}>Website</Text>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(selectedCollege?.website);
          }}>
          <Text
            style={[
              styles.contentText,
              {color: '#399CFF', marginTop: hp('1%')},
            ]}>
            {selectedCollege?.website}
          </Text>
        </TouchableOpacity>
        <Text style={styles.textHead}>About</Text>
        <Text
          style={styles.contentText}
          numberOfLines={expanded ? undefined : maxLines}>
          {selectedCollege?.about}
        </Text>
        <TouchableOpacity
          onPress={() => setExpanded(!expanded)}
          style={{
            marginTop: 5,
            alignContent: 'flex-end',
            alignItems: 'flex-end',
            marginRight: hp('4%'),
          }}>
          <Text
            style={{
              color: resources.colors.primary,
              justifyContent: 'flex-end',
              fontWeight: '400',
              fontSize: hp('1.8%'),
              fontFamily: resources.fonts.regular,
              textAlign: 'justify',
              letterSpacing: 0.4,
            }}>
            {expanded ? 'less...' : 'more...'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.categoriesText}>Colleges</Text>
        <View style={styles.list}>
          <FlatList
            style={{width: wp('92%'), marginRight: hp('5')}}
            data={categorieList}
            renderItem={_renderCategories}
            horizontal
            ItemSeparatorComponent={_ItemSeparator}
          />
        </View>
        {isFetching ? (
          <View style={styles.loader}>
            <LoaderComponent size={hp('3.5%')} color={theme.primary} />
          </View>
        ) : null}
        <View style={styles.list}>
          <FlatList
            style={{marginBottom: hp('30%')}}
            data={courses}
            renderItem={_renderCourses}
            ItemSeparatorComponent={_ItemSeparator}
            ListEmptyComponent={_ListEmptyComponent}
          />
        </View>
        <View style={{height: hp('3%')}} />
      </ScrollView>
    </View>
  );
};

export default CollegeDetails;
