import {FC} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  GestureResponderEvent,
} from 'react-native';
import {Wrapper} from '../../containers/Wrapper';

interface CardProps {
  onPress: (event: GestureResponderEvent) => void;
}

const Card: FC<CardProps> = ({onPress}) => {
  const handlePress = (e: GestureResponderEvent) => {
    onPress(e);
  };

  return (
    <Wrapper useForeground activeOpacity={0.7} onPress={handlePress}>
      <View style={styles.card}>
        <View style={styles.row}>
          <Button
            color={'pink'}
            title="Удалить"
            // disabled
            onPress={(event: GestureResponderEvent) => {
              console.log(event.type, 'event');
            }}
          />
        </View>
        <View style={styles.cardItem}>
          <Text style={styles.title}>Имя</Text>
          <Text style={styles.subTitle}>Артём</Text>
        </View>
        <View style={styles.cardItem}>
          <Text style={styles.title}>Фамилия</Text>
          <Text style={styles.subTitle}>Хаиров</Text>
        </View>
        <View style={styles.rowItems}>
          <View style={styles.cardItem}>
            <Text style={styles.title}>Годен до</Text>
            <Text style={styles.subTitle}>06.05.2034</Text>
          </View>
          <View style={styles.cardItem}>
            <Text style={styles.title}>CAN</Text>
            <Text style={styles.subTitle}>130397</Text>
          </View>
        </View>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    // flex: 1,
    height: 'auto',
    borderRadius: 8,
    backgroundColor: 'pink',
  },
  row: {
    position: 'absolute',
    left: 250,
    top: 30,
    zIndex: 3, // works on ios
    elevation: 3, // works on android
  },
  rowItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardItem: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  title: {
    fontSize: 11,
  },
  subTitle: {
    fontSize: 18,
  },
});

export default Card;
