import { View, Modal, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomButton from './customButton';
import { Membership } from '@/graphql/schema.types';
import { useGlobalStore } from '@/context/globalProvider';
import { router } from 'expo-router';

const MembershipExtendModal = ({
  membership,
  visible,
  setVisible,
}: {
  membership: Membership | undefined;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}) => {
  const { currency } = useGlobalStore(state => ({
    currency: state.currency,
  }));
  const [expiryDate, setExpiryDate] = useState<string>();

  useEffect(() => {
    let newDate = new Date();
    if (membership?.expiryDate) {
      newDate = new Date(membership?.expiryDate);
    }
    newDate.setFullYear(newDate.getFullYear() + 1);
    const formatedDate = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour12: false,
    }).format(newDate);
    setExpiryDate(formatedDate);
  }, []);

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
          <View
            className="justify-center items-start w-full"
            style={{ rowGap: 2.5 }}>
            <View className="flex-row justify-between items-center">
              <Text className="text-base text-center align-middle font-rregular">
                {`Type: `}
              </Text>
              <Text className="text-base text-center align-middle font-rmedium">
                {`${membership?.membershipType.name}`}
              </Text>
            </View>
            <View className="flex-row justify-between items-center mt-1">
              <Text className="text-base text-center align-middle font-rregular">
                {`Price: `}
              </Text>
              <Text className="text-base text-center align-middle font-rmedium">
                {`${membership?.membershipType.price} ${currency}`}
              </Text>
            </View>
            <View className="flex-row justify-start items-start mt-1">
              <Text className="text-base text-start align-middle font-rregular">
                {`Points / ticket: `}
              </Text>
              <Text className="text-base text-center align-middle font-rmedium">
                {`${membership?.membershipType.pointsPerTicket}`}
              </Text>
            </View>
            {membership?.membershipType.description ? (
              <View className="flex-row justify-start items-start mt-1">
                <Text className="text-base text-start align-middle font-rregular">
                  {`Description: `}
                </Text>
                <Text className="text-base text-center align-middle font-rmedium">
                  {`${membership?.membershipType.description}`}
                </Text>
              </View>
            ) : null}
            <View className="flex-row justify-start items-start mt-1">
              <Text className="text-base text-start align-middle font-rregular">
                {`New Expiry Date: `}
              </Text>
              <Text className="text-base text-center align-middle font-rmedium">
                {`${expiryDate}`}
              </Text>
            </View>
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
                router.push({
                  pathname: '/(tabs)/profile/payment',
                  params: {
                    membership: JSON.stringify(membership?.membershipType),
                    paymentType: 'Membership',
                    extend: JSON.stringify(membership),
                  },
                });
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
