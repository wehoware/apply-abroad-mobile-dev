/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import resources from '../../resources';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
} from '../../services/ResponsiveUIHelpers';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {stackProps} from '../../navigation/types';
import {useAppDispatch, useAppSelector} from '../../hooks/redux_hooks';
import StarRating from 'react-native-star-rating-widget';
import {
  applyCoursesFetchRequest,
  reviewFetchRequest,
} from '../../redux/slices/appSlice';
import {
  StripeProvider,
  useStripe,
  CardField,
} from '@stripe/stripe-react-native';
import axios from 'axios';
import {ApiEndPoints} from '../../API/ApiEndPoints';
import {getDataFromAsync} from '../../services/AsyncService';
import {Toaster} from '../../services/Toaster';
import useRedirect from '../../hooks/useRedirect';
const CheckOut = () => {
  const navigation = useNavigation<stackProps>();
  const dispatch = useAppDispatch();
  const {selectedCourse, applyCourses} = useAppSelector(state => state.app);
  const [orientation, setOrientation] = useState('');
  const [redeem, setRedeem] = useState<any>('');
  const [redeemAmount, setRedeemAmount] = useState<any>(0);
  const [amount, setAmount] = useState<any>(100.0);
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const [modal, setModal] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);
  const [ratingText, setRatingText] = useState<string>('');
  const [applicationNumber, setApplicationNumber] = useState<any>();
  const {redirect} = useAppSelector(state => state.auth);
  useRedirect(redirect, 'replace');
  useEffect(() => {
    setIsMounted(true);
    createApplication();
    return () => setIsMounted(false);
  }, []);
  useFocusEffect(
    useCallback(() => {
      lor(setOrientation);
    }, []),
  );
  const createApplication = async () => {
    setLoading(true);
    try {
      const userToken = await getDataFromAsync(
        resources.AsyncConstants.authToken,
      );
      // Call backend API to get clientSecret
      const response = await axios.put(
        `${resources.config.baseURL}${ApiEndPoints.courseApply}${selectedCourse?.id}`,
        {},
        {headers: {Authorization: `Bearer ${userToken}`}},
      );
      console.log('response.data.data', response?.data?.data?.application);

      setApplicationNumber(
        response?.data?.data?.application?.applicationNumber,
      );

      if (!response?.data?.success || !response?.data?.data?.clientSecret) {
        console.error('❌ No clientSecret received');
        Toaster.error('No payment details received from server.');
        return;
      }
      const clientsecret = response?.data?.data?.clientSecret;
      console.log('✅ clientSecret received:', clientsecret);
      setClientSecret(clientsecret); // Set clientSecret state
      // Initialize Stripe Payment Sheet
      const {error} = await initPaymentSheet({
        paymentIntentClientSecret: clientsecret,
        merchantDisplayName: 'EduApp',
      });

      if (error) {
        console.error('❌ initPaymentSheet Error:', error);
        Alert.alert('Error', error.message);
      } else {
        console.log('✅ Payment Sheet initialized successfully');
      }
    } catch (error: any) {
      console.error('❌ API Call Error:', error);
      Toaster.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      console.log('=========');

      setLoading(false);
    }
  };

  const openPaymentSheet = async () => {
    const {error} = await presentPaymentSheet();
    if (error) {
      console.error('❌ Error while presenting payment sheet:', error);
      Toaster.error(error.message);
    } else {
      console.log('✅ Payment completed successfully!');
      Toaster.success('Your payment was successful!');
      setModal(!modal);
    }
  };
  const skip = () => {
    setModal(!modal);
    navigation.navigate('Home');
  };

  const submit = () => {
    setModal(!modal);
    const data = {
      applicationNumber: applicationNumber,
      typeId: selectedCourse?.id,
      type: 'COURSE',
      rating: rating,
      review: ratingText,
    };
    console.log('data', data);
    dispatch(reviewFetchRequest(data));
  };
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
      // height: hp('18%'),
      width: wp('90%'),
      borderRadius: 12,
      marginStart: hp('1%'),
      flexDirection: 'row',
      padding: 8,
      borderColor: resources.colors.ash,
      borderWidth: 1,
    },
    collegeText: {
      fontSize: hp('1.8%'),
      color: resources.colors.green,
      fontWeight: '600',
      fontFamily: resources.fonts.Abold,
      width: wp('50%'),
      marginTop: hp('1%'),
    },
    courseText: {
      fontSize: hp('2%'),
      color: resources.colors.black,
      fontWeight: '600',
      fontFamily: resources.fonts.Abold,
      width: wp('60%'),
      marginTop: hp('0.5%'),
    },
    availableText: {
      fontSize: hp('1.5%'),
      color: resources.colors.green,
      fontWeight: '700',
      fontFamily: resources.fonts.Abold,
      // marginStart: hp('22%'),
      marginTop: hp('1%'),
      alignSelf: 'flex-end',
      marginRight: hp('2%'),
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
      fontFamily: resources.fonts.medium,
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
      width: wp('92%'),
      backgroundColor: resources.colors.primary,
      marginStart: hp('1%'),
      borderRadius: 5,
      justifyContent: 'center',
      marginTop: hp('4%'),
    },
    checkoutText: {
      textAlign: 'center',
      color: resources.colors.white,
      fontSize: hp('2%'),
      fontWeight: '600',
      fontFamily: resources.fonts.AsemiBold,
    },
    imageStyle: {height: hp('15%'), width: wp('26%'), borderRadius: 5},
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      height: hp('35%'),
      width: wp('90%'),
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalText: {
      marginTop: hp('2%'),
      textAlign: 'center',
      fontSize: hp('2.2%'),
      fontWeight: '600',
      fontFamily: resources.fonts.AsemiBold,
      color: resources.colors.ash,
    },
    button: {
      height: hp('6%'),
      width: wp('40%'),
      backgroundColor: resources.colors.ash,
      marginTop: hp('2%'),
      marginStart: hp('2%'),
      borderRadius: 10,
      justifyContent: 'center',
    },
  });

  return (
    <StripeProvider publishableKey={resources.config.stripePublishableKey}>
      <View style={styles.main}>
        <View style={styles.header}>
          <AntDesign
            name={'left'}
            size={20}
            color={resources.colors.black}
            onPress={() => navigation.goBack()}
            style={{width: wp('30%')}}
          />
          <Text style={styles.headerText}>Checkout</Text>
        </View>
        <View style={styles.box}>
          <Image
            source={{uri: selectedCourse?.mainImageSquare}}
            style={styles.imageStyle}
            resizeMode="stretch"
          />
          <View style={{marginStart: hp('1.5%')}}>
            <StarRating
              rating={Math.round(selectedCourse?.rating)}
              color={resources.colors.orange}
              onChange={() => {
                console.log('mmm');
              }}
              starSize={15}
              maxStars={5}
              style={{
                alignSelf: 'flex-end',
                marginRight: hp('2%'),
              }}
              starStyle={{marginRight: 0}}
            />
            <Text style={styles.collegeText} numberOfLines={1}>
              {selectedCourse?.institution?.name}
            </Text>
            <Text style={styles.courseText} numberOfLines={1}>
              {selectedCourse?.specialization}
            </Text>
            <Text style={styles.courseText} numberOfLines={1}>
              ({selectedCourse?.educationLevel?.name}) ({selectedCourse?.code})
            </Text>
            <Text style={styles.availableText}>Available</Text>
          </View>
        </View>
        {/* Below is commented because of redeem is not available present flow /*}
        {/* <View
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
      </View> */}
        {/* <View style={styles.row}>
        <Text style={styles.amountText}>Sub Total :</Text>
        <Text style={[styles.numberText, {color: resources.colors.black}]}>
          ${amount}
        </Text>
      </View> */}
        {/* <View style={styles.row}>
        <Text style={styles.amountText}>Promo Code :</Text>
        <Text style={styles.numberText}>-${redeemAmount}</Text>
      </View>
      <View style={styles.line} /> */}
        <View style={[styles.row, {marginTop: hp('50%')}]}>
          <Text style={styles.amountText}>Total :</Text>
          <Text style={[styles.numberText, {color: resources.colors.primary}]}>
            {selectedCourse?.applicationFees
              ? '$' + selectedCourse?.applicationFees
              : 'Free'}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={async () => openPaymentSheet()}>
          {/* onPress={async () => setModal(!modal)}> */}
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(!modal);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Please submit your review:</Text>
            <StarRating
              rating={rating}
              color={resources.colors.primary}
              onChange={setRating}
              starSize={50}
              maxStars={5}
              style={{marginStart: hp('1%')}}
              starStyle={{marginRight: 0, marginTop: hp('2%')}}
            />
            <TextInput
              style={{
                height: hp('6%'),
                width: wp('80%'),
                borderColor: resources.colors.ash,
                borderWidth: 1,
                marginTop: hp('2%'),
                marginStart: hp('2%'),
                color: resources.colors.ash,
                fontSize: hp('2%'),
                borderRadius: 10,
                paddingLeft: 10,
                fontFamily: resources.fonts.Amedium,
                fontWeight: '600',
              }}
              value={ratingText}
              placeholder="Please enter review"
              placeholderTextColor={resources.colors.ash}
              onChangeText={val => setRatingText(val)}
            />
            <View style={{flexDirection: 'row', marginTop: hp('2%')}}>
              <TouchableOpacity style={styles.button} onPress={() => skip()}>
                <Text style={styles.checkoutText}>Skip</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => submit()}
                style={[
                  styles.button,
                  {backgroundColor: resources.colors.primary},
                ]}>
                <Text style={styles.checkoutText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </StripeProvider>
  );
};

export default CheckOut;
