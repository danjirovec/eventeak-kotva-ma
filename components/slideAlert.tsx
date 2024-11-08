import React, { useRef, useEffect } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import Icon from './icon';
import { icons } from '@/constants';

const SlideAlert = ({
  message,
  visible,
  success,
}: {
  message: string;
  visible: boolean;
  success: boolean;
}) => {
  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        Animated.timing(slideAnim, {
          toValue: -100,
          duration: 100,
          easing: Easing.ease,
          useNativeDriver: true,
        }).start();
      }, 3000);
    }
  }, [visible, slideAnim]);

  return visible ? (
    <Animated.View
      className="w-full justify-end items-center absolute top-5 left-0 right-0 z-50"
      style={{ transform: [{ translateY: slideAnim }] }}>
      <View
        className="flex-row items-center justify-center bg-gray-100 shadow-sm shadow-black-100 w-2/3 h-fit rounded-lg p-5 mr-0.5"
        style={{ columnGap: 10 }}>
        {success ? (
          <Icon icon={icons.checkfull} color="green" />
        ) : (
          <Icon icon={icons.crossfull} color="red" />
        )}
        <Text className="text-base font-rmedium">{message}</Text>
      </View>
    </Animated.View>
  ) : null;
};

export default SlideAlert;
