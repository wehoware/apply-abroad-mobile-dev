/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
} from '../../services/ResponsiveUIHelpers';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../hooks/redux_hooks';
import {stackProps} from '../../navigation/types';
import resources from '../../resources';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import SubHeaderComponent from '../../components/SubHeaderComponent';
import RenderHtml from 'react-native-render-html';
import {FlatList} from 'react-native-gesture-handler';

const CourseDetails = () => {
  const navigation = useNavigation<stackProps>();
  const dispatch = useAppDispatch();
  const {selectedCourse, fromScreen} = useAppSelector(state => state.app);
  const [orientation, setOrientation] = useState('');
  const [infoActive, setInfoActive] = useState<boolean>(true);
  const [salaryScaleActive, setSalaryScaleActive] = useState<boolean>(false);
  const {userData} = useAppSelector(state => state.auth);
  const [expanded, setExpanded] = useState(false);
  const maxLength = 200;

  const {width} = Dimensions.get('window');
  const maxLines = 4; // Limit initial lines
  const goback = () => {
    navigation.goBack();
  };
  useFocusEffect(
    useCallback(() => {
      lor(setOrientation);
    }, []),
  );
  console.log('selectedCourse', selectedCourse);
  const previewHtml =
    selectedCourse?.description.length > maxLength
      ? selectedCourse?.description.substring(0, maxLength) + '...'
      : selectedCourse?.description;
  const styles = StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: resources.colors.white,
      // marginStart: hp('1%'),
    },
    header: {
      height: hp('8%'),
      width: wp('100%'),
      marginStart: hp('2%'),
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
    text: {
      fontSize: hp('1.8%'),
      color: resources.colors.primary,
      fontFamily: resources.fonts.AsemiBold,
      fontWeight: '500',
      width: wp('48%'),
    },
    groupImage: {height: hp('3%'), width: wp('8%'), marginStart: hp('2.5%')},
    starText: {
      fontSize: hp('1.8%'),
      color: resources.colors.black,
      fontFamily: resources.fonts.AsemiBold,
      fontWeight: '500',
      marginStart: hp('1%'),
    },

    contentHead: {
      marginStart: hp('3%'),
      marginTop: hp('3%'),
      fontSize: hp('2.2%'),
      fontFamily: resources.fonts.AsemiBold,
      fontWeight: '600',
    },
    contentText: {
      marginStart: hp('3%'),
      marginTop: hp('2%'),
      fontSize: hp('1.8%'),
      fontFamily: resources.fonts.black,
      fontWeight: '400',
      width: wp('92%'),
      lineHeight: 20,
      paddingRight: hp('1.8%'),
    },
    button: {
      height: hp('10%'),
      width: wp('90%'),
      backgroundColor: '#F9F9F9',
      borderRadius: 5,
      marginTop: hp('3%'),
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
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
      fontFamily: resources.fonts.AsemiBold,
    },
    mainText: {
      marginTop: hp('2%'),
      marginStart: hp('3%'),
      fontSize: hp('1.8%'),
      fontWeight: '700',
      fontFamily: resources.fonts.Amedium,
      color: resources.colors.black,
      width: wp('95%'),
    },
    subText: {
      fontSize: hp('1.8%'),
      fontWeight: '400',
      color: resources.colors.black,
      // fontFamily: resources.fonts.Aregular,
      fontFamily: resources.fonts.Amedium,
    },
    subText1: {
      fontSize: hp('1.8%'),
      fontWeight: '100',
      color: resources.colors.black,
      fontFamily: resources.fonts.regular,
      marginStart: hp('3%'),
      marginTop: hp('1%'),
    },
    collegeImage: {
      height: hp('25%'),
      width: wp('95%'),
      borderRadius: 12,
      marginTop: hp('2%'),
      marginStart: hp('1%'),
    },
    applyButton: {
      height: hp('6%'),
      width: wp('55%'),
      backgroundColor: resources.colors.primary,
      marginTop: hp('4%'),
      borderRadius: 5,
      justifyContent: 'center',
      alignSelf: 'center',
    },
    applyText: {
      color: resources.colors.white,
      fontSize: hp('2'),
      fontWeight: '600',
      textAlign: 'center',
      fontFamily: resources.fonts.AsemiBold,
      lineHeight: 20,
    },
  });
  const ListEmptyComponent = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: hp('1%'),
          height: hp('20%'),
          width: wp('90%'),
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

  return (
    <View style={styles.main}>
      <SubHeaderComponent
        countryImage={''}
        name={'Course Details'}
        cap={resources.images.cap}
        goBack={() => goback()}
      />
      <ScrollView nestedScrollEnabled={true}>
        <Image
          source={{uri: selectedCourse?.mainImageRectangle}}
          style={styles.collegeImage}
          resizeMode="stretch"
          // resizeMode="cover"
        />
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
            {selectedCourse?.appliedCount} Students Applied
          </Text>
          <Image
            source={resources.images.Star}
            style={{height: hp('3%'), width: wp('4%')}}
            // resizeMode="contain"
          />
          <Text style={styles.starText}>
            {selectedCourse?.rating.toFixed(1)}
            {'  '}({selectedCourse?.reviewCount} Reviews)
          </Text>
        </View>
        <Text style={styles.contentHead} numberOfLines={1}>
          {selectedCourse?.specialization}
        </Text>
        <Text style={[styles.contentHead, {marginTop: hp('0%')}]}>
          {selectedCourse?.educationLevel?.name
            ? '(' + selectedCourse?.educationLevel?.name + ')'
            : ''}{' '}
          {selectedCourse?.code ? '(' + selectedCourse?.code + ')' : ''}
        </Text>
        <Text
          style={styles.contentText}
          numberOfLines={expanded ? undefined : maxLines}>
          <RenderHtml
            contentWidth={width}
            source={{
              html: expanded ? selectedCourse?.description : previewHtml,
            }}
          />
          {/* <RenderHtml
            contentWidth={width}
            source={{html: selectedCourse?.description}}
          /> */}
          {/* {selectedCourse?.description} */}

          {/* {htmlToText(selectedCourse?.description)} */}
        </Text>
        {selectedCourse?.description.length > maxLength && (
          <TouchableOpacity
            onPress={() => setExpanded(!expanded)}
            style={{
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
                fontFamily: resources.fonts.Aregular,
                textAlign: 'justify',
                letterSpacing: 0.4,
              }}>
              {expanded ? 'Less...' : 'More...'}
            </Text>
          </TouchableOpacity>
        )}

        {/* <TouchableOpacity
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
        </TouchableOpacity> */}
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
              Salary Scale
            </Text>
          </TouchableOpacity>
        </View>
        {infoActive ? (
          <>
            <Text
              style={{
                marginTop: hp('4%'),
                marginStart: hp('3%'),
                fontSize: hp('2.2%'),
                fontWeight: '700',
                fontFamily: resources.fonts.Amedium,
                color: resources.colors.black,
              }}>
              Program Overview
            </Text>
            <Text style={styles.mainText}>
              Department/School:
              <Text style={styles.subText}> {selectedCourse?.department}</Text>
            </Text>
            <Text style={[styles.mainText, {marginTop: hp('1%')}]}>
              Faculty:{' '}
              <Text style={styles.subText}>{selectedCourse?.faculty}</Text>
            </Text>

            <Text style={[styles.mainText, {marginTop: hp('1%')}]}>
              Admit term(s):
              <Text style={styles.subText}>{selectedCourse?.admitTerms}</Text>
            </Text>

            <Text style={[styles.mainText, {marginTop: hp('1%')}]}>
              Delivery mode:
              <Text style={styles.subText}> {selectedCourse?.studyMode}</Text>
            </Text>

            <Text style={[styles.mainText, {marginTop: hp('1%')}]}>
              Program type:{' '}
              <Text style={styles.subText}>
                {selectedCourse?.educationLevel?.name}
              </Text>
            </Text>

            <Text style={[styles.mainText, {marginTop: hp('1%')}]}>
              Length of program:
              <Text style={styles.subText}> {selectedCourse?.duration} </Text>
            </Text>

            <Text style={[styles.mainText, {marginTop: hp('1%')}]}>
              Registration option(s):
              <Text style={styles.subText}>
                {' '}
                {selectedCourse?.enrollmentType}
              </Text>
            </Text>
            <Text style={[styles.mainText, {marginTop: hp('1%')}]}>
              Study option(s):
              <Text style={styles.subText}>
                {' '}
                {selectedCourse?.studyOptions}
              </Text>
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  marginTop: hp('2%'),
                  marginStart: hp('3%'),
                  fontSize: hp('2.2%'),
                  fontWeight: '700',
                  fontFamily: resources.fonts.Amedium,
                  color: resources.colors.black,
                }}>
                Application Fee
              </Text>
              <Text
                style={{
                  marginTop: hp('2%'),
                  marginStart: hp('2%'),
                  fontSize: hp('2%'),
                  fontWeight: '700',
                  fontFamily: resources.fonts.Amedium,
                  color: resources.colors.red,
                  marginRight: hp('3%'),
                }}>
                {selectedCourse?.applicationFees
                  ? '$' + selectedCourse?.applicationFees
                  : 'Free'}
              </Text>
            </View>

            {/* {selectedCourse?.programOverView?.map((item: any, index: number) => (
          <Text
            key={index}
            style={{
              marginTop: hp('1%'),
              marginStart: hp('2%'),
              fontSize: hp('1.8%'),
              fontWeight: '400',
              fontFamily: resources.fonts.Amedium,
              color: resources.colors.black,
              marginRight: hp('3%'),
            }}>
            {item.key}: {item.value}
            {'\n'}
          </Text>
        ))} */}
            {selectedCourse?.intakes ? (
              <Text
                style={{
                  marginTop: hp('2%'),
                  marginStart: hp('3%'),
                  fontSize: hp('2%'),
                  fontWeight: '700',
                  fontFamily: resources.fonts.Amedium,
                  color: resources.colors.black,
                }}>
                Application deadline
              </Text>
            ) : null}

            <Text style={styles.subText1}>
              {selectedCourse?.intakes?.map((item: any, index: number) => (
                <Text
                  key={index}
                  style={{
                    marginTop: hp('1%'),
                    marginStart: hp('3%'),
                    fontSize: hp('1.8%'),
                    fontWeight: '400',
                    fontFamily: resources.fonts.Amedium,
                    color: resources.colors.black,
                  }}>
                  {moment(item?.applicationEndDate).format('MMMM D')}(
                  {item?.name}){'\n'}
                </Text>
              ))}

              {/* March 1(for admission in September) */}
            </Text>
            {fromScreen === 'Applied' ? null : (
              <TouchableOpacity
                onPress={() => navigation.navigate('CheckOut')}
                style={styles.applyButton}>
                <Text style={styles.applyText}>Apply Now</Text>
              </TouchableOpacity>
            )}
          </>
        ) : (
          ListEmptyComponent()
        )}
        <View style={{height: hp('3%')}} />
      </ScrollView>
    </View>
  );
};

export default CourseDetails;
