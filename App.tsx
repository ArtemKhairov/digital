import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import MyTabs from './src/screens/main';
import {NfcPromptAndroid} from './src/components/NfcPromptAndroid';
// import {createStackNavigator} from '@react-navigation/stack';

// const RootStack = createStackNavigator();

// function Root() {
//   return (
//     <RootStack.Navigator
//       screenOptions={{
//         headerShown: false,
//         presentation: 'modal',
//       }}>
//       <RootStack.Screen name="Main" component={Main} />
//     </RootStack.Navigator>
//   );
// }

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      {/* <Root /> */}
      <MyTabs />
      <NfcPromptAndroid />
    </NavigationContainer>
  );
}

export default App;
