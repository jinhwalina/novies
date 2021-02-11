import React, { useState } from "react";
import { Dimensions, PanResponder, Animated } from "react-native";
import styled from "styled-components/native";
import { apiImage } from '../../api';

const {width:WIDTH, height:HEIGHT} = Dimensions.get("window");

const Container = styled.View`
    flex: 1;
    background-color:black;
    align-items: center;
`;


const Poster = styled.Image`
    overflow: hidden;
    width: 100%;
    height: 100%;
    border-radius:20px;
`;

const styles= {
    top: 80,
    position: "absolute",
    height: HEIGHT / 1.5,
    width: "90%"
}

export default ({results}) => {
    const [topIndex, settopIndex] = useState(0);
    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, {dx, dy}) =>{
            position.setValue({x:dx,y:dy});
        },
        onPanResponderRelease: () => {
            Animated.spring(position, {
                toValue: {
                    x: 0,
                    y: 0
                },
                useNativeDriver: true,
            }).start(); // 적용할 animated를 시작해주는
        }
    });
    const rotationValues = position.x.interpolate({
        inputRange: [-100, 0 ,100],
        outputRange: ["-5deg", "0deg" ,"5deg"],
        extrapolate: "clamp"
        // 여기서 중요한점은, 음수에서 양수로 interpolate 해야한다. 
    })
    return (
        <Container>
            {results.map((result, index) => {
                if(index === topIndex) {
                    return (
                        <Animated.View style={{
                            ...styles,
                            zIndex : 1,
                            transform: [{rotate: rotationValues}, ...position.getTranslateTransform()]
                        }} key={result.id} {...panResponder.panHandlers}>
                            <Poster source={{uri: apiImage(result.poster_path)}} />
                        </Animated.View>
                    )
                }
                return (
                    <Animated.View style={{
                        ...styles,
                        zIndex: -index
                    }} key={result.id} {...panResponder.panHandlers}>
                        <Poster source={{uri: apiImage(result.poster_path)}} />
                    </Animated.View>
                )
            })}
        </Container>
    );
}
