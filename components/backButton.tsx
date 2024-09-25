import React from 'react';
import CustomButton from './customButton';
import { icons } from '@/constants';
import { router } from 'expo-router';

const BackButton = () => {
  return (
    <CustomButton
      icon={icons.left}
      iconColor="#225F78"
      title="Back"
      handlePress={() => {
        router.back();
      }}
      containerStyles="min-h-[40px] w-10 bg-white border-primary border-2 bg-gray-100"
    />
  );
};

export default BackButton;
