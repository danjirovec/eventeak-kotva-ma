import {
  View,
  Text,
  TextInput,
  KeyboardTypeOptions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { icons } from '@/constants';

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  keyboardType,
  ...props
}: {
  title: string;
  value: string | undefined;
  placeholder?: string;
  handleChangeText: (e: string) => void;
  otherStyles?: string;
  keyboardType?: KeyboardTypeOptions;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-500 font-rmedium">{title}</Text>

      <View className="w-full h-16 border-2 border-black-200 bg-black-100 px-4 rounded-2xl focus:border-secondary items-center flex-row">
        <TextInput
          className="flex-1 text-white font-rmedium text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          keyboardType={keyboardType}
          onChangeText={handleChangeText}
          secureTextEntry={
            ['Password*', 'Confirm password*'].includes(title) && !showPassword
          }
          {...props}
        />

        {['Password*', 'Confirm password*'].includes(title) && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              tintColor="#ECECEC"
              source={!showPassword ? icons.eye : icons.eyecrossed}
              className="h-6 w-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
