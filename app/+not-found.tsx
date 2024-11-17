import NoScrollBody from '@/components/bodyNoScroll';
import Container from '@/components/container';
import Header from '@/components/header';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

const NotFoundScreen = () => {
  return (
    <>
      <Container>
        <Header title="Not found"></Header>
        <NoScrollBody>
          <View className="mt-5">
            <Text className="text-base text-center">
              This screen doesn't exist
            </Text>
            <Link href="/(tabs)/program" className="mt-15 pt-10 pb-10">
              <Text className="text-base text-center">Go to home screen</Text>
            </Link>
          </View>
        </NoScrollBody>
      </Container>
      <StatusBar backgroundColor="#f7f7f7" style="dark" />
    </>
  );
};

export default NotFoundScreen;
