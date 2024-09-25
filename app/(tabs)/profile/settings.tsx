import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomButton from '@/components/customButton';
import { logout } from '@/lib/supabase';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '@/components/icon';
import { icons } from '@/constants';
import { router, useLocalSearchParams } from 'expo-router';
import FormField from '@/components/formField';
import {
  validateConfirmPassword,
  validateEmail,
  validateErrors,
  validatePassword,
  validateString,
} from '@/components/auth/validation';
import { UserProfile } from '@/graphql/schema.types';
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
