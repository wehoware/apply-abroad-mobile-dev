/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import resources from '../../resources';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../services/ResponsiveUIHelpers';
import {useNavigation} from '@react-navigation/native';
import {stackProps} from '../../navigation/types';
import {useAppDispatch} from '../../hooks/redux_hooks';
import StarRating from 'react-native-star-rating-widget';

const CheckOut = () => {
  const navigation = useNavigation<stackProps>();
  const dispatch = useAppDispatch();
  const [rating, setRating] = useState(3);
  const [redeem, setRedeem] = useState<any>('');
  const [redeemAmount, setRedeemAmount] = useState<any>(0);
  const [amount, setAmount] = useState<any>(100.0);
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
    box: {
      height: hp('16%'),
      width: wp('90%'),
      borderRadius: 12,
      marginStart: hp('1%'),
      flexDirection: 'row',
      padding: 10,
      borderColor: resources.colors.ash,
      borderWidth: 1,
    },
    collegeText: {
      fontSize: hp('1.6%'),
      color: resources.colors.primary,
      fontWeight: '600',
      fontFamily: resources.fonts.medium,
      width: wp('30%'),
    },
    courseText: {
      fontSize: hp('1.8%'),
      color: resources.colors.black,
      fontWeight: '600',
      fontFamily: resources.fonts.medium,
      width: wp('60%'),
    },
    availableText: {
      fontSize: hp('1.5%'),
      color: resources.colors.green,
      fontWeight: '700',
      fontFamily: resources.fonts.medium,
      marginStart: hp('18%'),
      marginTop: hp('2%'),
    },
    redeemButton: {
      height: hp('6%'),
      width: wp('25%'),
      backgroundColor: resources.colors.primary,
      marginStart: hp('3%'),
      borderRadius: 5,
      justifyContent: 'center',
    },
    redeemText: {
      color: resources.colors.white,
      textAlign: 'center',
      fontFamily: resources.fonts.medium,
      fontSize: hp('1.8%'),
      fontWeight: '600',
    },
    amountText: {
      width: wp('70%'),
      fontFamily: resources.fonts.regular,
      fontSize: hp('1.7%'),
      color: resources.colors.black,
      fontWeight: '400',
    },
    numberText: {
      color: resources.colors.red,
      fontSize: hp('2%'),
      fontWeight: '600',
      fontFamily: resources.fonts.bold,
      right: hp('5%'),
      position: 'absolute',
    },
    line: {
      marginStart: hp('1%'),
      width: wp('90%'),
      borderColor: resources.colors.ash,
      borderWidth: 1,
      marginTop: hp('2%'),
    },
    row: {flexDirection: 'row', marginStart: hp('1%'), marginTop: hp('1%')},
    checkoutButton: {
      height: hp('6%'),
      width: wp('90%'),
      backgroundColor: resources.colors.primary,
      marginStart: hp('1%'),
      borderRadius: 5,
      justifyContent: 'center',
      marginTop: hp('4%'),
    },
    checkoutText: {
      textAlign: 'center',
      color: resources.colors.white,
      fontSize: hp('1.8%'),
      fontWeight: '600',
      fontFamily: resources.fonts.medium,
    },
  });
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
        <Text style={styles.headerText}>Checkout</Text>
      </TouchableOpacity>
      <View style={styles.box}>
        <Image
          source={resources.images.College1}
          style={{height: hp('13%'), width: wp('30%')}}
          resizeMode="cover"
        />
        <View style={{marginStart: hp('2%')}}>
          <StarRating
            rating={rating}
            color={resources.colors.orange}
            onChange={() => {
              console.log('mmm');
            }}
            starSize={15}
            maxStars={5}
            style={{marginStart: hp('10%')}}
          />
          <Text style={styles.collegeText}>Lamton Colleges</Text>
          <Text style={styles.courseText}>
            Web Development – Front-End Design (Postgraduate) (G418)
          </Text>
          <Text style={styles.availableText}>Available</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginStart: hp('1%'),
          marginTop: hp('40% '),
        }}>
        <TextInput
          style={{
            height: hp('6%'),
            width: wp('60%'),
            borderColor: resources.colors.ash,
            borderWidth: 1,
            color: resources.colors.ash,
            borderRadius: 5,
          }}
          value={'Promo Code'}
          onChangeText={val => setRedeem(val)}
          placeholder="Promo Code"
        />
        <TouchableOpacity style={styles.redeemButton}>
          <Text style={styles.redeemText}>Redeem</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Text style={styles.amountText}>Sub Total :</Text>
        <Text style={[styles.numberText, {color: resources.colors.black}]}>
          ${amount}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.amountText}>Promo Code :</Text>
        <Text style={styles.numberText}>-${redeemAmount}</Text>
      </View>
      <View style={styles.line} />
      <View style={styles.row}>
        <Text style={styles.amountText}>Total :</Text>
        <Text style={[styles.numberText, {color: resources.colors.primary}]}>
          ${amount - redeemAmount}
        </Text>
      </View>
      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckOut;
