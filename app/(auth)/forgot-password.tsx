import { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { View, Text } from 'react-native';
import CustomButton from '@/components/customButton';
import FormField from '@/components/formField';
import {
  validateEmail,
  validateErrors,
  validateRequiredEmail,
} from '@/components/auth/validation';
import { forgotPassword } from '@/lib/supabase';
import Body from '@/components/body';
import Container from '@/components/container';
import Header from '@/components/header';
import BackButton from '@/components/backButton';
import SlideAlert from '@/components/slideAlert';

const ForgotPassword = () => {
  const [form, setForm] = useState({ email: '' });
  const [errors, setErrors] = useState<EmailErrors>({
    email: '',
  });
  const [isSubmitting, setSubmitting] = useState(false);
  const [valid, setValid] = useState(false);
  const [alert, setAlert] = useState({
    visible: false,
    message: '',
    success: false,
  });

  const submit = async () => {
    setSubmitting(true);
    const error = await forgotPassword(form.email);
    if (error) {
      showAlert(error.message, false);
    } else {
      showAlert('Reset link sent', true);
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

  const showAlert = (message: string, success: boolean) => {
    setAlert({ visible: true, message: message, success: success });
    setTimeout(
      () => setAlert({ visible: false, message: message, success: success }),
      3500,
    );
  };

  useEffect(() => {
    if (validateRequiredEmail(form) && validateErrors(errors)) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [form]);

  return (
    <Container>
      <Header left={<BackButton />} title="Forgot Password" />
      <Body>
        <SlideAlert
          message={alert.message}
          visible={alert.visible}
          success={alert.success}
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

        <CustomButton
          title="Send"
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

export default ForgotPassword;
