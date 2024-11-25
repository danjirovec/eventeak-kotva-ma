import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthError, createClient } from '@supabase/supabase-js';
import { AppState } from 'react-native';
import { supabasePublicKey, supabaseUrl } from './config';

const SUPABASE_URL = supabaseUrl ?? '';
const SUPABASE_KEY = supabasePublicKey ?? '';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

AppState.addEventListener('change', state => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export const signInWithEmail = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  return error;
};

export const signUpWithEmail = async (data: Form, business: string) => {
  const { data: businessUser, error: bUe } = await supabase
    .from('business_user')
    .select(
      `
      business_id,
      user!inner (
        email
      )
    `,
    )
    .eq('business_id', business)
    .eq('user.email', data.email)
    .maybeSingle();

  if (businessUser) {
    return {
      error: new AuthError('User with this email already exists'),
      session: null,
    };
  }

  const { data: user } = await supabase
    .from('user')
    .select('email, id')
    .eq('email', data.email)
    .maybeSingle();

  if (user) {
    const { error } = await supabase
      .from('business_user')
      .insert({ business_id: business, user_id: user.id, role: 'Customer' });
    return { error, session: null, created: true };
  }

  const {
    data: { session },
    error,
  } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo: 'com.eventeak://(auth)/sign-in',
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        placeOfResidence: data.placeOfResidence,
        birthDate: data.birthDate,
        businessId: business,
      },
    },
  });

  return { error, session };
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  return error;
};

export const resetPassword = async (password: string) => {
  const { error } = await supabase.auth.updateUser({
    password,
  });
  return error;
};

export const forgotPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'com.eventeak://(auth)/reset-password',
  });
  return error;
};
