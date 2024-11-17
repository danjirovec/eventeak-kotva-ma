import NoScrollBody from '@/components/bodyNoScroll';
import Container from '@/components/container';
import Header from '@/components/header';
import useNetworkStatus from '@/components/network';
import { Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

const NoConnection = () => {
  const isConnected = useNetworkStatus();
  if (isConnected) {
    return <Redirect href={'/'} />;
  }
  return (
    <>
      <Container>
        <Header title="No connection"></Header>
        <NoScrollBody>
          <View className="mt-5">
            <Text className="text-base text-center">
              You have no internet connection
            </Text>
            <Text className="text-base text-center">
              Please reconnect to continue using this app
            </Text>
          </View>
        </NoScrollBody>
      </Container>
      <StatusBar backgroundColor="#f7f7f7" style="dark" />
    </>
  );
};

export default NoConnection;
