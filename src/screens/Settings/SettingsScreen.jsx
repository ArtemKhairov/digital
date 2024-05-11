import {View, Text, StyleSheet} from 'react-native';
import ApplicationInformation from './ApplicationInformation';

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <ApplicationInformation />
    </View>
    // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    //   <Text>Настройки</Text>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
  },
});

export default SettingsScreen;
