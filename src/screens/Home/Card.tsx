import {FC} from 'react';
import {View, Text, StyleSheet, GestureResponderEvent} from 'react-native';
import {Wrapper} from '../../containers/Wrapper';
import {IconButton} from 'react-native-paper';
import {User} from '../../types/User';

interface CardProps {
  onPress: (event: GestureResponderEvent) => void;
  onDelete: (event: GestureResponderEvent) => void;
  user: User;
}

const Card: FC<CardProps> = ({onPress, onDelete, user}) => {
  const handlePress = (e: GestureResponderEvent) => {
    onPress(e);
  };

  const {name, surname, can, expire} = user;

  return (
    <Wrapper useForeground activeOpacity={0.7} onPress={handlePress}>
      <View style={styles.card}>
        <View style={styles.row}>
          <IconButton icon="delete" size={24} onPress={onDelete} />
        </View>
        <View style={styles.cardItem}>
          <Text style={styles.title}>Имя</Text>
          <Text style={styles.subTitle}>{name}</Text>
        </View>
        <View style={styles.cardItem}>
          <Text style={styles.title}>Фамилия</Text>
          <Text style={styles.subTitle}>{surname}</Text>
        </View>
        <View style={styles.rowItems}>
          <View style={styles.cardItem}>
            <Text style={styles.title}>Годен до</Text>
            <Text style={styles.subTitle}>{expire}</Text>
          </View>
          <View style={styles.cardItem}>
            <Text style={styles.title}>CAN</Text>
            <Text style={styles.subTitle}>{can}</Text>
          </View>
        </View>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  card: {
    // flex: 1,
    height: 200,
    padding: 10,
    // height: 'auto',
    borderRadius: 8,
    backgroundColor: 'pink',
  },
  row: {
    position: 'absolute',
    left: 290,
    top: 10,
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
