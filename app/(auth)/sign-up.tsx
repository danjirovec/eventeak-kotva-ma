import { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, Dimensions, Image } from 'react-native';
import { images } from '../../constants';
import CustomButton from '@/components/customButton';
import SignUpStepOne from '@/components/auth/sign-up-step-one';
import SignUpStepTwo from '@/components/auth/sign-up-step-two';
import {
  validateErrors,
  validateRequiredStepOne,
  validateRequiredStepTwo,
} from '@/components/auth/validation';
import { getToday } from '@/lib/getToday';
import { signUpWithEmail } from '@/lib/supabase';
import CustomModal from '@/components/modal';
import { useGlobalStore } from '@/context/globalProvider';
import Body from '@/components/body';
import Container from '@/components/container';
import Header from '@/components/header';
import BackButton from '@/components/backButton';

const SignUp = () => {
  const business = useGlobalStore(state => state.business);
  const [form, setForm] = useState<Form>({
    firstName: '',
    lastName: '',
    placeOfBirth: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: getToday(),
  });
  const [errors, setErrors] = useState<SignUpErrors>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    placeOfBirth: '',
    birthDate: '',
  });
  const [isSubmitting, setSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [validOne, setValidOne] = useState(false);
  const [validTwo, setValidTwo] = useState(false);
  const [modalVisiable, setModalVisiable] = useState(false);
  const [modalRedirect, setModalRedirect] = useState(false);
  const [modalText, setModalText] = useState({ title: '', description: '' });

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <SignUpStepOne
            form={form}
            setForm={setForm}
            errors={errors}
            setErrors={setErrors}
          />
        );
      case 2:
        return (
          <SignUpStepTwo
            form={form}
            setForm={setForm}
            errors={errors}
            setErrors={setErrors}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (validateRequiredStepOne(form)) {
      setValidOne(true);
    } else {
      setValidOne(false);
    }
    if (validateRequiredStepTwo(form) && validateErrors(errors)) {
      setValidTwo(true);
    } else {
      setValidTwo(false);
    }
  }, [errors]);

  const submit = async () => {
    setSubmitting(true);
    const { error, session } = await signUpWithEmail(form, business);
    if (error) {
      setModalText({ title: 'Sign up error', description: error.message });
      setModalVisiable(true);
    }
    if (!session && !error) {
      setModalRedirect(true);
      setModalText({
        title: 'Sign up successful',
        description: 'Please check your inbox and verify email',
      });
      setModalVisiable(true);
    }
    setSubmitting(false);
  };

  return (
    <Container>
      <Header left={<BackButton />} title="Sign Up" />
      <Body>
        <CustomModal
          visible={modalVisiable}
          setVisible={setModalVisiable}
          text={modalText}
          {...(modalRedirect && { redirectTo: '/(auth)/sign-in' })}
        />
        {renderStep()}

        <View className="flex-row justify-between">
          {currentStep == 2 && (
            <CustomButton
              title="Back"
              handlePress={prevStep}
              containerStyles="w-4/12 mt-5"
            />
          )}
          {currentStep == 1 ? (
            <CustomButton
              title="Next"
              handlePress={nextStep}
              containerStyles="w-6/12 mt-5 ml-auto"
              disabled={!validOne}
            />
          ) : (
            <CustomButton
              title="Sign Up"
              handlePress={submit}
              containerStyles="w-6/12 mt-5"
              isLoading={isSubmitting}
              disabled={!validTwo}
            />
          )}
        </View>

        <View className="justify-center pt-5 flex-row gap-2">
          <Text className="text-lg text-gray-500 font-rregular">
            Have an account already?
          </Text>
          <Link href="/sign-in" className="text-lg font-rmedium text-secondary">
            Sign In
          </Link>
        </View>
      </Body>
    </Container>
  );
};

export default SignUp;
