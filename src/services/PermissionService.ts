import { PermissionsAndroid } from "react-native";
import { PERMISSION_VALUE } from "../types";
import { returnPermissionString } from "./Helpers";

export const requestCameraPermission = async () => {
  var granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.CAMERA,
    {
      title: "iTopup Need Camera Permission",
      message: "Please grant camera permission to change profile picture",
      buttonPositive: "Grant",
      buttonNegative: "Cancel",
      buttonNeutral: "Ask me later",
    }
  );

  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  } else {
    return false;
  }
};

export const requestPhotoLibraryPermission = async () => {
  var granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
    {
      title: "iTopup Need Gallery Permission",
      message: "Please grant gallery permission to change profile picture",
      buttonPositive: "Grant",
      buttonNegative: "Cancel",
      buttonNeutral: "Ask me later",
    }
  );

  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  } else {
    return false;
  }
};

export const checkPermissionStatus = async (
  permissionValue: PERMISSION_VALUE
) => {
  let permission = returnPermissionString(permissionValue);

  if (typeof permission !== "string") {
    return await PermissionsAndroid.check(permission);
  } else {
    return Promise.resolve(false);
  }
};
