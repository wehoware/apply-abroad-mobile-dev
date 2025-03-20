/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import React, {useState} from 'react';
import HeaderComponent from '../../components/HeaderComponent';
import resources from '../../resources';
import {useAppDispatch, useAppSelector} from '../../hooks/redux_hooks';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../services/ResponsiveUIHelpers';
import {useNavigation} from '@react-navigation/native';
const Chat = () => {
  const {userData} = useAppSelector(state => state.auth);
  const [chat, setChat] = useState<any>([]);
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const styles = StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: resources.colors.white,
    },
    header: {height: hp('8%'), marginStart: hp('2%'), width: wp('100')},
    emptyHead: {
      alignItems: 'center',
      marginTop: hp('40%'),
    },
    emptyText: {
      fontSize: hp('2%'),
      color: resources.colors.black,
      textAlign: 'center',
    },
  });
  const countryChange = () => {
    navigation.navigate('CountryChange');
  };
  const _renderChat = ({item}: any) => {
    return (
      <View>
        <Image source={{uri: item?.mainImage}} />
        <Text>{item?.specialization}</Text>
      </View>
    );
  };

  const ListEmptyComponent = () => {
    return (
      <View style={styles.emptyHead}>
        <Text style={styles.emptyText}>No chat found</Text>
      </View>
    );
  };
  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <HeaderComponent
          countryImage={userData?.Country?.flagImage}
          name={''}
          cap={resources.images.cap}
          countryChange={() => countryChange()}
        />
      </View>
      <FlatList
        data={chat}
        renderItem={_renderChat}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
};

export default Chat;
