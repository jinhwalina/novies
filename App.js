import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import AppLoading from "expo-app-loading"; // apploading import 해오지 못하는 문제 해결 import 문구 수정하고, npm install 해줬다.
import { Text, Image } from "react-native";
import { Asset } from 'expo-asset';

const cacheImages = (images) => images.map(image => {
  if(typeof image === "string"){
    return Image.prefetch(image)
  } else {
    return Asset.fromModule(image).downloadAsync();
  }
})

export default function App() {
  const [isReady, setisReady] = useState(false);
  const loadAssets = async () => { 
    const images = cacheImages( // images는 promise 들의 array다. 
      ["https://images.unsplash.com/photo-1552053831-71594a27632d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=912&q=80",
      require("./assets/splash.png")
    ]);
    console.log(images);
  };
  const onFinish = () => setisReady(true);
  return isReady ? <Text>I'm not ready..!!!!!</Text> : <AppLoading startAsync={loadAssets} onFinish={onFinish} onError={console.error}/>; 
}
