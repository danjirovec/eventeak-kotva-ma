import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from './icon';
import { icons } from '@/constants';
import { router } from 'expo-router';

const MoreButton = ({ eventId }: { eventId: string }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/(tabs)/program/${eventId}`);
      }}>
      <View className="flex flex-row items-center justify-center bg-secondary w-32 h-14 rounded-lg mr-2">
        <Text className="text-base align-middle text-center font-rmedium text-white mr-1 mb-1">
          See more
        </Text>
        <Icon icon={icons.right} color="white" />
      </View>
    </TouchableOpacity>
  );
};

export default MoreButton;
