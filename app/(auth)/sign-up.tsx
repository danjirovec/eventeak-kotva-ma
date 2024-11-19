import { useEffect, useState } from 'react';
import { Link, router } from 'expo-router';
import { View, Text } from 'react-native';
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
import { useGlobalStore } from '@/context/globalProvider';
import Body from '@/components/body';
import Container from '@/components/container';
import Header from '@/components/header';
import BackButton from '@/components/backButton';
import SlideAlert from '@/components/slideAlert';

const SignUp = () => {
  const business = useGlobalStore(state => state.business);
  const [form, setForm] = useState<Form>({
    firstName: '',
    lastName: '',
    placeOfResidence: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: getToday(),
  });
  const [errorsStepOne, setErrorsStepOne] = useState<SignUpErrorsStepOne>({
    firstName: '',
    lastName: '',
    placeOfResidence: '',
    birthDate: '',
  });
  const [errorsStepTwo, setErrorsStepTwo] = useState<SignUpErrorsStepTwo>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isSubmitting, setSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [validOne, setValidOne] = useState(false);
  const [validTwo, setValidTwo] = useState(false);
  const [alert, setAlert] = useState({
    visible: false,
    message: '',
    success: false,
  });

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <SignUpStepOne
            form={form}
            setForm={setForm}
            errors={errorsStepOne}
            setErrors={setErrorsStepOne}
          />
        );
      case 2:
        return (
          <SignUpStepTwo
            form={form}
            setForm={setForm}
            errors={errorsStepTwo}
            setErrors={setErrorsStepTwo}
          />
        );
      default:
        return null;
    }
  };

  const showAlert = (message: string, success: boolean) => {
    setAlert({ visible: true, message: message, success: success });
    setTimeout(
      () => setAlert({ visible: false, message: message, success: success }),
      3500,
    );
  };

  useEffect(() => {
    if (validateRequiredStepOne(form) && validateErrors(errorsStepOne)) {
      setValidOne(true);
    } else {
      setValidOne(false);
    }
    if (validateRequiredStepTwo(form) && validateErrors(errorsStepTwo)) {
      setValidTwo(true);
    } else {
      setValidTwo(false);
    }
  }, [errorsStepOne, errorsStepTwo]);

  const submit = async () => {
    setSubmitting(true);
    const { error, session } = await signUpWithEmail(form, business);
    if (error) {
      showAlert(error.message, false);
    }
    if (!session && !error) {
      showAlert('Verify your email', true);
      setTimeout(() => {
        router.replace('/(auth)/sign-in');
      }, 3000);
    }
    setSubmitting(false);
  };

  return (
    <Container>
      <Header left={<BackButton />} title="Sign Up" />
      <Body>
        <SlideAlert
          message={alert.message}
          visible={alert.visible}
          success={alert.success}
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
