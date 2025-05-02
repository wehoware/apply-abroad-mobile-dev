/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
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
import AntDesign from 'react-native-vector-icons/AntDesign';

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
];

const UploadDocuments = () => {
  const navigation = useNavigation<stackProps>();
  const dispatch = useAppDispatch();
  const {theme} = useAppSelector(state => state.common);

  const [certificates, setCertificates] = useState<any>(certificateList);

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
      fontWeight: '900',
      fontFamily: resources.fonts.Abold,
      fontSize: hp('3%'),
    },
    box: {
      height: hp('83%'),
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
      paddingTop: hp('3%'),
      paddingStart: hp('3%'),
    },
    start: {marginStart: 20},

    signIn: {
      color: resources.colors.white,
      marginTop: 10,
      fontWeight: '700',
      textAlign: 'center',
      fontSize: hp('2.0%'),
      fontFamily: resources.fonts.Abold,
    },
    button: {
      marginStart: 20,
      height: hp('6%'),
      width: wp('85%'),
      backgroundColor: resources.colors.primary,
      marginTop: hp('5%'),
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
    frame: {
      height: hp('15%'),
      width: wp('85%'),
      borderColor: resources.colors.blue,
      borderWidth: 2,
      marginTop: hp('4%'),
      marginStart: hp('2%'),
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderStyle: 'dashed',
    },
    upladText: {
      textAlign: 'center',
      color: resources.colors.blue,
      fontWeight: '700',
      fontSize: hp('1.8%'),
      fontFamily: resources.fonts.bold,
      marginTop: hp('1%'),
    },
    uploadButton: {
      marginStart: 20,
      height: hp('6%'),
      width: wp('85%'),
      backgroundColor: resources.colors.primary,
      marginTop: hp('1%'),
      borderRadius: 5,
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

  return (
    <View style={styles.main}>
      <CustomStatusbar
        backgroundColor={theme.primary}
        barStyle={'light-content'}
      />
      <TouchableOpacity style={styles.header}>
        <Text style={styles.headerText}>Upload Documents </Text>
      </TouchableOpacity>
      <View style={styles.box}>
        <View style={styles.frame}>
          <AntDesign name="plus" color={resources.colors.blue} size={25} />
        </View>
        <Text style={styles.upladText}>Upload Files here</Text>
        <TouchableOpacity style={styles.uploadButton}>
          <Text style={styles.signIn}>Upload</Text>
        </TouchableOpacity>
        <View style={{marginTop: hp('4%')}}>
          <FlatList
            data={certificates}
            renderItem={item => _renderItem(item)}
            ItemSeparatorComponent={ItemSeparatorComponent}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Category')}>
          <Text style={styles.signIn}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UploadDocuments;
