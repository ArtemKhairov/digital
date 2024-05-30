import {useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  UIManager,
  LayoutAnimation,
  Animated,
} from 'react-native';
import Card from './Card';
import {SignatureList} from './Signature';
import {AddCard} from './AddCard/AddCard';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ADVANCED_SIGNATURE = [
  {
    title: 'Имя',
    subTitle: 'Артём',
  },
  {
    title: 'Фамилия',
    subTitle: 'Хаиров',
  },
  {
    title: 'Дата окончания действия подписи',
    subTitle: '06.05.2034',
  },
  {
    title: 'Серийный номер',
    subTitle: 'H0K1G3N0M3R0D1N',
  },
];

const QUALIFIED_SIGNATURE = [
  {
    title: 'Имя',
    subTitle: 'Артём',
  },
  {
    title: 'Фамилия',
    subTitle: 'Хаиров',
  },
  {
    title: 'Дата окончания действия подписи',
    subTitle: '06.05.2034',
  },
  {
    title: 'Серийный номер',
    subTitle: 'H0K1G3N0M3R0D1N',
  },
];

const USER = {
  name: 'Artem',
  surname: 'Khairov',
  CAN: 130397,
  birth: '13.03.1997',
};

const HomeScreen = () => {
  const [add, setAdd] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Начальное значение прозрачности для анимации

  const handleCard = () => {
    LayoutAnimation.easeInEaseOut();
    toggleText();
  };

  const toggleText = () => {
    if (show) {
      // Если текст сейчас показывается, анимируем исчезновение
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setShow(false)); // После анимации убираем текст
    } else {
      // Если текст скрыт, сначала отображаем текст
      setShow(true);
      // Затем анимируем появление
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleDelete = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => setShow(false));
    setAdd(!add);
  };

  const handleAdd = () => {
    setAdd(!add);
    setShow(true);
    // Затем анимируем появление
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.wrapper}>
      <View
        // scrollEnabled={show}
        style={styles.scrollContainer}
        // contentContainerStyle={styles.contentContainer}
      >
        <View
          style={[
            styles.container,
            show ? styles.justifyFlexStart : styles.justifyCenter,
          ]}>
          {add ? (
            <AddCard onPress={handleAdd} />
          ) : (
            <Card onPress={handleCard} onDelete={handleDelete} user={USER} />
          )}
          {show && (
            <Animated.View
              style={[
                // styles.animatedBox,
                {
                  opacity: fadeAnim, // Привязываем значение opacity к анимированной переменной
                  // Для scaling можно добавить transform здесь
                  transform: [
                    {
                      scale: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.85, 1], // Можно менять значения для разного эффекта масштабирования
                      }),
                    },
                  ],
                },
              ]}>
              <View>
                <View style={styles.emptyBlock} />
                <SignatureList
                  header={'Усиленная неквалифицированная электронная подпись'}
                  data={ADVANCED_SIGNATURE}
                />
                <View style={styles.emptyBlock} />
                <SignatureList
                  header={'Усиленная квалифицированная электронная подпись'}
                  data={QUALIFIED_SIGNATURE}
                />
              </View>
            </Animated.View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  box: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    backgroundColor: 'aliceblue',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  contentContainer: {
    flexGrow: 1,
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyFlexStart: {
    justifyContent: 'flex-start',
  },
  scrollContainer: {
    flex: 1,
  },
  text: {
    fontSize: 11,
  },
  emptyBlock: {
    paddingTop: 5,
    paddingBottom: 5,
  },
});

export {HomeScreen};
