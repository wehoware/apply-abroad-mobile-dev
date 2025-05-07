/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {Image, View} from 'react-native';
import {LoaderComponentProps, NodataProps} from '../types';
import resources from '../resources';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
} from '../services/ResponsiveUIHelpers';
const NoDataComponent: React.FC<NodataProps> = props => {
  return (
    <View
      style={{
        width: wp('90%'),
      }}>
      <Image
        source={resources.images.Nodata}
        resizeMode="contain"
        style={{
          height: props.height,
          width: props.width,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}
      />
    </View>
  );
};

export default NoDataComponent;
