import React, { Component } from "react";
import { View } from "react-native";
import RootRouter from "./app/RootRouter";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/es/integration/react";
import reducers from "./app/redux/reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appIsReady: false
    };
  }

  async loadAssets() {
    const fontAssets = cacheFonts([
      { Poppins: require("./assets/Poppins-Regular.ttf") }
    ]);
    await Promise.all([...fontAssets]);
  }

  render() {
    const { appIsReady } = this.state;
    let store = null;

    store = composeWithDevTools(applyMiddleware(thunk))(createStore)(reducers);
    // const persistor = persistStore(store);

    if (!appIsReady) {
      return (
        <AppLoading
          startAsync={this.loadAssets}
          onFinish={() => this.setState({ appIsReady: true })}
          onError={error => console.warn(error)}
        />
      );
    }

    return (
      <Provider store={store}>
        {/* <PersistGate persistor={persistor}> */}
        <View style={{ flex: 1 }}>
          <RootRouter />
        </View>
        {/* </PersistGate> */}
      </Provider>
    );
  }
}

export default App;
