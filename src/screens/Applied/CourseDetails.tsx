/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../services/ResponsiveUIHelpers';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../hooks/redux_hooks';
import {stackProps} from '../../navigation/types';
import resources from '../../resources';
import AntDesign from 'react-native-vector-icons/AntDesign';
const CourseDetails = () => {
  const navigation = useNavigation<stackProps>();
  const dispatch = useAppDispatch();
  const [infoActive, setInfoActive] = useState<boolean>(true);
  const [salaryScaleActive, setSalaryScaleActive] = useState<boolean>(false);
  return (
    <View style={styles.main}>
      <TouchableOpacity style={styles.header}>
        <AntDesign
          name={'left'}
          size={20}
          color={resources.colors.black}
          onPress={() => navigation.goBack()}
          style={{width: wp('30%')}}
        />
        <Text style={styles.headerText}>Course Details</Text>
      </TouchableOpacity>
      <ScrollView>
        <Image
          source={resources.images.AICourseRect}
          style={{height: hp('25%'), width: wp('95%'), borderRadius: 12}}
          // resizeMode="contain"
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: hp('1%'),
            alignItems: 'center',
          }}>
          <Image
            source={resources.images.GroupMembers}
            style={{height: hp('4%'), width: wp('10%')}}
            resizeMode="contain"
          />
          <Text style={styles.text}>5.8k Students Applied</Text>
          <Image
            source={resources.images.Star}
            style={{height: hp('4%'), width: wp('5%')}}
            // resizeMode="contain"
          />
          <Text style={styles.starText}>{'4.9  (509 Reviews)'}</Text>
        </View>
        <Text style={styles.contentHead}>
          Web Development – Front-End Design (Postgraduate) (G418)
        </Text>
        <Text style={styles.contentText}>
          You’ll take an innovative and interdisciplinary approach to exploring
          solutions to engineering problems at the cutting edge of technology
          and design, preparing you to pursue or advance your career in
          acadamy...
        </Text>
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

        <Text
          style={{
            marginTop: hp('2%'),
            marginStart: hp('2%'),
            fontSize: hp('2%'),
            fontWeight: '500',
            fontFamily: resources.fonts.medium,
            color: resources.colors.black,
          }}>
          Program Overview
        </Text>
        <Text style={styles.mainText}>
          Department/School:
          <Text style={styles.subText}> Systems Design Engineering</Text>
        </Text>
        <Text style={[styles.mainText, {marginTop: hp('1%')}]}>
          Faculty:
          <Text style={styles.subText}>Faculty of Engineering</Text>
        </Text>

        <Text style={[styles.mainText, {marginTop: hp('1%')}]}>
          Admit term(s):
          <Text style={styles.subText}>
            Fall (September - December), Winter (January - April), Spring (May -
            August)
          </Text>
        </Text>

        <Text style={[styles.mainText, {marginTop: hp('1%')}]}>
          Delivery mode:
          <Text style={styles.subText}> On-campus</Text>
        </Text>

        <Text style={[styles.mainText, {marginTop: hp('1%')}]}>
          Program type:
          <Text style={styles.subText}> Master's, Research</Text>
        </Text>

        <Text style={[styles.mainText, {marginTop: hp('1%')}]}>
          Length of program:
          <Text style={styles.subText}> 24 months (full-time)</Text>
        </Text>

        <Text style={[styles.mainText, {marginTop: hp('1%')}]}>
          Registration option(s):
          <Text style={styles.subText}> Full-time, Part-time</Text>
        </Text>
        <Text style={[styles.mainText, {marginTop: hp('1%')}]}>
          Study option(s):
          <Text style={styles.subText}> Thesis</Text>
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              marginTop: hp('2%'),
              marginStart: hp('2%'),
              fontSize: hp('2%'),
              fontWeight: '500',
              fontFamily: resources.fonts.medium,
              color: resources.colors.black,
            }}>
            Program Overview
          </Text>
          <Text
            style={{
              marginTop: hp('2%'),
              marginStart: hp('2%'),
              fontSize: hp('2%'),
              fontWeight: '500',
              fontFamily: resources.fonts.medium,
              color: resources.colors.red,
              marginRight: hp('3%'),
            }}>
            {'$120'}
          </Text>
        </View>
        <Text
          style={{
            marginTop: hp('2%'),
            marginStart: hp('2%'),
            fontSize: hp('2%'),
            fontWeight: '500',
            fontFamily: resources.fonts.medium,
            color: resources.colors.black,
          }}>
          Application deadline
        </Text>
        <Text style={styles.subText1}>March 1(for admission in September)</Text>
        <Text style={styles.subText1}>
          June 1(for admission in January of the following year)
        </Text>
        <Text style={styles.subText1}>
          October 1(for admission in May of the following year)
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('CheckOut')}
          style={{
            height: hp('6%'),
            width: wp('60%'),
            backgroundColor: resources.colors.primary,
            marginTop: hp('4%'),
            borderRadius: 12,
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              color: resources.colors.white,
              fontSize: hp('2'),
              fontWeight: '500',
              textAlign: 'center',
            }}>
            Apply Now
          </Text>
        </TouchableOpacity>
        <View style={{height: hp('3%')}} />
      </ScrollView>
    </View>
  );
};

export default CourseDetails;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginStart: hp('1%'),
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
  text: {
    fontSize: hp('1.8%'),
    color: resources.colors.primary,
    fontFamily: resources.fonts.medium,
    fontWeight: '500',
    width: wp('45%'),
  },
  starText: {
    fontSize: hp('1.8%'),
    color: resources.colors.black,
    fontFamily: resources.fonts.medium,
    fontWeight: '500',
  },
  contentHead: {
    marginStart: hp('1%'),
    marginTop: hp('2%'),
    fontSize: hp('2.3%'),
    fontFamily: resources.fonts.medium,
    fontWeight: '600',
  },
  contentText: {
    marginStart: hp('1%'),
    marginTop: hp('2%'),
    fontSize: hp('1.8%'),
    fontFamily: resources.fonts.regular,
    fontWeight: '400',
    width: wp('92%'),
  },
  button: {
    height: hp('6%'),
    width: wp('88%'),
    backgroundColor: resources.colors.white,
    borderRadius: 12,
    marginTop: hp('3%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  salaryButton: {
    height: hp('6%'),
    width: wp('44%'),
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
    fontSize: hp('1.8%'),
    fontWeight: '500',
    fontFamily: resources.fonts.medium,
    color: resources.colors.black,
    width: wp('95%'),
  },
  subText: {
    fontSize: hp('1.8%'),
    fontWeight: '100',
    color: resources.colors.black,
    fontFamily: resources.fonts.regular,
  },
  subText1: {
    fontSize: hp('1.8%'),
    fontWeight: '100',
    color: resources.colors.black,
    fontFamily: resources.fonts.regular,
    marginStart: hp('2%'),
  },
});
