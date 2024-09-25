import { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, Dimensions, Image } from 'react-native';

import { images } from '../../constants';
import CustomButton from '@/components/customButton';
import FormField from '@/components/formField';
import {
  validateConfirmPassword,
  validateErrors,
  validatePassword,
  validateRequiredReset,
} from '@/components/auth/validation';
import { resetPassword } from '@/lib/supabase';
import CustomModal from '@/components/modal';
import Body from '@/components/body';
import Container from '@/components/container';
import Header from '@/components/header';

const ResetPassword = () => {
  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<ResetPasswordErrors>({
    password: '',
    confirmPassword: '',
  });
  const [isSubmitting, setSubmitting] = useState(false);
  const [valid, setValid] = useState(false);
  const [modalVisiable, setModalVisiable] = useState(false);
  const [modalRedirect, setModalRedirect] = useState(false);
  const [modalText, setModalText] = useState({ title: '', description: '' });

  const submit = async () => {
    setSubmitting(true);
    const error = await resetPassword(form.password);
    if (error) {
      setModalText({
        title: 'Reset password error',
        description: error.message,
      });
      setModalVisiable(true);
    } else {
      setModalRedirect(true);
      setModalText({
        title: 'Password reset successful',
        description: 'You can now log in with your new password',
      });
      setModalVisiable(true);
    }
    setSubmitting(false);
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

  useEffect(() => {
    if (validateRequiredReset(form) && validateErrors(errors)) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [form]);

  return (
    <Container>
      <Header
        left={<View className="flex-1" />}
        right={<View className="flex-1" />}
        title="Reset Password"
      />
      <Body>
        <CustomModal
          visible={modalVisiable}
          setVisible={setModalVisiable}
          text={modalText}
          {...(modalRedirect && { redirectTo: '/(auth)/sign-in' })}
        />
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

        <CustomButton
          title="Reset"
          handlePress={submit}
          containerStyles="mt-5"
          isLoading={isSubmitting}
          disabled={!valid}
        />

        <View className="justify-center pt-5 flex-row gap-2">
          <Text className="text-lg text-gray-500 font-rregular">
            Did you remember?
          </Text>
          <Link href="/sign-in" className="text-lg font-rmedium text-secondary">
            Sign In
          </Link>
        </View>
      </Body>
    </Container>
  );
};

export default ResetPassword;
