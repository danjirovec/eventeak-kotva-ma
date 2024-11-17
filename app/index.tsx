import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, ScrollView, Image, Text } from 'react-native';
import { images } from '../constants';
import CustomButton from '@/components/customButton';
import { Redirect, router } from 'expo-router';
import Loader from '@/components/loader';
import { saveAsyncStorage } from '@/lib/saveAsyncStorage';
import { useGlobalStore } from '@/context/globalProvider';
import 'react-native-reanimated';
import useNetworkStatus from '@/components/network';

const App = () => {
  const { onboarding, isLoading } = useGlobalStore(state => ({
    onboarding: state.onboarding,
    isLoading: state.isLoading,
  }));

  if (onboarding) return <Redirect href="/sign-in" />;

  return (
    <SafeAreaView className="bg-gray-100 h-full">
      {!isLoading ? (
        <ScrollView
          contentContainerStyle={{
            height: '100%',
          }}>
          <View
            style={{ rowGap: 90 }}
            className="w-full flex justify-center items-center h-full px-4">
            <View
              style={{ rowGap: 20 }}
              className="w-full flex justify-center items-center px-4">
              <Image
                source={images.logo}
                className="w-[250px] h-[125px]"
                resizeMode="contain"
              />

              <Image
                source={images.cards}
                className="max-w-[340px] w-full h-[298px]"
                resizeMode="contain"
              />
            </View>

            <CustomButton
              title="Continue with email"
              handlePress={() => {
                saveAsyncStorage(true);
                router.replace('/sign-in');
              }}
              containerStyles="w-80 mt-10 bg-white border-2 border-primary"
              textStyles="text-primary"
            />
          </View>
        </ScrollView>
      ) : (
        <Loader />
      )}

      <StatusBar backgroundColor="#f7f7f7" style="dark" />
    </SafeAreaView>
  );
};

export default App;
