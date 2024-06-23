import {useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  UIManager,
  LayoutAnimation,
  Animated,
  // ScrollView,
} from 'react-native';
import Card from './Card';
// import {SignatureList} from './Signature';
import {AddCard} from './AddCard/AddCard';
import {useAppContext} from '../../hooks/useAppContext';
import {SignatureItem} from './Signature/SignatureItem';
import {PASSPORT, SMARTCARD} from './constants';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const HomeScreen = () => {
  const [show, setShow] = useState<boolean>(false);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Начальное значение прозрачности для анимации
  // @ts-ignore
  const {user, actions} = useAppContext();

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
    actions.resetUserInfo();
  };

  const handleAdd = async () => {
    await actions.readUserInfoTag();
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
          {!user ? (
            <AddCard onPress={handleAdd} />
          ) : (
            <Card onPress={handleCard} onDelete={handleDelete} user={user} />
          )}
          {show && user && (
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
                {/* @ts-ignore */}
                {PASSPORT[user?.name].map(item => {
                  return (
                    <SignatureItem
                      key={item.title}
                      title={item.title}
                      subTitle={item.subTitle}
                    />
                  );
                })}
                {/* @ts-ignore */}
                {SMARTCARD[user?.name].map(item => {
                  return (
                    <SignatureItem
                      key={item.title}
                      title={item.title}
                      subTitle={item.subTitle}
                    />
                  );
                })}
                <View style={styles.emptyBlock} />
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
