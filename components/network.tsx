import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { NetInfoState } from '@react-native-community/netinfo';

const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setIsConnected(state.isConnected ?? false);
    });
    return () => unsubscribe();
  }, []);

  return isConnected;
};

export default useNetworkStatus;
