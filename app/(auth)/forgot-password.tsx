import { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, Dimensions, Image } from 'react-native';

import { images } from '../../constants';
import CustomButton from '@/components/customButton';
import FormField from '@/components/formField';
import {
  validateEmail,
  validateErrors,
  validateRequiredEmail,
} from '@/components/auth/validation';
import { forgotPassword } from '@/lib/supabase';
import CustomModal from '@/components/modal';
import Body from '@/components/body';
import Container from '@/components/container';
import Header from '@/components/header';
import BackButton from '@/components/backButton';

const ForgotPassword = () => {
  const [form, setForm] = useState({ email: '' });
  const [errors, setErrors] = useState<EmailErrors>({
    email: '',
  });
  const [isSubmitting, setSubmitting] = useState(false);
  const [valid, setValid] = useState(false);
  const [modalVisiable, setModalVisiable] = useState(false);
  const [modalText, setModalText] = useState({ title: '', description: '' });

  const submit = async () => {
    setSubmitting(true);
    const error = await forgotPassword(form.email);
    if (error) {
      setModalText({
        title: 'Reset password error',
        description: error.message,
      });
      setModalVisiable(true);
    } else {
      setModalText({
        title: 'Reset password link sent',
        description:
          'Please check your inbox and click on the link to reset your password',
      });
      setModalVisiable(true);
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
        <CustomModal
          visible={modalVisiable}
          setVisible={setModalVisiable}
          text={modalText}
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
