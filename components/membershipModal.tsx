import { View, Modal, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomButton from './customButton';
import { MembershipType } from '@/graphql/schema.types';
import { useGlobalStore } from '@/context/globalProvider';
import { router } from 'expo-router';

const MembershipModal = ({
  data,
  visible,
  setVisible,
}: {
  data: MembershipType[];
  visible: boolean;
  setVisible: (visible: boolean) => void;
}) => {
  const { currency } = useGlobalStore(state => ({
    currency: state.currency,
  }));
  const [selectedMemType, setSelectedMemType] = useState<
    MembershipType | undefined
  >();

  return (
    <Modal
      statusBarTranslucent
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(!visible);
      }}>
      <View
        className="flex my-auto justify-center items-center w-full h-full"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
        <View className="justify-center items-center w-9/12 h-fit p-5 bg-white rounded-lg">
          <View
            className="justify-between items-start w-full"
            style={{ rowGap: 40 }}>
            <View style={{ rowGap: 15 }}>
              <View className="items-start w-full">
                <Text className="font-rmedium text-black text-xl">
                  Select membership type
                </Text>
              </View>
              {data.length < 1 ? (
                <Text className="text-base text-center align-middle font-rregular mt-2.5">
                  No membership types to select
                </Text>
              ) : (
                <View className="items-start w-full" style={{ rowGap: 10 }}>
                  {data.map(membershipType => (
                    <View
                      key={membershipType.id}
                      className="flex-row w-full justify-start items-center">
                      <TouchableOpacity
                        className="flex-row justify-center items-center"
                        style={{ columnGap: 10 }}
                        onPress={() => {
                          setSelectedMemType(membershipType);
                        }}>
                        <View className="justify-center items-start">
                          <View
                            style={{ columnGap: 10 }}
                            className="flex-row justify-center items-center">
                            <View
                              className={`w-5 h-5 border-2 justify-center items-center border-gray-400 rounded-full`}>
                              {selectedMemType == membershipType ? (
                                <View className="w-2.5 h-2.5 bg-primary rounded-full" />
                              ) : null}
                            </View>
                            <Text className="text-base text-center align-middle font-rmedium">
                              {`${membershipType.name} - ${membershipType.price} ${currency}`}
                            </Text>
                          </View>
                          <View className="flex-row justify-start items-start mt-1">
                            <Text className="text-base text-start align-middle font-rregular">
                              {`${membershipType.pointsPerTicket} points / ticket`}
                            </Text>
                          </View>
                          {membershipType.description ? (
                            <View className="flex-row justify-start items-start mt-1">
                              <Text className="text-base text-start align-middle font-rregular">
                                {membershipType.description}
                              </Text>
                            </View>
                          ) : null}
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
            </View>

            <View className="flex-row w-full items-start">
              <Text className="text-sm align-middle text-justify font-rregular">
                Selected membership type's points per ticket is subject to
                change.
              </Text>
            </View>
          </View>
          <View
            style={{ columnGap: 20 }}
            className="flex-row justify-between mt-5">
            <CustomButton
              title="Cancel"
              handlePress={() => {
                setVisible(!visible);
              }}
              containerStyles="bg-white border-2 border-primary w-20"
              textStyles="text-primary"
            />
            <CustomButton
              title="Select"
              disabled={selectedMemType ? false : true}
              handlePress={() => {
                router.push({
                  pathname: '/(tabs)/profile/payment',
                  params: {
                    membership: JSON.stringify(selectedMemType),
                    paymentType: 'Membership',
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

export default MembershipModal;
