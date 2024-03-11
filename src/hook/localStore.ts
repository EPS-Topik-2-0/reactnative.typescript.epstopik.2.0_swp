import AsyncStorage from "@react-native-async-storage/async-storage";

export const containsKeyLocalStore = async (key: string) => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys.includes(key);
  } catch (e: any) {
    console.log(e.message);
  }
};

export const getLocalStore = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      const data = JSON.parse(value);
      return data;
    }
  } catch (e: any) {
    console.log(e.message);
  }
};

export const setLocalStore = async (key: string, value: any) => {
  try {
    const stringValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, stringValue);
    return true;
  } catch (e: any) {
    console.log(e.message);
  }
};

export const removeLocalStore = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e: any) {
    console.log(e.message);
  }
};

export const allLocalStore = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys;
  } catch (e: any) {
    console.log(e.message);
  }
};
