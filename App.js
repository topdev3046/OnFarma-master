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
  Navigator,
  NetInfo,
  Alert
} from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon, Left, Right, Body, Badge, StatusBar } from 'native-base';

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
    this.state = { canGoBack: false, uri: 'https://www.onfarma.it/', postMessage: '0' };
    this.checkConnection();
  }

  render() {
    const jsCode = "window.postMessage('document.getElementsByClassName('count')')";
    onMessage = (e) => {
      this.setState({ postMessage: e.nativeEvent.data });
    };
    this.checkConnection.bind(this);
    return (
     
      <View style={styles.container}>
        <Header style={styles.header}>
            <Left style={{flex:1}}>
              <TouchableOpacity
                disabled={!this.state.canGoBack}
                onPress={this.onBack.bind(this)}>
              <Icon name='arrow-back' style={this.state.canGoBack ? styles.topbarText : styles.topbarTextDisabled} />
              </TouchableOpacity>
            </Left>
            <Body style={{flex:1}}>
              <Title>OnFarma</Title>
            </Body>
            <Right style={{flex:1}}>
              <TouchableOpacity
                onPress={this.goBasket.bind(this)}>
              <Icon name='cart' />
              </TouchableOpacity>
              <Badge size='8' style={(this.state.postMessage=='0' || this.state.postMessage=='') ? styles.badgeIconNone : styles.badgeIconInclude}><Text>{this.state.postMessage}</Text></Badge>
            </Right>
        </Header>

        <View style={styles.containerWeb}>
        <WebView
          ref={WEBVIEW_REF}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
          style={{flex:1}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          source={{uri: this.state.uri}}
          injectedJavaScript={jsCode}
          onMessage={this.onMessage} />
        </View>
      </View>
    );
  }

  onBack() {
    this.refs[WEBVIEW_REF].goBack();
  }

  goBasket() {
    this.state.uri = 'https://www.onfarma.it/carrello/';
    this.canGoBack = true;
    this.refs[WEBVIEW_REF].reload();
  }

  getCounter() {
    this.setState({ postMessage: e.nativeEvent.data });
  }

  checkConnection() {
    NetInfo.isConnected.fetch().then(isConnected => {
    console.log('First, is ' + (isConnected ? 'online' : 'offline'));
    // Works on both iOS and Android
    if (isConnected)
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
    //paddingTop: 15, /* Padding to push below the navigation bar */
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
  header: {
    //backgroundColor: '#008848',
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
    display: 'none',
    //paddingTop: 15,
    //width: 100,
    //position: 'absolute',
    //flex: 1,
    //flexDirection: 'row',
    //alignItems: 'center',
    //alignSelf: 'flex-end',
    //justifyContent: 'space-between'
  },
  topbarText: {
    //color: 'white',
    paddingLeft: 8,
    //paddingTop: 15,
    //width: 100,
    //position: 'absolute',
    //flex: 1,
    //flexDirection: 'row',
    //alignItems: 'center',
    //alignSelf: 'flex-end',
    //justifyContent: 'space-between'
  },
  basketIcon: {
    //color: 'gray',
    paddingRight: 8,
    //paddingTop: 15,
    width: 100,
    //flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
  },
  badgeIconNone: {
    display: 'none',
  },
  badgeIconInclude: {}
});