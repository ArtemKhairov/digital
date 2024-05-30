import React, {Component, createContext} from 'react';
import {createStorage} from '../utils/Storage';

const personalListHandler = createStorage('personalList');

const Context = createContext({});

type ActionMethods = {
  [index: string]: (value: any) => void;
};

const Actions: ActionMethods = {};

class Provider extends Component<any, any> {
  constructor(_props: any) {
    super(_props);
    this.state = {
      showNfcPrompt: false,
      storageCache: [],
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
  }

  render() {
    return (
      <Context.Provider
        value={{
          state: this.state,
          actions: Actions,
        }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export {Context, Provider, Actions};
