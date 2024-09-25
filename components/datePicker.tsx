import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';

const DatePicker = ({
  title,
  value,
  onChange,
  otherStyles,
}: {
  title: string;
  value: Date;
  onChange: (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ) => void;
  otherStyles: string;
}) => {
  const [show, setShow] = useState(false);

  const onChangeDate = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ) => {
    setShow(false);
    if (selectedDate) {
      onChange(event, selectedDate);
    }
  };

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-500 font-rmedium">{title}</Text>
      <View className="w-full h-16 border-2 border-black-200 bg-black-100 px-4 rounded-2xl focus:border-secondary items-center flex-row">
        <Pressable onPress={() => setShow(true)} className="w-full">
          <Text className="text-white font-rmedium text-base">
            {value.getDate() !== new Date().getDate()
              ? value.toDateString()
              : ''}
          </Text>
        </Pressable>
      </View>
      {show && (
        <RNDateTimePicker
          value={value}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}
    </View>
  );
};

export default DatePicker;
