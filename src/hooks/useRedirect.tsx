/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {StackNavigatorList, stackProps} from '../navigation/types';
import {clearRedirect} from '../redux/slices/authSlice';

/**
 * @description redirect user to a route whenever redirect prop changes.
 * @param {string | null} redirect path to
 * @param {string} type type of redirection, Default is navigate
 */
const useRedirect = (
  redirect: string | null,
  type: 'replace' | 'navigate' | 'back',
  params?: any,
) => {
  const navigation: any = useNavigation<stackProps>();
  const dispatch = useDispatch();
  useEffect(() => {
    const redirectToRoute = () => {
      if (redirect && typeof redirect === 'string') {
        if (type == 'replace') {
          if (params) {
            navigation.replace(redirect, params);
          } else {
            navigation.replace(redirect);
          }
        } else if (type == 'navigate') {
          navigation.navigate(redirect);
        } else if (type == 'back') {
          navigation.pop();
        }
        console.log(redirect, 'redirect hooks');

        dispatch(clearRedirect(null));
      }
    };

    redirectToRoute();
  }, [redirect]);
};
export default useRedirect;
