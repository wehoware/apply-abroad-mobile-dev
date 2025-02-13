import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getDataFromAsync(key: string): Promise<any | null> {
  let res = await AsyncStorage.getItem(key);

  return res !== null ? JSON.parse(res) : null;
}

export async function setDataToAsync(key: string, data: any) {
  let response = await AsyncStorage.setItem(key, JSON.stringify(data));

  return response;
}

export async function removeDataFromAsync(key: string) {
  let response = await AsyncStorage.removeItem(key);

  return response;
}
