import {UserState} from '../redux/types';
import dayjs from 'dayjs';
import {PermissionsAndroid} from 'react-native';
import {PERMISSION_VALUE} from '../types/index';
import {Image} from 'react-native-compressor';

export const formatUserData = (user: any): UserState => {
  var data = {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    role: user?.role,
    loginMethod: user?.loginMethod,
    phoneNumber: user?.phoneNumber,
    profilePhoto: user?.profilePhoto,
    socialLogins: user.socialLogins,
    status: user.status,
    accessToken: user.accessToken,
    refreshToken: user.refreshToken,
    intrestedCountry: user?.intrestedCountry,
    interestedFieldsIds: user?.interestedFieldsIds,
    interestedCountryId: user?.interestedCountryId,
    StudentEducation: user?.StudentEducation,
  };

  return data;
};

export const getMonthDifference = (date1: Date, date2: Date) => {
  // Calculate the difference in years
  const yearsDiff = date2.getFullYear() - date1.getFullYear();

  // Calculate the difference in months
  const monthsDiff = date2.getMonth() - date1.getMonth();

  // Calculate the total difference in months
  const totalMonthsDiff = yearsDiff * 12 + monthsDiff;

  return totalMonthsDiff;
};

export const generateMonthsCalendar = (months: any) => {
  let MONTHS = months;

  let date1 = new Date(MONTHS[0].name);
  let date2 = new Date();

  const totalMonthsDiff = getMonthDifference(date1, date2);

  let array = Array(totalMonthsDiff + 1).fill(1);

  array.map((item, index) => {
    let obj: any = {};

    Object.assign(obj, {
      id: index + 1,
      name: dayjs(date1)
        .set('month', date1.getMonth() + index)
        .set('date', 1)
        .format('YYYY-MM-DD'),
      selected: false,
    });

    MONTHS.push(obj);
  });

  let mon = MONTHS.slice(1);

  return mon.reverse();
};

export const returnPermissionString = (value: PERMISSION_VALUE) => {
  switch (value) {
    case 'Camera':
      return PermissionsAndroid.PERMISSIONS.CAMERA;
    case 'Gallery':
      return PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES;
    default:
      return '';
  }
};

export const imageCompressor = async (uri: string) => {
  return await Image.compress(uri);
};
