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
  userId: string | null;
  session: Session | null;
  setIsLoggingOut: (isLoggingOut: boolean) => void;
  setUserId: (userId: string | null) => void;
  setIsLogged: (isLogged: boolean) => void;
  setIsLoading: (isLogged: boolean) => void;
  setOnboarding: (onboarding: boolean) => void;
  setSession: (newSession: Session | null) => void;
}

export const useGlobalStore = create<GlobalStoreProps>()(set => ({
  isLoggingOut: false,
  onboarding: false,
  isLogged: false,
  isLoading: true,
  business: 'd3e3f711-3993-4a93-a543-b9431894a682',
  userId: null,
  session: null,
  setIsLoggingOut: isLoggingOut => set({isLoggingOut: isLoggingOut}),
  setUserId: userId => set({ userId: userId }),
  setIsLogged: logged => set({ isLogged: logged }),
  setIsLoading: loading => set({ isLoading: loading }),
  setOnboarding: onboarding => set({ onboarding: Boolean(onboarding) }),
  setSession: newSession => set({ session: newSession }),
}));

type Props = {
  children: React.ReactNode;
};

const GlobalStore = ({ children }: Props) => {
  const { setSession, setUserId, setIsLogged, setIsLoading } = useGlobalStore(
    state => ({
      setIsLoading: state.setIsLoading,
      setSession: state.setSession,
      setUserId: state.setUserId,
      setIsLogged: state.setIsLogged,
    }),
  );

  console.log('Provider');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsLogged(true);
        setSession(session);
        setUserId(session.user.id);
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setIsLogged(true);
        setSession(session);
        setUserId(session.user.id);
      } else {
        setIsLogged(false);
        setSession(null);
        setUserId(null);
      }
    });

    setIsLoading(false);
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
};

export default GlobalStore;
