import { View, Text } from 'react-native';
import React from 'react';
import FormField from '@/components/formField';
import DatePicker from '@/components/datePicker';
import { validateDate, validatePlace, validateString } from './validation';

const SignUpStepOne = ({
  form,
  setForm,
  errors,
  setErrors,
}: {
  form: Form;
  setForm: SetForm;
  errors: SignUpErrorsStepOne;
  setErrors: SetSignUpErrorsStepOne;
}) => {
  const handleStringChange = (e: string, key: string) => {
    setForm({ ...form, [key]: e });
    setErrors({
      ...errors,
      [key]: validateString(e) ?? '',
    });
  };

  const handlePlaceChange = (e: string, key: string) => {
    setForm({ ...form, [key]: e });
    setErrors({
      ...errors,
      [key]: validatePlace(e) ?? '',
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
        title="Place of Residence"
        value={form.placeOfResidence}
        handleChangeText={e => handlePlaceChange(e, 'placeOfResidence')}
        otherStyles="mt-5"
      />
      {errors.placeOfResidence ? (
        <Text className="text-red-500">{errors.placeOfResidence}</Text>
      ) : null}

      <DatePicker
        title="Date of Birth*"
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
