import React, {useState, useRef} from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

// Получить высоту экрана
const {height} = Dimensions.get('window');

// Интерфейс для пропсов компонента, если необходимо
interface ContainerProps {
  // Пропсы компонента (если есть)
}

const MovableContainer: React.FC<ContainerProps> = props => {
  // Состояние для отслеживания позиции Y
  const position = useRef(new Animated.ValueXY()).current;

  // Обработчик нажатия
  const moveToTop = () => {
    Animated.spring(position, {
      toValue: {x: 0, y: 0}, // Перемещение в верхнюю часть экрана
      useNativeDriver: true, // Лучшая производительность за счёт нативного драйвера
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: position.getTranslateTransform(), // Применить анимированное положение
        },
      ]}
      {...props}>
      <TouchableOpacity style={styles.touchable} onPress={moveToTop}>
        {/* Содержимое контейнера */}
      </TouchableOpacity>
    </Animated.View>
  );
};

// Стили компонента
const styles = StyleSheet.create({
  container: {
    width: 200, // Фиксированная длина
    height: 150, // Фиксированная высота
    position: 'absolute', // Абсолютное позиционирование
    bottom: 50, // Позиция от нижнего края на старте
    // Другие стили...
  },
  touchable: {
    flex: 1, // Растягивание на все доступное пространство
    // Дополнительные стили для touchable, если необходимо
  },
});

export {MovableContainer};
