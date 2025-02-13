/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Toast from 'react-native-toast-message';

export const Toaster = {
  success: (data: string, text?: string) =>
    Toast.show({
      type: 'success',
      text1: data,
      text2: text,
    }),

  error: (data: string, text?: string) =>
    Toast.show({
      type: 'error',
      text1: data,
      text2: text,
    }),

  info: (data: string, text?: string) =>
    Toast.show({
      type: 'info',
      text1: data,
      text2: text,
    }),
};
