import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const ProgramLayout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="[event]" options={{ headerShown: false }} />
        <Stack.Screen name="payment" options={{ headerShown: false }} />
      </Stack>

      <StatusBar backgroundColor="#f7f7f7" style="dark" />
    </>
  );
};

export default ProgramLayout;
