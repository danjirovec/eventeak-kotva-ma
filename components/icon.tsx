import { ImageSourcePropType, View, Image } from 'react-native';

const Icon = ({
  icon,
  color,
  iconsStyles,
}: {
  icon: ImageSourcePropType;
  color: string;
  iconsStyles?: string;
}) => {
  return (
    <View className="items-center justify-center">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className={`w-5 h-5 ${iconsStyles}`}
      />
    </View>
  );
};

export default Icon;
