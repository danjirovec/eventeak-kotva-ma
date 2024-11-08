import { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { View, Text } from 'react-native';

import CustomButton from '@/components/customButton';
import FormField from '@/components/formField';
import {
  validateEmail,
  validateErrors,
  validateRequiredLogin,
} from '@/components/auth/validation';
import { signInWithEmail } from '@/lib/supabase';
import Container from '@/components/container';
import Body from '@/components/body';
import Header from '@/components/header';
import SlideAlert from '@/components/slideAlert';

const SignIn = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<EmailErrors>({ email: '' });
  const [isSubmitting, setSubmitting] = useState(false);
  const [valid, setValid] = useState(false);
  const [alert, setAlert] = useState({ visible: false, message: '' });

  const submit = async () => {
    setSubmitting(true);
    const error = await signInWithEmail(form.email, form.password);
    if (error) {
      showAlert(error.message);
    }
    setSubmitting(false);
  };

  const handleEmailChange = (e: string) => {
    setForm({ ...form, email: e });
    setErrors({
      ...errors,
      email: validateEmail(e) ?? '',
    });
  };

  const showAlert = (message: string) => {
    setAlert({ visible: true, message: message });
    setTimeout(() => setAlert({ visible: false, message: message }), 3500);
  };

  useEffect(() => {
    if (validateRequiredLogin(form) && validateErrors(errors)) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [form]);

  return (
    <Container>
      <Header title="Sign In" />
      <Body>
        <SlideAlert
          message={alert.message}
          visible={alert.visible}
          success={false}
        />
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
          handleChangeText={e => setForm({ ...form, password: e })}
          otherStyles="mt-5"
        />
        <View className="justify-end pt-2.5 flex-row gap-2">
          <Link
            href="/forgot-password"
            className="text-lg text-gray-500 font-rregular">
            Forgot password?
          </Link>
        </View>

        <CustomButton
          title="Sign In"
          handlePress={submit}
          containerStyles="mt-5"
          isLoading={isSubmitting}
          disabled={!valid}
        />

        <View className="justify-center pt-5 flex-row gap-2">
          <Text className="text-lg text-gray-500 font-rregular">
            Don't have an account?
          </Text>
          <Link href="/sign-up" className="text-lg font-rmedium text-secondary">
            Sign Up
          </Link>
        </View>
      </Body>
    </Container>
  );
};

export default SignIn;
