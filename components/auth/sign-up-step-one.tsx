import { View, Text } from 'react-native';
import React, { useState } from 'react';
import FormField from '@/components/formField';
import DatePicker from '@/components/datePicker';
import { validateDate, validateString } from './validation';

const SignUpStepOne = ({
  form,
  setForm,
  errors,
  setErrors,
}: {
  form: Form;
  setForm: SetForm;
  errors: SignUpErrors;
  setErrors: SetSignUpErrors;
}) => {
  const handleStringChange = (e: string, key: string) => {
    setForm({ ...form, [key]: e });
    setErrors({
      ...errors,
      [key]: validateString(e) ?? '',
    });
  };

  const handleDateChange = (date: Date) => {
    setForm({ ...form, birthDate: date });
    setErrors({
      ...errors,
      birthDate: validateDate(date) ?? '',
    });
  };

  return (
    <View>
      <FormField
        title="First name*"
        value={form.firstName}
        handleChangeText={e => handleStringChange(e, 'firstName')}
        otherStyles="mt-5"
      />
      {errors.firstName ? (
        <Text className="text-red-500">{errors.firstName}</Text>
      ) : null}

      <FormField
        title="Last name*"
        value={form.lastName}
        handleChangeText={e => handleStringChange(e, 'lastName')}
        otherStyles="mt-5"
      />
      {errors.lastName ? (
        <Text className="text-red-500">{errors.lastName}</Text>
      ) : null}

      <FormField
        title="Place of birth"
        value={form.placeOfBirth}
        handleChangeText={e => handleStringChange(e, 'placeOfBirth')}
        otherStyles="mt-5"
      />
      {errors.placeOfBirth ? (
        <Text className="text-red-500">{errors.placeOfBirth}</Text>
      ) : null}

      <DatePicker
        title="Date of birth*"
        value={form.birthDate}
        onChange={(event, date) => {
          if (date) {
            handleDateChange(date);
          }
        }}
        otherStyles="mt-5"
      />
      {errors.birthDate ? (
        <Text className="text-red-500">{errors.birthDate}</Text>
      ) : null}
    </View>
  );
};

export default SignUpStepOne;
