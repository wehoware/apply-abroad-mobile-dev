import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../services/ResponsiveUIHelpers';
import resources from '../resources';
const HeaderComponent = ({countryImage, name, cap, countryChange}: any) => {
  const styles = StyleSheet.create({
    main: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: hp('2%'),
    },
    headerText: {
      fontSize: hp('2.8%'),
      fontWeight: '700',
      fontFamily: resources.fonts.Amedium,
      color: '#141B13',
    },
  });

  return (
    <View style={styles.main}>
      {name ? (
        <Text style={styles.headerText}>{name}</Text>
      ) : (
        <Image
          source={cap}
          style={{height: hp('5%'), width: wp('10%')}}
          resizeMode="contain"
        />
      )}
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

export default HeaderComponent;
