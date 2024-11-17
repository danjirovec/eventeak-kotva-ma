import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StripeProvider } from '@stripe/stripe-react-native';
import { useQuery } from '@apollo/client';
import { PUBLISHABLE_KEY_QUERY } from '@/graphql/queries';
import { useGlobalStore } from '@/context/globalProvider';

const ProgramLayout = () => {
  const { publishableKey, setPublishableKey } = useGlobalStore(state => ({
    setPublishableKey: state.setPublishableKey,
    publishableKey: state.publishableKey,
  }));

  const { data, loading, refetch, error } = useQuery(PUBLISHABLE_KEY_QUERY, {
    variables: {},
  });

  useEffect(() => {
    if (data && data.getPublishableKey) {
      setPublishableKey(data.getPublishableKey.publishableKey);
    }
  }, [loading]);

  return (
    <>
      <StripeProvider
        publishableKey={publishableKey}
        urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      >
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="[event]" options={{ headerShown: false }} />
          <Stack.Screen name="payment" options={{ headerShown: false }} />
        </Stack>

        <StatusBar backgroundColor="#f7f7f7" style="dark" />
      </StripeProvider>
    </>
  );
};

export default ProgramLayout;
