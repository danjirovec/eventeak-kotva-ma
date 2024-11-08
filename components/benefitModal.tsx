import { View, Modal, Text } from 'react-native';
import React from 'react';
import { Benefit } from '@/graphql/schema.types';
import QRCode from 'react-native-qrcode-svg';
import ExitButton from './exitButton';

const BenefitModal = ({
  showQR,
  user,
  data,
  visible,
  setVisible,
}: {
  showQR: boolean;
  user: string | null;
  data: Benefit | undefined;
  visible: boolean;
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
            <View
              className="justify-between items-center"
              style={{ rowGap: 20 }}>
              {showQR ? (
                <View>
                  <QRCode
                    value={JSON.stringify({ user: user, benefit: data?.id })}
                    size={200}
                  />
                </View>
              ) : null}
              <View className="border-red-200 " style={{ rowGap: 5 }}>
                <View className="flex-row w-full justify-between">
                  <View className="w-8/12 items-start justify-center">
                    <Text className="text-base font-rmedium text-justify align-middle">
                      {data?.name}
                    </Text>
                  </View>
                  <View className="w-4/12 items-end">
                    <Text className="text-base font-rmedium text-justify align-middle">
                      {`${data?.points} points`}
                    </Text>
                  </View>
                </View>
                <View className="w-full">
                  <Text className="text-base font-rregular text-justify align-middle">
                    {data?.description}
                  </Text>
                </View>
              </View>
            </View>
            {showQR && (
              <View className="flex-row w-full items-start">
                <Text className="text-sm align-middle text-justify font-rregular">
                  Show QR code to staff to redeem the coupon.
                </Text>
              </View>
            )}
          </View>
          <ExitButton setVisible={setVisible} />
        </View>
      </View>
    </Modal>
  );
};

export default BenefitModal;
