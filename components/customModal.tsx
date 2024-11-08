import { View, Modal, Text } from 'react-native';
import React from 'react';
import { Href, router } from 'expo-router';
import CustomButton from './customButton';

const CustomModal = ({
  text,
  redirectTo,
  visible,
  setVisible,
}: {
  text: { title: string; description?: string };
  redirectTo?: Href;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(!visible);
      }}>
      <View
        className="flex my-auto justify-center items-center w-full h-full"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
        <View className="flex justify-center items-center w-9/12 h-fit p-5 bg-white rounded-lg">
          <Text className="font-rmedium text-black text-xl">{text.title}</Text>
          {text.description ? (
            <Text className="text-base font-rregular mt-5">
              {text.description}
            </Text>
          ) : null}
          <CustomButton
            title="Ok"
            handlePress={() => {
              setVisible(!visible);
              if (redirectTo) {
                router.replace(redirectTo);
              }
            }}
            textStyles="color-primary"
            containerStyles="w-32 mt-5 bg-white border-primary border-2"
          />
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
