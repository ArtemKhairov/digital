import React, {FC, ReactNode, useCallback} from 'react';
import {
  View,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  ViewStyle,
  TouchableOpacityProps,
  TouchableNativeFeedbackProps,
  GestureResponderEvent,
} from 'react-native';

interface WrapperProps
  extends TouchableOpacityProps,
    TouchableNativeFeedbackProps {
  children: ReactNode;
  viewStyle?: ViewStyle;
  onPress: (event: GestureResponderEvent) => void;
}

const Wrapper: FC<WrapperProps> = ({
  children,
  viewStyle,
  onPress,
  ...props
}) => {
  const WrapperPlatform: React.ComponentType<any> =
    Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

  const handlePress = useCallback(
    (e: GestureResponderEvent) => {
      onPress(e);
    },
    [onPress]
  );

  return (
    <WrapperPlatform {...props} onPress={handlePress}>
      <View style={viewStyle}>{children}</View>
    </WrapperPlatform>
  );
};

export {Wrapper};
