import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import AppLoading from "expo-app-loading"; // apploading import 해오지 못하는 문제 해결 import 문구 수정하고, npm install 해줬다.
import * as Font from "expo-font";
import { Text, Image, View } from "react-native";
import { Asset } from 'expo-asset';
import { Ionicons } from '@expo/vector-icons';

// 이미지
const cacheImages = (images) => images.map(image => {
  if(typeof image === "string"){
    return Image.prefetch(image)
  } else {
    return Asset.fromModule(image).downloadAsync();
  }
})

// 아이콘
const cacheFonts = fonts => fonts.map(font => [Font.loadAsync(font), Font.loadAsync(font)])

export default function App() {
  const [isReady, setisReady] = useState(false);
  const loadAssets = () => { 
    const images = cacheImages( // images는 promise 들의 array다. 
      ["https://images.unsplash.com/photo-1552053831-71594a27632d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=912&q=80",
      require("./assets/splash.png")
    ]);
    const fonts = cacheFonts([Ionicons.font]);
    return Promise.all([...images, ...fonts]);
    // console.log(fonts);
    // console.log(images);
  };
  const onFinish = () => setisReady(true);
  return isReady ? (
    <View>
      <Text>I'm not ready..!!!!!</Text>
    </View>
  ) : (
    <AppLoading 
      startAsync={loadAssets} 
      onFinish={onFinish} 
      onError={console.error}
    />
  ); 
}
