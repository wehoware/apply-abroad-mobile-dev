import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../services/ResponsiveUIHelpers';
import AntDesign from 'react-native-vector-icons/AntDesign';
import resources from '../resources';
const SubHeaderComponent = ({countryImage, name, cap, goBack}: any) => {
  const styles = StyleSheet.create({
    main: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: hp('2%'),
      height: hp('5%'),
    },
    back: {flexDirection: 'row'},
    headerText: {
      fontSize: hp('2.8%'),
      fontWeight: '700',
      // fontFamily: resources.fonts.Aregular,
      fontFamily: resources.fonts.Amedium,
      color: '#141B13',
      width: wp('58%'),
    },
  });
  return (
    <View style={styles.main}>
      <View style={styles.back}>
        <TouchableOpacity onPress={() => goBack()} style={{width: wp('25%')}}>
          <AntDesign
            name={'left'}
            size={20}
            color={resources.colors.black}
            style={{
              width: wp('8%'),
              marginTop: hp('0.6%'),
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
        <Image
          source={{uri: countryImage}}
          style={{height: hp('5%'), width: wp('10%'), marginRight: hp('5%')}}
          resizeMode="contain"
        />
      ) : null}
    </View>
  );
};

export default SubHeaderComponent;
