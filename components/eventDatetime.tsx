import { View, Text } from 'react-native';
import React from 'react';

const EventDatetime = ({ date }: { date: string }) => {
  return (
    <View className="flex flex-col justify-center items-center bg-white w-32 h-14 rounded-lg ml-2">
      <Text className="text-base text-center align-middle font-rmedium">
        {new Date(date).toLocaleDateString('cs-CZ')}
      </Text>
      <View className="h-0.5 w-10/12 bg-primary opacity-50" />
      <Text className="text-base text-center align-middle font-rmedium">
        {new Date(date).toLocaleTimeString('cs-CZ', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })}
      </Text>
    </View>
  );
};

export default EventDatetime;
