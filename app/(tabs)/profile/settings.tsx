import { View } from 'react-native';
import React, { useState } from 'react';
import CustomButton from '@/components/customButton';
import Icon from '@/components/icon';
import { icons } from '@/constants';
import { useLocalSearchParams } from 'expo-router';
import FormField from '@/components/formField';
import {
  validateConfirmPassword,
  validateEmail,
  validateErrors,
  validatePassword,
  validateString,
} from '@/components/auth/validation';
import { useGlobalStore } from '@/context/globalProvider';
import Container from '@/components/container';
import Header from '@/components/header';
import Body from '@/components/body';
import BackButton from '@/components/backButton';

const Settings = () => {
  const { user } = useLocalSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { business, session, userId } = useGlobalStore(state => ({
    business: state.business,
    session: state.session,
    userId: state.userId,
  }));

  return (
    <Container>
      <Header left={<BackButton />} title="Settings" />
      <Body>
        <View></View>
      </Body>
    </Container>
  );
};

export default Settings;
