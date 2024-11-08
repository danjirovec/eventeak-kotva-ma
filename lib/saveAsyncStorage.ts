import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveAsyncStorage = async (value: boolean) => {
  await AsyncStorage.setItem('onboarding', value ? '1' : '0');
};
