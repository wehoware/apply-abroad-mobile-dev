/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  Switch,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import resources from '../../resources';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../services/ResponsiveUIHelpers';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {stackProps} from '../../navigation/types';
import {useAppDispatch} from '../../hooks/redux_hooks';

const Notifications = () => {
  const navigation = useNavigation<stackProps>();
  const dispatch = useAppDispatch();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name={'left'}
            size={20}
            color={resources.colors.black}
            style={{width: wp('30%')}}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notification</Text>
      </View>

      <View style={styles.box}>
        <Ionicons
          name={'notifications-outline'}
          size={20}
          color={resources.colors.black}
          style={{
            width: wp('8%'),
            marginLeft: hp('2%'),
          }}
        />
        <Text style={styles.text}>Push Notification</Text>
        <Switch
          trackColor={{false: resources.colors.ash, true: resources.colors.ash}}
          thumbColor={
            isEnabled
              ? resources.colors.green_toaster
              : resources.colors.green_toaster
          }
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={styles.box}>
        <Ionicons
          name={'notifications-outline'}
          size={20}
          color={resources.colors.black}
          style={{
            width: wp('8%'),
            marginLeft: hp('2%'),
          }}
        />
        <Text style={styles.text}>Personalize Notification</Text>
        <AntDesign
          name={'right'}
          size={20}
          color={resources.colors.black}
          style={{
            width: wp('8%'),
            marginLeft: hp('2%'),
          }}
        />
      </View>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  main: {
    flex: 1,
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
    fontFamily: resources.fonts.Aregular,
  },

  nameText: {
    textAlign: 'center',
    fontFamily: resources.fonts.AsemiBold,
    fontSize: hp('2.5%'),
    color: resources.colors.black,
    fontWeight: '600',
  },
  mailText: {
    textAlign: 'center',
    fontFamily: resources.fonts.Aregular,
    fontSize: hp('2%'),
    color: resources.colors.ash,
    fontWeight: '400',
  },
  themeText: {
    marginStart: hp('2%'),
    color: resources.colors.light_green1,
    fontSize: hp('2%'),
    fontWeight: '600',
    fontFamily: resources.fonts.Abold,
    marginTop: hp('2%'),
  },
  box: {
    marginStart: hp('2%'),
    height: hp('6%'),
    borderColor: resources.colors.ash,
    borderWidth: 1,
    borderRadius: 10,
    width: wp('90%'),
    marginTop: hp('1.5%'),
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  text: {
    width: wp('60%'),
    fontSize: hp('1.8%'),
    fontFamily: resources.fonts.Amedium,
    fontWeight: '600',
    color: resources.colors.black,
  },
});
