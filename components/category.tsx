import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const Category = ({
  item,
  selectedCategory,
  setSelectedCategory,
}: {
  item: string;
  selectedCategory: string | undefined;
  setSelectedCategory: (category: string | undefined) => void;
}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          if (selectedCategory === item) {
            setSelectedCategory(undefined);
          } else {
            setSelectedCategory(item);
          }
        }}>
        <Text
          className={`text-base text-white font-rmedium px-5 py-2 bg-gray-500 rounded-xl mr-2 ${selectedCategory === item ? `bg-primary text-white` : ''}`}>
          {item}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Category;
