import { View, Text } from 'react-native'
import React from 'react'

const AvailabilityLegend = () => {
  return (
    <View className="flex flex-row justify-start mt-2.5" style={{ columnGap: 20 }}>
      <View className="flex flex-row items-center">
        <View className="h-3 w-3 rounded-full bg-secondary-100 mr-2"></View>
        <Text className="text-base mb-0.5">Selected</Text>
      </View>
      <View className="flex flex-row items-center">
        <View className="h-3 w-3 rounded-full bg-gray-300 mr-2"></View>
        <Text className="text-base mb-0.5">Available</Text>
      </View>
      <View className="flex flex-row items-center">
        <View className="h-3 w-3 rounded-full bg-primary mr-2"></View>
        <Text className="text-base mb-0.5">Unavailable</Text>
      </View>
    </View>
  );
}

export default AvailabilityLegend
