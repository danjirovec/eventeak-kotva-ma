import { View, Text } from 'react-native';
import React from 'react';

const Figure = ({
  title,
  value,
  fragStyles,
}: {
  title: string;
  value: string | number;
  fragStyles?: string;
}) => {
  return (
    <View className={`flex flex-col items-start ${fragStyles}`}>
      <Text className="text-xs text-center align-middle font-rregular">
        {title}
      </Text>
      <Text className="text-base text-center align-middle font-rmedium">
        {value}
      </Text>
    </View>
  );
};

export default Figure;
