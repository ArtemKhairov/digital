import {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import NfcManager, {Ndef, NfcEvents, NfcTech} from 'react-native-nfc-manager';
import NfcProxy from '../../utils/NfcProxy';

const NfcReader = () => {
  const [hasNfc, setHasNFC] = useState<boolean | null>(null);
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

  const readTag = async () => {
    let tag = null;

    try {
      await NfcManager.requestTechnology([NfcTech.Ndef]);
      tag = await NfcManager.getTag();
      // @ts-ignore
      tag.ndefStatus = await NfcManager.ndefHandler.getNdefStatus();
    } catch (ex) {
      console.log('readTag Exception:', ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
    let message = tag?.ndefMessage?.[0]?.payload;
    let type = tag?.ndefMessage?.[0].type;
    // @ts-ignore

    console.log(
      Ndef.util.bytesToString(message),
      Ndef.util.bytesToString(type)
    );
    // @ts-ignore
    // await NfcManager.registerTagEvent();
  };

  const readTagProxy = async () => {
    await NfcProxy.readTag();
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
