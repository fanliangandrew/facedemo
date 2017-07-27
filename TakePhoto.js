import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  StyleSheet
} from 'react-native';

import Camera from 'react-native-camera';
let common_url = "http://192.168.26.127:3245"

export default class TakePhoto extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.type}`,
  });
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    
    this.state = {
      isTaking: true,
      url: "",
      type: params.type
    };
    console.log("type:"+params.type)
  };

  render() {


    if (this.state.isTaking === true) {
      return (
        <View style={styles.container}>
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            style={styles.preview}
            aspect={Camera.constants.Aspect.fill}
            type={Camera.constants.Type.front}
          >
            <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
          </Camera>
        </View>
      );

    } else return (
      <View style={styles.container}>
        <Image style={styles.preview} source={{ uri: this.state.url }} >
          <View style={styles.handleBtns}>
            <Text style={styles.retake} onPress={this.reTake.bind(this)}>[重拍]</Text>
            <Text style={styles.upload} onPress={this.upload.bind(this)}>[使用]</Text>
          </View>
        </Image>

      </View>
    );
  };

  takePicture() {
    const options = {};
    const { goBack } = this.props.navigation;
    const { navigate } = this.props.navigation;
    //options.location = ...
    this.camera.capture({ metadata: options })
      .then((data) => {
        console.log(data);

        this.setState(previousState => {
          return {
            url: data.path,
            isTaking: !previousState.isTaking
          };
        })
        // navigate("Preview",{url:data.path})
        // goBack();
      })
      .catch(err => console.error(err));
  };

  reTake() {
    this.setState(previousState => {
      return {
        url: "",
        isTaking: !previousState.isTaking
      }
    })
  };
  upload() {
    let requestType = this.state.type=="register" ? "/detect":"/validate"

    let params = {
      path: this.state.url,
      userId: 'test001'
    }

    uploadImage(requestType, params)
      .then(res => {
        //请求成功
        if (res.header.statusCode == 'success') {
          //这里设定服务器返回的header中statusCode为success时数据返回成功
          //upLoadImgUrl = res.body.imgurl;  //服务器返回的地址
          console.log(res.body)
          Alert.alert("1:", "success")

        } else {
          //服务器返回异常，设定服务器返回的异常信息保存在 header.msgArray[0].desc
          console.log(res.header.msgArray[0].desc);
          Alert.alert("1:", "success with error")

        }
      }).catch(err => {
        //请求失败
        Alert.alert("1:", "fail")
      })
  }
}

function uploadImage(url, params) {
  return new Promise(function (resolve, reject) {
    let formData = new FormData();
    for (var key in params) {
      formData.append(key, params[key]);
    }
    let file = { uri: params.path, type: 'multipart/form-data', name: 'image.jpg' };
    formData.append("file", file);
    // Alert.alert("file:",file)
    fetch(common_url + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data;charset=utf-8'
        // ,"x-access-token": token,
      },
      body: formData,
    }).then((response) => response.json())
      .then((responseData) => {
        console.log('uploadImage', responseData);
        resolve(responseData);
      })
      .catch((err) => {
        console.log('err', err);
        reject(err);
      });
  });
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
  },
  handleBtns: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  retake: {
    flex: 1,
    textAlign: 'left',
    margin: 20,
    color: '#FF7700',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: '#C0C0C0',
    textShadowOffset: { width: 2, height: 2 }
  },
  upload: {
    flex: 1,
    textAlign: 'right',
    margin: 20,
    color: '#FF7700',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: '#C0C0C0',
    textShadowOffset: { width: 2, height: 2 }
  }

});