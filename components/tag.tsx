import { View, Text, ImageSourcePropType } from 'react-native';
import React from 'react';
import Icon from './icon';

const Tag = ({
  tag,
  icon,
  containerStyles,
}: {
  tag: string;
  icon: ImageSourcePropType;
  containerStyles?: string;
}) => {
  return (
    <View
      className={`flex-row justify-center items-center bg-white px-1.5 mr-1.5 mb-1.5 rounded-lg ${containerStyles}`}>
      <Icon icon={icon} color="#225F78" />
      <Text className="text-base text-justify align-middle font-rmedium ml-1">
        {tag}
      </Text>
    </View>
  );
};

export default Tag;
