import NfcManager, {
  Ndef,
  NfcTech,
  NfcEvents,
  NfcError,
  TagEvent,
  NdefStatus,
} from 'react-native-nfc-manager';
import {getOutlet} from 'reconnect.js';

interface TagCustomEvent extends TagEvent {
  ndefStatus?: any;
}

const withAndroidPrompt = (fn: any) => {
  async function wrapper() {
    try {
      getOutlet('androidPrompt').update({
        visible: true,
        message: 'Готов к чтению NFC',
      });
      const resp = await fn.apply(null, arguments);
      getOutlet('androidPrompt').update({
        visible: true,
        message: 'Выполнено',
      });
      return resp;
    } catch (ex) {
      throw ex;
    } finally {
      setTimeout(() => {
        getOutlet('androidPrompt').update({
          visible: false,
        });
      }, 800);
    }
  }

  return wrapper;
};

class NfcProxy {
  async init() {
    const supported = await NfcManager.isSupported();
    if (supported) {
      await NfcManager.start();
    }
    return supported;
  }

  async isEnabled() {
    return NfcManager.isEnabled();
  }

  async goToNfcSetting() {
    return NfcManager.goToNfcSetting();
  }

  readTag = withAndroidPrompt(async () => {
    let tag: TagCustomEvent | null = null;

    try {
      await NfcManager.requestTechnology([NfcTech.Ndef]);

      tag = await NfcManager.getTag();
      if (tag) {
        tag.ndefStatus = await NfcManager.ndefHandler.getNdefStatus();
      }
    } catch (ex) {
      console.log('readTag Exception:', ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  });
}

export default new NfcProxy();
