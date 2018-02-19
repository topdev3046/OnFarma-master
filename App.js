/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { WebView } from 'react-native';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Navigator
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
	 <WebView
        source={{uri: 'https://www.onfarma.it/'}}
        style={{marginTop: 20}}
      />
	/**
	<Header
		leftComponent={{ icon: 'menu', color: '#fff' }}
		centerComponent={{ text: 'OnFarmarr', style: { color: '#fff' } }}
		rightComponent={{ icon: 'home', color: '#fff' }}
		/>
      <WebView
        source={{uri: 'https://www.onfarma.it/'}}
        style={{marginTop: 20}}
      />
	  */
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
