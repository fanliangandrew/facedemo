/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View
} from 'react-native';

import Camera from 'react-native-camera';
import { StackNavigator } from 'react-navigation'
import TakePhoto from './TakePhoto';
import PreviewPhoto from './PreviewPhoto'

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome'
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.loginView}>
          <Button
            onPress={() => navigate('Photo',{user:"testing",type:"register"})}
            title="注册"
            accessibilityLabel="Learn more about this purple button"
            color="#6495ed"
          />  
        </View>

        <View style={styles.loginView}>
          <Button
            onPress={() => navigate('Photo',{user:"testing",type:"login"})}
            title="登录"
            accessibilityLabel="Learn more about this purple button"
            color="#6495ed"
          />
        </View>

        <Text style={styles.welcome}>
          Welcome to face validation demo!
        </Text>
        <Text style={styles.instructions}>
          Step1 : register your face to server {'\n'}
          Step2 : sign in and validation
        </Text>
      </View>
    )
  }

  onPressLearnMore() {
    console.log("testing")
  }
}

const faceDemo = StackNavigator({
  Home: { screen: HomeScreen },
  Photo: { screen: TakePhoto },
  Preview:{ screen: PreviewPhoto }
})

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
    textAlign: 'left',
    color: '#333333',
    marginBottom: 5,
  },
  loginView:{
    width:150,
    height:50,
    margin:20
  }
});

AppRegistry.registerComponent('faceDemo', () => faceDemo);
