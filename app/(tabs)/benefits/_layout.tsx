import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const BenefitLayout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>

      <StatusBar backgroundColor="#f7f7f7" style="dark" />
    </>
  );
};

export default BenefitLayout;
