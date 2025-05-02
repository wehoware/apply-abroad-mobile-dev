import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../services/ResponsiveUIHelpers';
import AntDesign from 'react-native-vector-icons/AntDesign';
import resources from '../resources';
import {SubHeader} from '../redux/types';
const SubHeaderComponent = ({
  countryImage,
  name,
  cap,
  goBack,
  countryChange,
}: SubHeader) => {
  const styles = StyleSheet.create({
    main: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: hp('2%'),
      height: hp('5%'),
    },
    back: {
      flexDirection: 'row',
      width: wp('100'),
      alignSelf: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },
    headerText: {
      fontSize: hp('2.6%'),
      fontWeight: '600',
      // fontFamily: resources.fonts.Aregular,
      fontFamily: resources.fonts.Amedium,
      color: resources.colors.black,
    },
  });
  return (
    <View style={styles.main}>
      <View style={styles.back}>
        <TouchableOpacity onPress={() => goBack()} style={{width: wp('15%')}}>
          <AntDesign
            name={'left'}
            size={20}
            color={resources.colors.black}
            style={{
              width: wp('8%'),
              marginStart: hp('3%'),
            }}
          />
        </TouchableOpacity>

        {name ? (
          <Text style={styles.headerText}>{name}</Text>
        ) : (
          <Image
            source={cap}
            style={{height: hp('5%'), width: wp('10%')}}
            resizeMode="contain"
          />
        )}
      </View>

      {countryImage ? (
        <TouchableOpacity onPress={() => countryChange()}>
          <Image
            source={{uri: countryImage}}
            style={{height: hp('5%'), width: wp('10%'), marginRight: hp('5%')}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default SubHeaderComponent;
