import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from './icon';
import { icons } from '@/constants';

type Props = {
  title: string;
  children: React.ReactNode;
  showValid: boolean;
  setShowValid: (showValid: boolean) => void;
};

const SlideDown = ({ children, showValid, setShowValid, title }: Props) => {
  return (
    <View className="items-start mt-5 w-full">
      <TouchableOpacity
        className="w-full justify-center"
        onPress={() => setShowValid(!showValid)}>
        <View
          className="flex-row justify-start items-center mb-2.5"
          style={{ columnGap: 5 }}>
          <Text className="text-xl text-center align-middle font-rmedium">
            {title}
          </Text>
          {showValid ? (
            <Icon icon={icons.angledown} color="black" />
          ) : (
            <Icon icon={icons.angleright} color="black" />
          )}
        </View>
      </TouchableOpacity>
      {showValid ? children : null}
    </View>
  );
};

export default SlideDown;
