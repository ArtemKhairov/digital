import React, {Component, createContext} from 'react';
import {createStorage} from '../utils/Storage';
import NfcProxy from '../utils/NfcProxy';

const personalListHandler = createStorage('personalList');

const Context = createContext({});

type ActionMethods = {
  [index: string]: (value?: any) => void;
};

const Actions: ActionMethods = {};

class Provider extends Component<any, any> {
  constructor(_props: any) {
    super(_props);
    this.state = {
      showNfcPrompt: false,
      storageCache: [],
      user: null,
    };
  }

  async componentDidMount() {
    Actions.setShowNfcPrompt = show => {
      this.setState({showNfcPrompt: show});
    };

    Actions.initStorage = async () => {
      const nextCache = await personalListHandler.get(true);
      this.setState({storageCache: nextCache});
    };

    Actions.getStorage = () => {
      return this.state.storageCache;
    };

    Actions.setStorage = async data => {
      await personalListHandler.set(data);
      this.setState({storageCache: await personalListHandler.get(true)});
    };

    Actions.readUserInfoTag = async () => {
      const userData = await NfcProxy.readUserInformationTag();
      userData && this.setState({user: userData});
    };

    Actions.resetUserInfo = () => {
      this.setState({user: null});
    };
  }

  render() {
    return (
      <Context.Provider
        value={{
          state: this.state,
          actions: Actions,
          user: this.state.user,
        }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export {Context, Provider, Actions};
