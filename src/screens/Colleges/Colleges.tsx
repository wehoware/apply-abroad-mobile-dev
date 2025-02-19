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
} from '../../services/ResponsiveUIHelpers';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {
  institutionListFetchRequest,
  institutionListFetchSuccess,
  universityListFetchRequest,
} from '../../redux/slices/appSlice';
import {useAppDispatch, useAppSelector} from '../../hooks/redux_hooks';
import LoaderComponent from '../../components/LoaderComponent';

const Colleges = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState<string>('');
  const [collegeActive, setCollegeActive] = useState<boolean>(true);
  const [universityActive, setUniversityActive] = useState<boolean>(false);
  const {theme, isFetching, isError} = useAppSelector(state => state.common);
  const {institutionList, universityList} = useAppSelector(state => state.app);
  const [count, setCount] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  const [colleges, setColleges] = useState<any>(institutionList);
  const [university, setUniversity] = useState<any>(universityList);

  useEffect(() => {
    var data = {
      count,
      page,
    };
    dispatch(institutionListFetchRequest(data));
    dispatch(universityListFetchRequest(data));
  }, []);

  useEffect(() => {
    setColleges(institutionList);
    setUniversity(universityList);
  }, [institutionList, universityList]);

  const searchCollege = (searchQuery: any) => {
    if (searchQuery.length > 2) {
      const filteredColleges = colleges.filter((college: any) =>
        college.collegeName.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setColleges(filteredColleges);
    } else {
      setColleges(colleges);
    }
  };

  const onEndReached = useCallback(() => {
    setPage(prevPage => prevPage + 1);
    setCount(prevCount => prevCount + 10);

    const data = {
      page: page + 1,
      count: count + 10,
    };
    dispatch(institutionListFetchRequest(data));
    dispatch(universityListFetchRequest(data));
  }, [dispatch, count]);
  const _renderColleges = ({item}: any) => {
    return (
      <View style={styles.box}>
        <Image
          source={{uri: item.mainImage}}
          style={styles.collegeImage}
          resizeMode="cover"
        />
        <Text style={styles.collegeName}>{item.name}</Text>
        <View style={{flexDirection: 'row'}}>
          <EvilIcons
            name="location"
            color={resources.colors.red}
            size={20}
            style={{marginStart: hp('1%'), marginTop: hp('0.5%')}}
          />
          <Text numberOfLines={2} style={styles.locationName}>
            {item.address}
          </Text>
          <Image
            source={resources.images.Star}
            style={styles.starImage}
            // resizeMode="contain"
          />
          <Text style={styles.locationName}>{item.rating}</Text>
        </View>
      </View>
    );
  };

  const _renderUniversity = ({item}: any) => {
    return (
      <View style={styles.box}>
        <Image
          source={{uri: item.mainImage}}
          style={styles.collegeImage}
          resizeMode="cover"
        />

        <Text style={styles.collegeName}>{item.name}</Text>

        <View style={{flexDirection: 'row'}}>
          <EvilIcons
            name="location"
            color={resources.colors.red}
            size={20}
            style={{marginStart: hp('1%'), marginTop: hp('0.5%')}}
          />
          <Text style={styles.locationName}>{item.address}</Text>
          <Image
            source={resources.images.Star}
            style={styles.starImage}
            // resizeMode="contain"
          />
          <Text style={styles.locationName}>{item.rating}</Text>
        </View>
      </View>
    );
  };
  const _ItemSeparator = () => {
    return <View style={styles.separate} />;
  };
  const styles = StyleSheet.create({
    main: {
      flex: 1,
      marginStart: hp('2%'),
    },
    header: {height: hp('8%'), width: wp('100')},
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
    box: {
      height: hp('30%'),
      width: wp('43%'),
      backgroundColor: resources.colors.white,
      margin: 10,
      borderRadius: 10,
    },
    button: {
      height: hp('6%'),
      width: wp('92%'),
      backgroundColor: resources.colors.ash,
      borderRadius: 12,
      marginTop: hp('3%'),
      flexDirection: 'row',
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
      fontWeight: '600',
      fontFamily: resources.fonts.medium,
    },
    // list: {marginRight: 10, marginTop: 10},
    separate: {margin: 10},
    collegeImage: {
      height: hp('20%'),
      width: wp('40%'),
      borderRadius: 10,

      alignSelf: 'center',
    },
    starImage: {
      height: hp('3%'),
      width: wp('4%'),
    },
    collegeName: {
      color: resources.colors.black,
      fontWeight: '600',
      fontSize: hp('2%'),
      fontFamily: resources.fonts.medium,
      marginStart: hp('1%'),
      marginTop: hp('1%'),
      width: wp('40%'),
    },
    locationName: {
      color: resources.colors.ash,
      fontWeight: '600',
      fontSize: hp('1.8%'),
      fontFamily: resources.fonts.regular,
      width: wp('25%'),
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
              // searchCollege(val); // Call search as user types
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
                : resources.colors.ash,
            },
          ]}>
          <Text
            style={[
              styles.collegeText,
              {
                color: collegeActive
                  ? resources.colors.white
                  : resources.colors.black,
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
                : resources.colors.ash,
            },
          ]}>
          <Text
            style={[
              styles.collegeText,
              {
                color: universityActive
                  ? resources.colors.white
                  : resources.colors.black,
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
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
          />
        </View>
      )}
    </View>
  );
};

export default Colleges;
