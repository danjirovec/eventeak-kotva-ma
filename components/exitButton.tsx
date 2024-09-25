import React from 'react';
import CustomButton from './customButton';
import { icons } from '@/constants';
import { router } from 'expo-router';

const ExitButton = ({
  setVisible,
}: {
  setVisible: (visible: boolean) => void;
}) => {
  return (
    <CustomButton
      icon={icons.cross}
      iconColor="#225F78"
      title="Back"
      handlePress={() => {
        setVisible(false);
      }}
      containerStyles="min-h-[40px] w-10 bg-white border-primary border-2"
    />
  );
};

export default ExitButton;
