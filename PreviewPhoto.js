import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';

export default class PreviewPhoto extends Component {
  static navigationOptions = {
    title: 'preview'
  };

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <Image source={{ uri: params.url }}  />
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});