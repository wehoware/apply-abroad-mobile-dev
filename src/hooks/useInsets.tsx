/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {View, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const useInsets = () => {
  const insets = useSafeAreaInsets();

  const {bottom, left, right, top} = insets;

  return {
    SAFEAREA_TOP: top,
    SAFEAREA_BOTTOM: bottom,
    SAFEAREA_LEFT: left,
    SAFEAREA_RIGHT: right,
  };
};

export default useInsets;
