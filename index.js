import './AppOutlet';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {PaperProvider} from 'react-native-paper';
import * as AppContext from './src/context/AppContext';

const Main = () => {
  return (
    <AppContext.Provider>
      <PaperProvider>
        <App />
      </PaperProvider>
    </AppContext.Provider>
  );
};

AppRegistry.registerComponent(appName, () => Main);
