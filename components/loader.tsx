import { View, ActivityIndicator, Dimensions, Platform } from 'react-native';

const Loader = () => {
  const osName = Platform.OS;
  const screenHeight = Dimensions.get('screen').height;

  return (
    <View
      className="flex flex-1 justify-center items-center w-full h-full z-10"
      style={{
        height: screenHeight,
      }}>
      <ActivityIndicator
        className="bg-white rounded-full p-1.5 shadow shadow-black"
        animating={true}
        color="#225F78"
        size={osName === 'ios' ? 'small' : 28}
      />
    </View>
  );
};

export default Loader;
