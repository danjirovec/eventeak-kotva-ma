import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, Image } from 'react-native';
import { images } from '../constants';
import CustomButton from '@/components/customButton';
import { Redirect, router } from 'expo-router';
import Loader from '@/components/loader';
import { saveAsyncStorage } from '@/lib/saveAsyncStorage';
import { useGlobalStore } from '@/context/globalProvider';

const App = () => {
  const { onboarding, isLoading } = useGlobalStore(state => ({
    onboarding: state.onboarding,
    isLoading: state.isLoading,
  }));

  if (onboarding) return <Redirect href="/sign-in" />;

  return (
    <SafeAreaView className="bg-white h-full">
      {!isLoading ? (
        <ScrollView
          contentContainerStyle={{
            height: '100%',
          }}>
          <View className="w-full flex justify-center items-center h-full px-4">
            <Image
              source={images.logo}
              className="w-[130px] h-[84px]"
              resizeMode="contain"
            />

            <Image
              source={images.cards}
              className="max-w-[380px] w-full h-[298px]"
              resizeMode="contain"
            />

            <View className="relative mt-5">
              <Text className="text-3xl text-black font-rbold text-center">
                Discover Endless{'\n'}
                Possibilities with{' '}
                <Text className="text-secondary-200">Aora</Text>
              </Text>

              <Image
                source={images.path}
                className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
                resizeMode="contain"
              />
            </View>

            <CustomButton
              title="Continue with email"
              handlePress={() => {
                saveAsyncStorage(true);
                router.replace('/sign-in');
              }}
              containerStyles="w-80 mt-10"
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
