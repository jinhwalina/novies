import React from "react";
import { View, Text } from "react-native";

export default ({
    navigation,
    route:{
        params: {id, title}
    } 
}) => {
    // detail 페이지로 이동할때, 상단 detail이 아니라 해당하는 아이디의 제목을 나타내줌! 
    navigation.setOptions({title})
    return (
        <View>
            <Text>{id}</Text>
        </View>
    );
};