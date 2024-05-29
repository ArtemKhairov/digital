import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';

// Pre-step, call this before any NFC operations
NfcManager.start();

function Nfc() {
  //   async function readNdef() {
  //     try {
  //       let tech = NfcTech.NfcA;
  //       let cmd = NfcManager.transceive;
  //       let resp = await NfcManager.requestTechnology(tech, {
  //         alertMessage: 'Ready to do some custom Mifare cmd!',
  //       });
  //       // register for the NFC tag with NDEF in it
  //       await NfcManager.requestTechnology(NfcTech.NfcA);
  //       // the resolved tag object will contain `ndefMessage` property
  //       const tag = await NfcManager.getTag();
  //       console.warn('Tag found', tag);
  //     } catch (ex) {
  //       console.warn('Oops!', ex);
  //     } finally {
  //       // stop the nfc scanning
  //       NfcManager.cancelTechnologyRequest();
  //     }
  //   }

  const cleanUp = () => {
    return NfcManager.cancelTechnologyRequest();
  };

  const readData = async () => {
    try {
      let tech = NfcTech.NfcA;
      let resp = await NfcManager.requestTechnology(tech, {
        alertMessage: 'Ready to do some custom Mifare cmd!',
      });

      //   let cmd = NfcManager.transceive();

      resp = await NfcManager.transceive([0x3a, 4, 4]);
      let payloadLength = parseInt(resp.toString().split(',')[1]);
      let payloadPages = Math.ceil(payloadLength / 4);
      let startPage = 5;
      let endPage = startPage + payloadPages - 1;

      resp = await NfcManager.transceive([0x3a, startPage, endPage]);
      let bytes = resp.toString().split(',');
      let text = '';
      for (let i = 0; i < bytes.length; i++) {
        if (i < 5) {
          continue;
        }

        if (parseInt(bytes[i]) === 254) {
          break;
        }

        text = text + String.fromCharCode(parseInt(bytes[i]));
      }
      console.log(text);
    } catch (err) {
      console.log(err);
      cleanUp();
    } finally {
    }
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={readData}>
        <Text>Scan a Tag</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {Nfc};
