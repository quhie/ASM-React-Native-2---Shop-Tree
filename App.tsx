// File: asm_ps28784/App.tsx
import React from 'react';
import {StyleSheet} from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store';
import AppNavigation from './src/navigations/AppNavigation';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}

const styles = StyleSheet.create({});

export default App;
