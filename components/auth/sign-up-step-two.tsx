import { View, Text } from 'react-native';
import React from 'react';
import FormField from '@/components/formField';
import {
  validateEmail,
  validateConfirmPassword,
  validatePassword,
} from './validation';

const SignUpStepTwo = ({
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
  const handleEmailChange = (e: string) => {
    setForm({ ...form, email: e });
    setErrors({
      ...errors,
      email: validateEmail(e) ?? '',
    });
  };

  const handlePasswordChange = (e: string) => {
    setForm({ ...form, password: e });
    setErrors({
      ...errors,
      password: validatePassword(e) ?? '',
    });
  };

  const handleConfirmPasswordChange = (e: string) => {
    setForm({ ...form, confirmPassword: e });
    setErrors({
      ...errors,
      confirmPassword: validateConfirmPassword(form.password, e) ?? '',
    });
  };

  return (
    <View>
      <FormField
        title="Email*"
        value={form.email}
        handleChangeText={handleEmailChange}
        otherStyles="mt-5"
        keyboardType="email-address"
      />
      {errors.email ? (
        <Text className="text-red-500">{errors.email}</Text>
      ) : null}

      <FormField
        title="Password*"
        value={form.password}
        handleChangeText={handlePasswordChange}
        otherStyles="mt-5"
      />
      {errors.password ? (
        <Text className="text-red-500">{errors.password}</Text>
      ) : null}

      <FormField
        title="Confirm password*"
        value={form.confirmPassword}
        handleChangeText={handleConfirmPasswordChange}
        otherStyles="mt-5"
      />
      {errors.confirmPassword ? (
        <Text className="text-red-500">{errors.confirmPassword}</Text>
      ) : null}
    </View>
  );
};

export default SignUpStepTwo;
