import AsyncStorage from '@react-native-async-storage/async-storage';

const createStorage = (key: string) => {
  let cache: null | any[] | boolean = null;

  const invalidateCache = async () => {
    let nextList = [];
    try {
      const value = await AsyncStorage.getItem(key);
      nextList = value === null ? [] : JSON.parse(value);
    } catch (ex) {
      console.warn('Fail to parse invalidateCache');
    }
    cache = nextList;
  };

  const get = async (forse = false) => {
    if (cache === null || forse) {
      await invalidateCache();
    }

    return cache;
  };

  const set = async (data: object | string) => {
    if (typeof data !== 'string') {
      data = JSON.stringify(data);
    }
    await AsyncStorage.setItem(key, data);
    await invalidateCache();
  };
  return {
    get,
    set,
  };
};

export {createStorage};
