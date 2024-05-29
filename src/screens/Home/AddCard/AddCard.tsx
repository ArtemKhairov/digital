import {FC} from 'react';
import {View, Text, StyleSheet, GestureResponderEvent} from 'react-native';
import {IconButton} from 'react-native-paper';

interface AddCardProps {
  onPress: (event: GestureResponderEvent) => void;
}

const AddCard: FC<AddCardProps> = ({onPress}) => {
  return (
    <View style={styles.buttonContainer}>
      <IconButton icon={'plus-thick'} size={36} onPress={onPress} />
      <Text>Добавить удостоверение</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    height: 200,
    backgroundColor: 'lightblue',
    marginVertical: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 200,
    width: '100%',
    borderRadius: 8,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {AddCard};
