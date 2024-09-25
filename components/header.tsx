import { View, Text } from 'react-native';
import React from 'react';

type Props = {
  left?: React.ReactNode;
  right?: React.ReactNode;
  title: string;
  titleStyles?: string;
};

const Header = ({ left, right, title, titleStyles }: Props) => {
  return (
    <View className="flex-row justify-between items-center px-4 py-2 h-14 bg-gray-100 shadow-sm shadow-black">
      <View className="flex-1 items-start">{left}</View>
      <View className="justify-center items-center">
        <Text
          className={`text-3xl text-center align-middle font-rbold  ${titleStyles}`}>
          {title}
        </Text>
      </View>
      <View className="flex-1 items-end">{right}</View>
    </View>
  );
};

export default Header;
