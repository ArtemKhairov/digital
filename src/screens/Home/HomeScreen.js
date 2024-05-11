import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  Animated,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Card from './Card';

const {height} = Dimensions.get('window');

function HomeScreen() {
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [yPosition] = useState(new Animated.Value(height / 2 - 50)); // Начальная позиция контейнера

  // Функция для анимирования контейнера и изменения возможности прокрутки
  const toggleContainerPosition = () => {
    // Если ScrollView не прокручиваемый, делаем его прокручиваемым и поднимаем контейнер
    if (!scrollEnabled) {
      Animated.spring(yPosition, {
        toValue: 0, // Контейнер поднимается в верхнюю часть
        useNativeDriver: false,
      }).start();
    } else {
      // Если ScrollView прокручиваемый, возвращаем контейнер в середину
      Animated.spring(yPosition, {
        toValue: height / 2 - 50, // Контейнер опускается в середину
        useNativeDriver: false,
      }).start();
    }

    setScrollEnabled(!scrollEnabled); // Переключаем состояние прокручиваемости
  };
  return (
    <View style={styles.conteiner}>
      <ScrollView
        style={styles.scrollView}
        scrollEnabled={false}
        contentContainerStyle={styles.scrollViewContent}>
        {/* <View style={styles.wrapper}> */}
        <MovableView
          onPress={toggleContainerPosition}
          animatedStyle={{transform: [{translateY: yPosition}]}}>
          <Card />
        </MovableView>
        <View style={styles.absoluteElement}>
          <Button
            color={'pink'}
            title="Сканировать"
            // disabled
            onPress={() => Alert.alert('Cannot press this one')}
          />
        </View>
        {/* </View> */}
      </ScrollView>
    </View>
  );
}

const MovableView = ({children, onPress, animatedStyle}) => {
  const topValue = useState(new Animated.Value(0))[0];

  const moveCard = () => {
    Animated.timing(topValue, {
      toValue: 100,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  const childrenWithProps = React.Children.map(children, child => {
    return React.cloneElement(child, {onPress: onPress});
  });

  return (
    <View>
      <Animated.View
        style={{
          // marginBottom: topValue,
          ...animatedStyle,
        }}>
        {childrenWithProps}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    flex: 1,
    marginHorizontal: 15,
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  absoluteElement: {
    // flex: 1,
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end',
    position: 'absolute',
    top: 550,
    left: 240,
  },
  btn: {
    borderRadius: 10,
  },
});

export default HomeScreen;
