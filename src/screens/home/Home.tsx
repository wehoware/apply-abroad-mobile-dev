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
} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../services/ResponsiveUIHelpers';
import resources from '../../resources';
import {useAppSelector} from '../../hooks/redux_hooks';

const Home = () => {
  const [search, setSearch] = useState<string>('');
  const [courses, setCourses] = useState<any>([
    {
      id: 1,
      courseName: 'Artificial Intelligence',
      image: resources.images.AICourse,
    },
    {
      id: 2,
      courseName: 'Cloud Computing',
      image: resources.images.CloudCourse,
    },
    {
      id: 3,
      courseName: 'Computer Science',
      image: resources.images.AICourse,
    },
    {
      id: 4,
      courseName: 'Cloud Computing',
      image: resources.images.CloudCourse,
    },
    {
      id: 5,
      courseName: 'Computer Science',
      image: resources.images.AICourse,
    },
  ]);

  const [categories, setCategories] = useState<any>([
    {
      id: 1,
      name: 'Business',
    },
    {
      id: 2,
      name: 'Marketing',
    },
    {
      id: 3,
      name: 'Designer',
    },
    {
      id: 4,
      name: 'Software',
    },
  ]);

  const [colleges, setColleges] = useState<any>([
    {
      id: 1,
      collegeName: 'Lamton',
      image: resources.images.College1,
    },
    {
      id: 2,
      collegeName: 'Almoga',
      image: resources.images.College2,
    },
    {
      id: 3,
      collegeName: 'Windsor',
      image: resources.images.College3,
    },
    {
      id: 4,
      collegeName: 'Rostrum',
      image: resources.images.College4,
    },
    {
      id: 5,
      collegeName: 'Science',
      image: resources.images.College1,
    },
  ]);

  const [itCourses, setITCourses] = useState<any>([
    {
      id: 1,
      courseName: 'Artificial Intelligence',
      image: resources.images.AICourse,
    },
    {
      id: 2,
      courseName: 'Cloud Computing',
      image: resources.images.CloudCourse,
    },
    {
      id: 3,
      courseName: 'Computer Science',
      image: resources.images.AICourse,
    },
    {
      id: 4,
      courseName: 'Cloud Computing',
      image: resources.images.CloudCourse,
    },
    {
      id: 5,
      courseName: 'Computer Science',
      image: resources.images.AICourse,
    },
  ]);

  const _renderCourses = ({item}: any) => {
    return (
      <View>
        <Image
          source={item.image}
          style={styles.courseImage}
          resizeMode="contain"
        />
        <Text style={styles.courseName}>{item.courseName}</Text>
      </View>
    );
  };

  const _renderITCourses = ({item}: any) => {
    return (
      <View>
        <Image
          source={item.image}
          style={styles.itCourseImage}
          resizeMode="contain"
        />
        <Text style={styles.courseName}>{item.courseName}</Text>
      </View>
    );
  };

  const _renderCategories = ({item}: any) => {
    return (
      <View style={styles.categoriesBox}>
        <Text style={styles.categoriesName}>{item.name}</Text>
      </View>
    );
  };

  const _renderColleges = ({item}: any) => {
    return (
      <View>
        <Image
          source={item.image}
          style={styles.collegeImage}
          resizeMode="contain"
        />
        <Text style={styles.collegeName}>{item.collegeName}</Text>
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
      fontWeight: '700',
      fontFamily: resources.fonts.medium,
      width: wp('80%'),
    },
    searchBox: {
      height: hp('6%'),
      width: wp('90%'),
      borderColor: resources.colors.ash,
      borderWidth: 1,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: hp('1%'),
    },
    courseMain: {flexDirection: 'row', marginTop: hp('3%')},
    courseText: {
      width: wp('75%'),
      fontFamily: resources.fonts.medium,
      fontSize: hp('2.2%'),
      fontWeight: '600',
    },
    courseImage: {height: hp('15%'), width: wp('30%'), borderRadius: 12},
    seeMore: {
      fontSize: hp('1.6%'),
      color: resources.colors.primary,
      fontWeight: '600',
      fontFamily: resources.fonts.medium,
    },
    courseName: {
      color: resources.colors.black,
      fontWeight: '600',
      fontSize: hp('1.6%'),
      fontFamily: resources.fonts.medium,
      textAlign: 'center',
    },
    separate: {margin: 10},
    collegeImage: {height: hp('10%'), width: wp('20%'), borderRadius: 100},
    collegeName: {
      color: resources.colors.black,
      fontWeight: '600',
      fontSize: hp('1.6%'),
      fontFamily: resources.fonts.medium,
      textAlign: 'center',
      marginTop: hp('1%'),
    },
    categoriesName: {
      color: '#808080',
      fontWeight: '600',
      fontSize: hp('1.6%'),
      fontFamily: resources.fonts.medium,
      textAlign: 'center',
    },
    categoriesBox: {
      height: hp('5%'),
      width: wp('20%'),
      backgroundColor: resources.colors.ash,
      justifyContent: 'center',
      borderRadius: 12,
    },
    itCourseImage: {height: hp('25%'), width: wp('50%'), borderRadius: 12},
    list: {marginRight: 10, marginTop: 10},
  });
  return (
    <ScrollView style={styles.main}>
      <View style={styles.header} />
      <Text style={styles.topText}>Find a resource you want to learn!</Text>
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
          onChangeText={val => setSearch(val)}
        />
      </View>
      <View style={[styles.courseMain, {marginTop: hp('1%')}]}>
        <Text style={styles.courseText}>Top Courses for you</Text>
        <Text style={styles.seeMore}>See More </Text>
      </View>
      <View style={[styles.list, {marginTop: 5}]}>
        <FlatList
          data={courses.slice(0, 3)}
          renderItem={_renderCourses}
          horizontal
          ItemSeparatorComponent={_ItemSeparator}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.courseMain}>
        <Text style={styles.courseText}>Categories</Text>
        <Text style={styles.seeMore}>See More </Text>
      </View>
      <View style={styles.list}>
        <FlatList
          data={categories.slice(0, 4)}
          renderItem={_renderCategories}
          horizontal
          ItemSeparatorComponent={_ItemSeparator}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.courseMain}>
        <Text style={styles.courseText}>Popular Colleges</Text>
        <Text style={styles.seeMore}>See More</Text>
      </View>
      <View style={styles.list}>
        <FlatList
          data={colleges.slice(0, 4)}
          renderItem={_renderColleges}
          horizontal
          ItemSeparatorComponent={_ItemSeparator}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.courseMain}>
        <Text style={styles.courseText}>IT Courses for you</Text>
        <Text style={styles.seeMore}>See More</Text>
      </View>
      <View style={[styles.list, {marginBottom: hp('2%')}]}>
        <FlatList
          data={itCourses}
          renderItem={_renderITCourses}
          horizontal
          ItemSeparatorComponent={_ItemSeparator}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
};

export default Home;
