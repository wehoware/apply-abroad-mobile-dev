/* eslint-disable no-sequences */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import CustomStatusbar from '../../components/CustomStatusbar';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../hooks/redux_hooks';
import {stackProps} from '../../navigation/types';
import resources from '../../resources';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../services/ResponsiveUIHelpers';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import dayjs from 'dayjs';
import DatePicker from 'react-native-date-picker';
const certificateList: any = [
  {
    id: 1,
    image: resources.images.Masters,
    name: 'Masters / Post Graduation',
    status: 'Not Uploaded',
  },
  {
    id: 2,
    image: resources.images.Degree,
    name: 'Degree / Under Graduation',
    status: 'Not Uploaded',
  },
  {
    id: 3,
    image: resources.images.Intermediate,
    name: 'Intermediate/10+2',
    status: 'Not Uploaded',
  },
  {
    id: 4,
    image: resources.images.SSC,
    name: 'SSC/CBSC/ICSC',
    status: 'Not Uploaded',
  },
];
const Certificates = () => {
  const navigation = useNavigation<stackProps>();
  const dispatch = useAppDispatch();
  const {theme} = useAppSelector(state => state.common);

  const [certificates, setCertificates] = useState<any>(certificateList);
  const [institutionName, setInstitutionName] = useState<string>('');
  const [stream, setStream] = useState<string>('');
  const [score, setScore] = useState<any>(0);
  const [maxScore, setMaxScore] = useState<any>(0);
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();
  const [type, setType] = useState<string>('');
  const [open, setOpen] = useState(false);
  const styles = StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: resources.colors.white,
    },
    header: {
      backgroundColor: resources.colors.primary,
      height: hp('18%'),
      width: wp('100%'),
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },
    headerText: {
      color: resources.colors.white,
      fontWeight: '600',
      fontFamily: resources.fonts.medium,
      fontSize: hp('3%'),
    },
    box: {
      height: hp('80%'),
      width: wp('95%'),
      backgroundColor: resources.colors.light_green,
      bottom: hp('5%'),
      alignSelf: 'center',
      borderRadius: 15,
    },
    boxText: {
      color: '#141B13',
      fontWeight: '700',
      fontSize: hp('3%'),
      marginTop: 20,
      fontFamily: resources.fonts.regular,
      // marginStart: 20,
      paddingTop: hp('3%'),
      paddingStart: hp('3%'),
    },
    start: {marginStart: 20},
    inputHeaderText: {
      fontSize: hp('1.9%'),
      color: '#141B13',
      fontWeight: '500',
      fontFamily: resources.fonts.medium,
    },
    signIn: {
      color: resources.colors.white,
      marginTop: 10,
      fontWeight: '600',
      textAlign: 'center',
      fontSize: hp('2.0%'),
    },
    button: {
      marginStart: 20,
      height: hp('6%'),
      width: wp('85%'),
      backgroundColor: resources.colors.primary,
      marginTop: hp('15%'),
      borderRadius: 5,
    },
    buttonSkip: {
      marginStart: 20,
      height: hp('6%'),
      width: wp('85%'),
      marginTop: hp('3%'),
      borderRadius: 5,
    },
    boxItem: {
      backgroundColor: resources.colors.white,
      height: hp('10%'),
      width: wp('85%'),
      marginStart: hp('2%'),
      borderColor: resources.colors.ash,
      borderWidth: 0.8,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemSeparate: {height: 20},
    circle: {
      height: hp('2%'),
      borderColor: resources.colors.ash,
      borderWidth: 1,
      width: wp('4%'),
      borderRadius: 100,
    },
    inputText: {
      color: resources.colors.ash,
      marginStart: hp('1%'),
      fontSize: hp('2%'),
      fontWeight: '500',
      fontFamily: resources.fonts.medium,
    },
    yellowCircle: {
      height: hp('3'),
      borderColor: '#FFC979',
      borderWidth: 7,
      width: wp('6'),
      borderRadius: 100,
      backgroundColor: resources.colors.white,
    },
    nameText: {
      color: resources.colors.black,
      width: wp('70%'),
      marginLeft: hp('2%'),
      fontSize: hp('1.8'),
      fontFamily: resources.fonts.regular,
      fontWeight: '700',
    },
    statusText: {
      color: resources.colors.ash,
      width: wp('70%'),
      marginLeft: hp('2%'),
      fontSize: hp('1.6'),
      fontFamily: resources.fonts.regular,
      fontWeight: '500',
    },
    inputStyle: {
      height: hp('6%'),
      width: wp('85%'),
      borderColor: '#AFAFAF',
      borderWidth: 1,
      borderRadius: 5,
      color: resources.colors.black,
      fontSize: hp('1.8%'),
      fontWeight: '500',
      marginTop: hp('1%'),
      fontFamily: resources.fonts.regular,
      paddingLeft: 15,
    },

    inputStyle1: {
      height: hp('6%'),
      width: wp('40%'),
      borderColor: '#AFAFAF',
      borderWidth: 1,
      borderRadius: 5,
      color: resources.colors.black,
      fontSize: hp('1.8%'),
      fontWeight: '500',
      marginTop: hp('1%'),
      fontFamily: resources.fonts.regular,
      paddingLeft: 15,
      textAlign: 'center',
    },
  });

  const _renderItem = ({item}: any) => {
    return (
      <TouchableOpacity style={[styles.boxItem]}>
        <Image
          source={item.image}
          style={{height: hp('8'), width: wp('20%'), marginStart: hp('1%')}}
          resizeMode="contain"
        />
        <View>
          <Text style={styles.nameText}>{item.name}</Text>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const ItemSeparatorComponent = () => {
    return <View style={styles.itemSeparate} />;
  };
  const _onConfirm = (date: any) => {
    if (type === 'start') {
      setStartDate(date);
    } else if (type === 'end') {
      setEndDate(date);
    }
  };

  return (
    <View style={styles.main}>
      <CustomStatusbar
        backgroundColor={theme.primary}
        barStyle={'light-content'}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Certificates</Text>
      </View>
      <View style={styles.box}>
        <View style={{marginTop: hp('4%')}}>
          <View style={styles.start}>
            {/* <Text style={styles.inputHeaderText}>Institution Name</Text> */}
            <TextInput
              placeholder="Enter Institution Name"
              placeholderTextColor={'#AFAFAF'}
              style={[
                styles.inputStyle,
                {
                  borderColor: resources.colors.ash,
                },
              ]}
              value={institutionName}
              onChangeText={val => setInstitutionName(val)}
            />

            {/* {emailError ? (
            <Text style={styles.errorText}>{'Please enter email'}</Text>
          ) : null} */}
          </View>
          <View style={styles.start}>
            <TextInput
              placeholder="Enter Stream Name"
              placeholderTextColor={'#AFAFAF'}
              style={[
                styles.inputStyle,
                {
                  borderColor: resources.colors.ash,
                },
              ]}
              value={stream}
              onChangeText={val => setStream(val)}
            />
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={styles.start}>
              <TextInput
                placeholder="Score"
                placeholderTextColor={'#AFAFAF'}
                style={[
                  styles.inputStyle1,
                  {
                    borderColor: resources.colors.ash,
                  },
                ]}
                value={score}
                onChangeText={val => setScore(val)}
              />
            </View>
            <View style={styles.start}>
              <TextInput
                placeholder="Max Score"
                placeholderTextColor={'#AFAFAF'}
                style={[
                  styles.inputStyle1,
                  {
                    borderColor: resources.colors.ash,
                  },
                ]}
                value={maxScore}
                onChangeText={val => setMaxScore(val)}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.start}
              onPress={() => {
                setOpen(true), setType('start');
              }}>
              <Text
                style={[
                  styles.inputStyle1,
                  {justifyContent: 'center', paddingTop: hp('1%')},
                ]}>
                {startDate
                  ? dayjs(startDate).format('DD/MM/YYYY')
                  : 'Start Date'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.start}
              onPress={() => {
                setOpen(true), setType('end');
              }}>
              <Text
                style={[
                  styles.inputStyle1,
                  {justifyContent: 'center', paddingTop: hp('1%')},
                ]}>
                {endDate ? dayjs(endDate).format('DD/MM/YYYY') : 'End Date'}
              </Text>
            </TouchableOpacity>
            <DatePicker
              modal
              open={open}
              date={new Date()}
              mode="date"
              onConfirm={date => {
                _onConfirm(date);
                setOpen(false);
              }}
              onCancel={() => {
                setOpen(false);
                setType('');
              }}
            />
          </View>
          {/* <FlatList
            data={certificates}
            renderItem={item => _renderItem(item)}
            ItemSeparatorComponent={ItemSeparatorComponent}
          /> */}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('UploadDocuments')}>
          <Text style={styles.signIn}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Certificates;
