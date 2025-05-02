/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import resources from '../../resources';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
} from '../../services/ResponsiveUIHelpers';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {
  institutionListFetchRequest,
  setFromScreen,
  setSelectedCollege,
  setSelectedCourse,
  universityListFetchRequest,
} from '../../redux/slices/appSlice';
import {useAppDispatch, useAppSelector} from '../../hooks/redux_hooks';
import LoaderComponent from '../../components/LoaderComponent';
import HeaderComponent from '../../components/HeaderComponent';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {stackProps} from '../../navigation/types';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Colleges = () => {
  const navigation = useNavigation<stackProps>();
  const dispatch = useAppDispatch();
  const [orientation, setOrientation] = useState('');
  const [search, setSearch] = useState<string>('');
  const [collegeActive, setCollegeActive] = useState<boolean>(true);
  const [universityActive, setUniversityActive] = useState<boolean>(false);
  const {theme, isFetching, isError} = useAppSelector(state => state.common);
  const {institutionList, universityList} = useAppSelector(state => state.app);
  const [count, setCount] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  const [colleges, setColleges] = useState<any>(institutionList);
  const [university, setUniversity] = useState<any>(universityList);
  const {userData} = useAppSelector(state => state.auth);

  useEffect(() => {
    var data = {
      count,
      page,
      countryId: userData?.Country?.id,
    };
    dispatch(institutionListFetchRequest(data));
    dispatch(universityListFetchRequest(data));
  }, []);

  useEffect(() => {
    setColleges(institutionList);
    setUniversity(universityList);
  }, [institutionList, universityList]);
  useFocusEffect(
    useCallback(() => {
      lor(setOrientation);
    }, []),
  );
  const searchCollege = (searchQuery: any) => {
    console.log('colleges', colleges);

    if (searchQuery.length > 2) {
      const filteredInstitutions = institutionList.filter((college: any) =>
        college.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      const filteredUniversits = universityList.filter((college: any) =>
        college.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      // const [university, setUniversity] = useState<any>(universityList);
      setColleges(filteredInstitutions);
      setUniversity(filteredUniversits);
    } else {
      setColleges(institutionList);
      setUniversity(universityList);
    }
  };

  const onEndReached = useCallback(() => {
    setPage(prevPage => prevPage + 1);
    setCount(prevCount => prevCount + 10);

    const data = {
      page: page + 1,
      count: count + 10,
      countryId: userData?.Country?.id,
    };
    dispatch(institutionListFetchRequest(data));
    dispatch(universityListFetchRequest(data));
  }, [dispatch, count]);

  const _details = (item: any) => {
    dispatch(setSelectedCollege(item));
    dispatch(setFromScreen('Courses'));
    navigation.navigate('CollegeDetails');
  };
  const countryChange = () => {
    navigation.navigate('CountryChange');
  };
  const _renderColleges = ({item}: any) => {
    return (
      <TouchableOpacity style={styles.box} onPress={() => _details(item)}>
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

  const _renderUniversity = ({item}: any) => {
    return (
      <TouchableOpacity style={styles.box} onPress={() => _details(item)}>
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
  const _ItemSeparator = () => {
    return <View style={styles.separate} />;
  };

  const ListEmptyComponent = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          marginTop: hp('30%'),
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: resources.colors.ash,
            fontSize: hp('2.2%'),
            fontFamily: resources.fonts.Aregular,
            fontWeight: '500',
          }}>
          No Data found
        </Text>
      </View>
    );
  };
  const styles = StyleSheet.create({
    main: {
      flex: 1,
      // marginStart: hp('2%'),
      // backgroundColor: resources.colors.white,
    },
    header: {height: hp('8%'), width: wp('100'), marginStart: hp('2%')},
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
    collegeImage: {
      height: hp('18%'),
      width: wp('38%'),
      borderRadius: 10,
      marginTop: hp('1.2%'),
      alignSelf: 'center',
    },
    box: {
      height: hp('28%'),
      width: wp('44%'),
      backgroundColor: resources.colors.white,
      // marginStart: 10,
      marginStart: hp('2%'),
      borderRadius: 10,
    },
    button: {
      height: hp('6%'),
      width: wp('92%'),
      backgroundColor: resources.colors.light_ash,
      borderRadius: 12,
      marginTop: hp('3%'),
      flexDirection: 'row',
      marginStart: hp('2%'),
    },
    collegeButton: {
      height: hp('6%'),
      width: wp('46%'),
      borderRadius: 12,
      justifyContent: 'center',
    },
    collegeText: {
      textAlign: 'center',
      fontSize: hp('2%'),
      fontWeight: '700',
      fontFamily: resources.fonts.Amedium,
    },
    // list: {marginRight: 10, marginTop: 10},
    separate: {margin: 10},

    starImage: {
      height: hp('2.4%'),
      width: wp('5%'),
      marginTop: hp('0.3%'),
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
    list: {marginRight: 10, marginTop: 10, marginBottom: hp('25%')},
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
          name={'Colleges'}
          cap={resources.images.cap}
          countryChange={() => countryChange()}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.searchBox}>
          <AntDesign
            name={'search1'}
            size={20}
            color={resources.colors.ash}
            style={{marginLeft: hp('1%')}}
          />
          {/* <Image
            source={resources.images.Search}
            style={{height: hp('4%'), width: wp('6%'), marginLeft: hp('1%')}}
            resizeMode="contain"
          /> */}
          <TextInput
            style={{
              color: resources.colors.black,
              fontSize: hp('2%'),
              fontFamily: resources.fonts.Amedium,
              fontWeight: '400',
              // letterSpacing: 1,
            }}
            // value={search}
            placeholderTextColor={resources.colors.ash}
            placeholder={'Search Courses, Colleges'}
            onChangeText={val => {
              // setSearch(val);
              searchCollege(val); // Call search as user types
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
      <View style={styles.button}>
        <TouchableOpacity
          onPress={() => {
            setCollegeActive(true);
            setUniversityActive(false);
          }}
          style={[
            styles.collegeButton,
            {
              backgroundColor: collegeActive
                ? resources.colors.primary
                : resources.colors.light_ash,
            },
          ]}>
          <Text
            style={[
              styles.collegeText,
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
            setCollegeActive(false);
            setUniversityActive(true);
          }}
          style={[
            styles.collegeButton,
            {
              backgroundColor: universityActive
                ? resources.colors.primary
                : resources.colors.light_ash,
            },
          ]}>
          <Text
            style={[
              styles.collegeText,
              {
                color: universityActive
                  ? resources.colors.white
                  : resources.colors.light_ash1,
              },
            ]}>
            University
          </Text>
        </TouchableOpacity>
      </View>
      {isFetching ? (
        <View style={styles.loader}>
          <LoaderComponent size={hp('3.5%')} color={theme.primary} />
        </View>
      ) : null}
      {collegeActive ? (
        <View style={styles.list}>
          <FlatList
            data={colleges}
            numColumns={2}
            renderItem={_renderColleges}
            ItemSeparatorComponent={_ItemSeparator}
            ListEmptyComponent={ListEmptyComponent}
            // onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
          />
        </View>
      ) : (
        <View style={styles.list}>
          <FlatList
            data={university}
            numColumns={2}
            renderItem={_renderUniversity}
            ItemSeparatorComponent={_ItemSeparator}
            ListEmptyComponent={ListEmptyComponent}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
          />
        </View>
      )}
    </View>
  );
};

export default Colleges;
