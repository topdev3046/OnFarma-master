/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
const WEBVIEW_REF = "WEBVIEW_REF";
import React, { Component } from 'react';
import {
  AppRegistry,
  TouchableOpacity,
  WebView,
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Navigator,
  NetInfo,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


//type Props = {};
export default class App extends Component<> {
  constructor(props) {
    super(props);
    this.state = { canGoBack: false };
    this.checkConnection();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topbar}>
          <TouchableOpacity
            disabled={!this.state.canGoBack}
            onPress={this.onBack.bind(this)}>
            <Icon name='chevron-left' size={20} style={this.state.canGoBack ? styles.topbarText : styles.topbarTextDisabled} />
          </TouchableOpacity>
        </View>
        <View style={styles.containerWeb}>
        <WebView
          ref={WEBVIEW_REF}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
          style={{flex:1}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          source={{uri: 'https://www.onfarma.it/'}} />
        </View>
      </View>
    );
  }

  onBack() {
    this.refs[WEBVIEW_REF].goBack();
  }

  checkConnection() {
    NetInfo.isConnected.fetch().then(isConnected => {
    console.log('First, is ' + (isConnected ? 'online' : 'offline'));
    // Works on both iOS and Android
    if (isConnected==true)
    {
      Alert.alert(
        'Attenzione',
        'La connessione è assente.',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }
    });
  }

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15, /* Padding to push below the navigation bar */
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  containerWeb: {
    flex: 1,
    //paddingTop: 15, /* Padding to push below the navigation bar */
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  topbar: {
    height: 40,
    paddingBottom: 10,
    justifyContent: 'center',
    //alignItems: 'center',
  },
  topbarTextDisabled: {
    color: 'gray',
    paddingLeft: 8,
    paddingTop: 15,
    width: 100,
    //position: 'absolute',
    //flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
  },
  topbarText: {
    //color: 'gray',
    paddingLeft: 8,
    paddingTop: 15,
    width: 100,
    //flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});