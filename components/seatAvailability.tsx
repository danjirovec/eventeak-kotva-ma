import { View, Text } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const SeatAvailability = () => {
  return (
    <View
      className="flex flex-row justify-start mt-2.5"
      style={{ columnGap: 20 }}>
      <View className="flex flex-row items-center">
        <View className="h-3 w-3 rounded-full bg-secondary mr-2"></View>
        <Text className="text-base mb-0.5">Selected</Text>
      </View>
      <View className="flex flex-row items-center">
        <LinearGradient
          colors={[
            '#FF0000',
            '#00FF00',
            '#0000FF',
          ]}
          className="h-3 w-3 rounded-full mr-2"
          style={{ borderRadius: 999 }}
        />
        <Text className="text-base mb-0.5">Available</Text>
      </View>
      <View className="flex flex-row items-center">
        <View className="h-3 w-3 rounded-full bg-unavailable mr-2"></View>
        <Text className="text-base mb-0.5">Unavailable</Text>
      </View>
    </View>
  );
};

export default SeatAvailability;
