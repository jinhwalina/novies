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
    })

    return (
        <Container>
            {results.reverse().map((result, index) => {
                if(index === topIndex) {
                    return (
                        <Animated.View style={{
                            ...styles,
                            zIndex : 1,
                            transform: [...position.getTranslateTransform()]
                        }} key={result.id} {...panResponder.panHandlers}>
                            <Poster source={{uri: apiImage(result.poster_path)}} />
                        </Animated.View>
                    )
                }
                return (
                    <Animated.View style={{
                        ...styles,
                    }} key={result.id} {...panResponder.panHandlers}>
                        <Poster source={{uri: apiImage(result.poster_path)}} />
                    </Animated.View>
                )
            })}
        </Container>
    );
}
