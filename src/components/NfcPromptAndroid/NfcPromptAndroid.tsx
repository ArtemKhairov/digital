import {useEffect, useRef, useState} from 'react';
import {Image, Text, View, Animated, StyleSheet, Modal} from 'react-native';
import {Button} from 'react-native-paper';
import NfcManager from 'react-native-nfc-manager';
import {useOutlet} from 'reconnect.js';

const DEFAULT_DATA_OUTLET = {
  visible: false,
  message: '',
};

type DEFAULT_DATA = typeof DEFAULT_DATA_OUTLET;

const NfcPromptAndroid = () => {
  const [visible, setVisible] = useState(false);
  const animValue = useRef(new Animated.Value(0)).current;
  const [_data, _setData] = useOutlet<DEFAULT_DATA>('androidPrompt');
  const {visible: _visible, message = ''} = _data || DEFAULT_DATA_OUTLET;

  useEffect(() => {
    if (_visible) {
      setVisible(true);
      Animated.timing(animValue, {
        duration: 300,
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animValue, {
        duration: 200,
        toValue: 0,
        useNativeDriver: true,
      }).start(() => {
        setVisible(false);
      });
    }
  }, [_visible, animValue]);

  const cancelNfcScan = () => {
    setTimeout(() => {
      NfcManager.cancelTechnologyRequest().catch(() => 0);
    }, 200);
    _setData({visible: false, message});
  };

  const bgAnimStyle = {
    backgroundColor: 'rgba(0,0,0,0.3)',
    opacity: animValue,
  };

  const promptAnimStyle = {
    transform: [
      {
        translateY: animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [300, 0],
        }),
      },
    ],
  };

  return (
    <Modal transparent={true} visible={visible}>
      <View style={styles.wrapper}>
        <View style={styles.wrappedContainer} />

        <Animated.View style={[styles.prompt, promptAnimStyle]}>
          <View style={styles.animatedView}>
            <Image
              source={require('../../../images/nfc-512.png')}
              style={styles.img}
              resizeMode="contain"
            />

            <Text>{message}</Text>
          </View>

          <Button mode="contained" onPress={cancelNfcScan}>
            Отмена
          </Button>
        </Animated.View>

        <Animated.View style={[styles.promptBg, bgAnimStyle]} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  wrappedContainer: {
    flex: 1,
  },
  animatedView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 120,
    height: 120,
    padding: 20,
  },
  promptBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  prompt: {
    height: 300,
    alignSelf: 'stretch',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 20,
    zIndex: 2,
  },
});

export {NfcPromptAndroid};
