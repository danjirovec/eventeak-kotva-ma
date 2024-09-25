import { View, Text, ImageSourcePropType } from 'react-native';
import React from 'react';
import Icon from './icon';

const EventDetailInfoBox = ({
  info,
  icon,
  containerStyles,
}: {
  info: string;
  icon: ImageSourcePropType;
  containerStyles?: string;
}) => {
  return (
    <View
      className={`flex flex-row items-center h-fit mb-1 ${containerStyles}`}>
      <Icon icon={icon} color="#225F78" />
      <Text className="text-base text-center align-middle font-rmedium ml-2">
        {info}
      </Text>
    </View>
  );
};

export default EventDetailInfoBox;
