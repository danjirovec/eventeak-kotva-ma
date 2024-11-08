import { View } from 'react-native';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const NoScrollBody = ({ children }: Props) => {
  return <View className="w-full flex-1 h-full px-4">{children}</View>;
};

export default NoScrollBody;
