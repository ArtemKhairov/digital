import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// import HomeScreen from './Home/HomeScreen';
// import CopyScreen from './Home/CopyScreen';
import {Screen} from './Home/Screen';
import SettingsScreen from './Settings/SettingsScreen';
// Icons
import IconEntypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Портфель"
        component={Screen}
        options={{
          tabBarIcon: ({color, size}) => {
            return <IconEntypo name="briefcase" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Настройки"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
