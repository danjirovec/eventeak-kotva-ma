import { View, Modal, Text } from 'react-native';
import React from 'react';
import CustomButton from './customButton';

const MembershipExtendModal = ({
  user,
  visible,
  setVisible,
  extend,
}: {
  user: string;
  visible: boolean;
  extend: () => void;
  setVisible: (visible: boolean) => void;
}) => {
  return (
    <Modal
      statusBarTranslucent
      hardwareAccelerated={true}
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(!visible);
      }}>
      <View
        className="flex justify-center items-center w-full h-full"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
        <View
          className="justify-center items-center w-9/12 h-fit p-5 bg-white rounded-lg"
          style={{ rowGap: 20 }}>
          <View
            className="justify-between w-full items-center h-fit"
            style={{ rowGap: 20 }}>
            <Text className="text-xl font-rmedium">Are you sure?</Text>
          </View>
          <View style={{ columnGap: 20 }} className="flex-row justify-between">
            <CustomButton
              title="Cancel"
              handlePress={() => {
                setVisible(!visible);
              }}
              containerStyles="bg-white border-2 border-primary w-20"
              textStyles="text-primary"
            />
            <CustomButton
              title="Extend"
              handlePress={() => {
                extend();
                setVisible(!visible);
              }}
              containerStyles="w-20"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MembershipExtendModal;
