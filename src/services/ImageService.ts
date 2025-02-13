import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {imageCompressor} from './Helpers';

export const ImageService = {
  launchCamera: async () => {
    var result = await launchCamera({
      mediaType: 'photo',
      quality: 1,
    });

    if (result.didCancel) {
      return Promise.reject('User Cancelled Camera');
    } else if (result.errorCode) {
      return Promise.reject(result.errorCode);
    } else if (result.errorMessage) {
      return Promise.reject(result.errorMessage);
    } else {
      var uri =
        result.assets !== undefined
          ? result.assets[0].uri !== undefined
            ? result.assets[0].uri
            : ''
          : '';

      var imgName =
        result.assets !== undefined
          ? result.assets[0].fileName !== undefined
            ? result.assets[0].fileName
            : ''
          : '';

      var imgType =
        result.assets !== undefined
          ? result.assets[0].type !== undefined
            ? result.assets[0].type
            : ''
          : '';

      var URL = await imageCompressor(uri);

      return Promise.resolve({url: URL, name: imgName, type: imgType});
    }
  },
  launchImageLibrary: async () => {
    var result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 1,
    });

    if (result.didCancel) {
      return Promise.reject('User Cancelled Camera');
    } else if (result.errorCode) {
      return Promise.reject(result.errorCode);
    } else if (result.errorMessage) {
      return Promise.reject(result.errorMessage);
    } else {
      var uri =
        result.assets !== undefined
          ? result.assets[0].uri !== undefined
            ? result.assets[0].uri
            : ''
          : '';

      var imgName =
        result.assets !== undefined
          ? result.assets[0].fileName !== undefined
            ? result.assets[0].fileName
            : ''
          : '';

      var imgType =
        result.assets !== undefined
          ? result.assets[0].type !== undefined
            ? result.assets[0].type
            : ''
          : '';

      var URL = await imageCompressor(uri);

      return Promise.resolve({url: URL, name: imgName, type: imgType});
    }
  },
};
