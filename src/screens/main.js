import {useCallback} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {HomeScreen} from './Home/HomeScreen';
import SettingsScreen from './Settings/SettingsScreen';
import {Nfc, NfcReader} from './Nfc';
// Icons
import IconEntypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

function MyTabs() {
  const IconComponentHome = useCallback(
    props => <IconEntypo name="briefcase" {...props} />,
    []
  );
  const IconComponentSettings = useCallback(
    props => <MaterialIcons name="settings" {...props} />,
    []
  );
  const IconSettings = useCallback(
    props => <MaterialIcons name="settings" {...props} />,
    []
  );
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Портфель"
        component={HomeScreen}
        options={{
          tabBarIcon: IconComponentHome,
        }}
      />
      <Tab.Screen
        name="Настройки"
        component={SettingsScreen}
        options={{
          tabBarIcon: IconComponentSettings,
        }}
      />
      <Tab.Screen
        name="Nfc"
        component={NfcReader}
        options={{
          tabBarIcon: IconSettings,
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
