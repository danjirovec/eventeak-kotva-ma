import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomButton from '@/components/customButton';
import { useLocalSearchParams } from 'expo-router';
import FormField from '@/components/formField';
import {
  validateConfirmPassword,
  validateEmail,
  validateErrors,
  validatePassword,
  validatePlace,
  validateRequiredReset,
  validateRequiredUpdate,
  validateString,
} from '@/components/auth/validation';
import { useGlobalStore } from '@/context/globalProvider';
import Container from '@/components/container';
import Header from '@/components/header';
import Body from '@/components/body';
import BackButton from '@/components/backButton';
import SlideDown from '@/components/slideDown';
import {
  ANONYMIZE_USER_MUTATION,
  UPDATE_USER_MUTATION,
  UPDATE_USER_PASSWORD_MUTATION,
} from '@/graphql/mutations';
import { useMutation } from '@apollo/client';
import SlideAlert from '@/components/slideAlert';
import DeleteModal from '@/components/deleteModal';
import { logout } from '@/lib/supabase';
import { client } from '@/apollo/client';
import Loader from '@/components/loader';

const Settings = () => {
  const { user } = useLocalSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { business, userId, isLoggingOut, setIsLoggingOut } = useGlobalStore(
    state => ({
      business: state.business,
      userId: state.userId,
      isLoggingOut: state.isLoggingOut,
      setIsLoggingOut: state.setIsLoggingOut,
    }),
  );

  const userObj = JSON.parse(user as string);

  const [passwordForm, setPasswordForm] = useState({
    password: '',
    confirmPassword: '',
  });
  const [form, setForm] = useState<UpdateForm>({
    firstName: '',
    lastName: '',
    placeOfResidence: '',
    email: '',
  });
  const [errors, setErrors] = useState<SignUpErrors>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    placeOfResidence: '',
    birthDate: '',
  });
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [showDelete, setDelete] = useState(false);
  const [showPersonal, setPersonal] = useState(false);
  const [showPassword, setPassword] = useState(false);
  const [validPersonal, setValidPersonal] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [alertVisible, setAlertVisible] = useState({
    visible: false,
    success: true,
  });

  const [anonymizeUser, { loading: anonymizeLoading, error: anonymizeError }] =
    useMutation(ANONYMIZE_USER_MUTATION);

  const [
    updateOneUser,
    { loading: updateUserLoading, error: updateUserError },
  ] = useMutation(UPDATE_USER_MUTATION);

  const [
    updatePassword,
    { loading: updatePasswordLoading, error: updatePasswordError },
  ] = useMutation(UPDATE_USER_PASSWORD_MUTATION);

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

  const handleEmailChange = (e: string) => {
    setForm({ ...form, email: e });
    setErrors({
      ...errors,
      email: validateEmail(e) ?? '',
    });
  };

  const handlePasswordChange = (e: string) => {
    setPasswordForm({ ...passwordForm, password: e });
    setErrors({
      ...errors,
      password: validatePassword(e) ?? '',
    });
  };

  const handleConfirmPasswordChange = (e: string) => {
    setPasswordForm({ ...passwordForm, confirmPassword: e });
    setErrors({
      ...errors,
      confirmPassword: validateConfirmPassword(passwordForm.password, e) ?? '',
    });
  };

  const anonymize = async () => {
    try {
      await anonymizeUser({
        variables: {
          input: {
            userId: userId,
            businessId: business,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
    await submit();
  };

  const submit = async () => {
    setIsLoggingOut(true);
    const error = await logout();
    if (error) {
    }
    client.clearStore();
    setIsLoggingOut(false);
  };

  const submitUpdateUser = async () => {
    setIsSubmitting(true);
    try {
      await updateOneUser({
        variables: {
          input: {
            id: userObj.id,
            update: {
              firstName: form.firstName,
              lastName: form.lastName,
              placeOfResidence: form.placeOfResidence,
              email: form.email,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
      showAlert(false);
      return;
    }
    setIsSubmitting(false);
    showAlert(true);
  };

  const submitUpdatePassword = async () => {
    setIsSubmitting(true);
    try {
      await updatePassword({
        variables: {
          input: {
            userId: userObj.id,
            password: passwordForm.password,
          },
        },
      });
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
      showAlert(false);
      return;
    }
    setIsSubmitting(false);
    showAlert(true);
  };

  const showAlert = (success: boolean) => {
    setAlertVisible({ visible: true, success: success });
    setTimeout(
      () => setAlertVisible({ visible: true, success: success }),
      3500,
    );
  };

  useEffect(() => {
    setForm({
      firstName: userObj.firstName,
      lastName: userObj.lastName,
      placeOfResidence: userObj.placeOfResidence,
      email: userObj.email,
    });
  }, []);

  useEffect(() => {
    if (validateErrors(errors) && validateRequiredUpdate(form)) {
      setValidPersonal(true);
    } else {
      setValidPersonal(false);
    }
    if (validateErrors(errors) && validateRequiredReset(passwordForm)) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
  }, [errors]);

  return (
    <Container>
      {isLoggingOut ? (
        <Loader />
      ) : (
        <React.Fragment>
          <Header left={<BackButton />} title="Settings" />
          <Body>
            <DeleteModal
              anonymize={anonymize}
              visible={deleteModalVisible}
              setVisible={setDeleteModalVisible}
              user={userId ? userId : ''}
            />
            <View className="mb-5">
              <SlideDown
                setShowValid={setPersonal}
                showValid={showPersonal}
                title="Update personal information">
                <FormField
                  title="First name*"
                  value={form.firstName}
                  handleChangeText={e => handleStringChange(e, 'firstName')}
                  otherStyles="mt-2.5"
                />
                {errors.firstName ? (
                  <Text className="text-red-500">{errors.firstName}</Text>
                ) : null}

                <FormField
                  title="Last name*"
                  value={form.lastName}
                  handleChangeText={e => handleStringChange(e, 'lastName')}
                  otherStyles="mt-2.5"
                />
                {errors.lastName ? (
                  <Text className="text-red-500">{errors.lastName}</Text>
                ) : null}
                <FormField
                  title="Place of Residence"
                  value={form.placeOfResidence}
                  handleChangeText={e =>
                    handlePlaceChange(e, 'placeOfResidence')
                  }
                  otherStyles="mt-2.5"
                />
                {errors.lastName ? (
                  <Text className="text-red-500">{errors.lastName}</Text>
                ) : null}
                <FormField
                  title="Email*"
                  value={form.email}
                  handleChangeText={handleEmailChange}
                  otherStyles="mt-2.5"
                />
                {errors.email ? (
                  <Text className="text-red-500">{errors.email}</Text>
                ) : null}
                <CustomButton
                  title="Update personal information"
                  handlePress={submitUpdateUser}
                  containerStyles="w-full mt-5"
                  isLoading={isSubmitting}
                  disabled={!validPersonal}
                />
              </SlideDown>
              <SlideDown
                setShowValid={setPassword}
                showValid={showPassword}
                title="Update password">
                <FormField
                  title="Password*"
                  value={passwordForm.password}
                  handleChangeText={handlePasswordChange}
                  otherStyles="mt-2.5"
                />
                {errors.password ? (
                  <Text className="text-red-500">{errors.password}</Text>
                ) : null}

                <FormField
                  title="Confirm password*"
                  value={passwordForm.confirmPassword}
                  handleChangeText={handleConfirmPasswordChange}
                  otherStyles="mt-2.5"
                />
                {errors.confirmPassword ? (
                  <Text className="text-red-500">{errors.confirmPassword}</Text>
                ) : null}
                <CustomButton
                  title="Update password"
                  handlePress={submitUpdatePassword}
                  containerStyles="w-full mt-5"
                  isLoading={isSubmitting}
                  disabled={!validPassword}
                />
              </SlideDown>
              <SlideDown
                setShowValid={setDelete}
                showValid={showDelete}
                title="Delete account">
                <CustomButton
                  title="Delete account"
                  handlePress={() => {
                    setDeleteModalVisible(true);
                  }}
                  containerStyles="bg-red-400 w-full mt-2.5"
                />
              </SlideDown>
            </View>
            <SlideAlert
              success={alertVisible.success}
              message={alertVisible.success ? 'Update success' : 'Update fail'}
              visible={alertVisible.visible}
            />
          </Body>
        </React.Fragment>
      )}
    </Container>
  );
};

export default Settings;
