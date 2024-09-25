import AsyncStorage from '@react-native-async-storage/async-storage';
import { Session } from '@supabase/supabase-js';

export const getAuth = async () => {
  const session = await AsyncStorage.getItem(
    'sb-ncdwlflcmlklzfsuijvj-auth-token',
  );
  const parsedSession = session ? JSON.parse(session) : null;
  if (parsedSession) {
    return {
      accessToken: parsedSession.access_token,
      userId: parsedSession.user.id,
    };
  }
  return { accessToken: null, userId: null };
};
