import {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';
import {useAppContext} from '../../hooks/useAppContext';

const NfcReader = () => {
  const [hasNfc, setHasNFC] = useState<boolean | null>(null);
  const {actions} = useAppContext();

  useEffect(() => {
    const checkIsSupported = async () => {
      const deviceIsSupported = await NfcManager.isSupported();

      setHasNFC(deviceIsSupported);
      if (deviceIsSupported) {
        await NfcManager.start();
      }
    };

    checkIsSupported();
  }, []);

  useEffect(() => {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
      console.log('tag found', tag);
    });

    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    };
  }, []);

  const readTagProxy = async () => {
    await actions.readUserInfoTag();
  };

  if (hasNfc === null) {
    return null;
  }

  if (!hasNfc) {
    return (
      <View>
        <Text>NFC not supported</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.wrapper}>
      <Text>Hello world</Text>
      <TouchableOpacity style={[styles.btn]} onPress={readTagProxy}>
        <Text style={styles.scanText}>Scan Tag</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'red',
  },
  scanText: {
    color: 'white',
  },
});

export {NfcReader};
