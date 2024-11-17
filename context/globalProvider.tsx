import { supabase } from '@/lib/supabase';
import React, { useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { create } from 'zustand';

interface GlobalStoreProps {
  isLoggingOut: boolean;
  onboarding: boolean;
  isLogged: boolean;
  isLoading: boolean;
  business: string;
  currency: string | null;
  userId: string | null;
  userEmail: string | null;
  session: Session | null;
  publishableKey: string;
  setIsLoggingOut: (isLoggingOut: boolean) => void;
  setUserId: (userId: string | null) => void;
  setUserEmail: (userEmail: string | null) => void;
  setIsLogged: (isLogged: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setOnboarding: (onboarding: boolean) => void;
  setSession: (newSession: Session | null) => void;
  setCurrency: (newCurrency: string | null) => void;
  setPublishableKey: (publishableKey: string) => void;
}

export const useGlobalStore = create<GlobalStoreProps>()(set => ({
  isLoggingOut: false,
  onboarding: false,
  isLogged: false,
  isLoading: true,
  business: '0de38ea5-d584-4272-88fc-4de08f504059',
  currency: null,
  userId: null,
  userEmail: null,
  session: null,
  publishableKey: '',
  setIsLoggingOut: isLoggingOut => set({ isLoggingOut: isLoggingOut }),
  setUserId: userId => set({ userId: userId }),
  setUserEmail: userEmail => set({ userEmail: userEmail }),
  setIsLogged: logged => set({ isLogged: logged }),
  setIsLoading: loading => set({ isLoading: loading }),
  setOnboarding: onboarding => set({ onboarding: Boolean(onboarding) }),
  setSession: newSession => set({ session: newSession }),
  setCurrency: newCurrency => set({ currency: newCurrency }),
  setPublishableKey: publishableKey => set({ publishableKey: publishableKey }),
}));

type Props = {
  children: React.ReactNode;
};

const GlobalStore = ({ children }: Props) => {
  const { setSession, setUserId, setIsLogged, setIsLoading, setUserEmail } =
    useGlobalStore(state => ({
      setIsLoading: state.setIsLoading,
      setSession: state.setSession,
      setUserId: state.setUserId,
      setIsLogged: state.setIsLogged,
      setUserEmail: state.setUserEmail,
    }));

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsLogged(true);
        setSession(session);
        setUserId(session.user.id);
        setUserEmail(session.user.email ? session.user.email : null);
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setIsLogged(true);
        setSession(session);
        setUserId(session.user.id);
        setUserEmail(session.user.email ? session.user.email : null);
      } else {
        setIsLogged(false);
        setSession(null);
        setUserId(null);
        setUserEmail(null);
      }
    });

    setIsLoading(false);
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
};

export default GlobalStore;
