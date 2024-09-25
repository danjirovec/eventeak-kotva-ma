import { View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  children: React.ReactNode;
};

const ContainerNoScroll = ({ children }: Props) => {
  return (
    <SafeAreaView className="bg-white h-full">
      <View className="w-full h-full">{children}</View>
    </SafeAreaView>
  );
};

export default ContainerNoScroll;
