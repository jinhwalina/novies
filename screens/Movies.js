import React from "react";
import { View, Text, Button } from "react-native";

export default ({navigation}) => (
    <View>
        <Text>Movies</Text>
        <Button title="Movie" onPress={()=> navigation.navigate("Detail")} />
    </View>
);

// home은 screen이다. navigator의 모든 screen은 navigation이란 prop에 접근권을 가지고있다. 
// 그리고 navigation 과 함께 우린 navigate할 수 있다. 