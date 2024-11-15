import { client } from '@/apollo/client';
import GlobalStore, { useGlobalStore } from '@/context/globalProvider';
import { ApolloProvider } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const { setOnboarding } = useGlobalStore(state => ({
    setOnboarding: state.setOnboarding,
  }));

  const [loaded, error] = useFonts({
    'Roboto-Black': require('../assets/fonts/Roboto-Black.ttf'),
    'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
    'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Thin': require('../assets/fonts/Roboto-Thin.ttf'),
  });

  useEffect(() => {
    const set = async () => {
      const onboarding = await AsyncStorage.getItem('onboarding');
      if (onboarding) {
        setOnboarding(Boolean(onboarding));
      }
    };
    set();

    if (error) throw error;

    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded) {
    return null;
  }

  if (!loaded && error) {
    return null;
  }

  return (
    <>
      <GlobalStore>
        <ApolloProvider client={client}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          </Stack>
          <StatusBar backgroundColor="#f7f7f7" style="dark" />
        </ApolloProvider>
      </GlobalStore>
    </>
  );
};

export default RootLayout;
