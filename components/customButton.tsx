import {
  ActivityIndicator,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
} from 'react-native';
import { GestureResponderEvent } from 'react-native';
import Icon from './icon';

const CustomButton = ({
  title,
  icon,
  iconColor,
  handlePress,
  isLoading,
  disabled,
  containerStyles,
  textStyles,
}: {
  title: string;
  handlePress: (event: GestureResponderEvent) => void;
  icon?: ImageSourcePropType;
  iconColor?: string;
  isLoading?: boolean;
  disabled?: boolean;
  textStyles?: string;
  containerStyles?: string;
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`${disabled ? 'bg-gray-500 opacity-50' : 'bg-primary'} rounded-xl min-h-[62px] flex flex-row justify-center items-center ${containerStyles} ${
        isLoading ? 'opacity-50' : ''
      }`}
      disabled={disabled || isLoading}>
      {icon ? (
        <Icon icon={icon} color={iconColor ?? 'black'} />
      ) : (
        <Text className={`text-white font-rmedium text-lg ${textStyles}`}>
          {title}
        </Text>
      )}

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
