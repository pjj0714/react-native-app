import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import InitialHome from './src/component/InitailHome';
import CarList from './src/component/CarList';
import { Provider } from 'react-redux';
import configureStore from './src/Store';

const RootStack = createStackNavigator(
  {
    InitialHome,
    CarList
  },
  {
    initialRouteName: 'InitialHome'
  }
);

const AppContainer = createAppContainer(RootStack);
const store = configureStore();
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
