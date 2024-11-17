import React from 'react';
import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Loader from '@/components/loader';
import { useGlobalStore } from '@/context/globalProvider';
import useNetworkStatus from '@/components/network';

const AuthLaylout = () => {
  const isConnected = useNetworkStatus();
  if (!isConnected) {
    return <Redirect href={'/connection'} />;
  }
  const { isLoading, isLogged } = useGlobalStore(state => ({
    isLoading: state.isLoading,
    isLogged: state.isLogged,
  }));

  if (!isLoading && isLogged) return <Redirect href="/(tabs)/program" />;

  return (
    <>
      {!isLoading ? (
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="sign-in" options={{ headerShown: false }} />
          <Stack.Screen name="sign-up" options={{ headerShown: false }} />
          <Stack.Screen
            name="forgot-password"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="reset-password"
            options={{ headerShown: false }}
          />
        </Stack>
      ) : (
        <Loader />
      )}

      <StatusBar backgroundColor="#f7f7f7" style="dark" />
    </>
  );
};

export default AuthLaylout;
