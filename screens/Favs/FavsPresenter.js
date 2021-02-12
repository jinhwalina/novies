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
    // 현재 맨 위에 있는 카드의 값을 증가시켜주고있다. 
    const nextCard = () => settopIndex(currentValue => currentValue + 1)
    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, {dx, dy}) =>{
            position.setValue({x:dx,y:dy});
        },
        onPanResponderRelease: (evt, {dx, dy}) => {
            if(dx >= 250) {
                Animated.spring(position, {
                    toValue: {
                        x: WIDTH + 100,
                        y: dy
                    }
                }).start(nextCard);
            } else if (dx <= -250) {
                Animated.spring(position, {
                    toValue: {
                        x: -WIDTH - 100,
                        y: dy
                    }
                }).start(nextCard);
            } else {
                Animated.spring(position, {
                    toValue: {
                        x: 0,
                        y: 0
                    },
                    //useNativeDriver: true,
                }).start(); // 적용할 animated를 시작해주는
            }
        }
    });
    // 카드를 이동할때 움직이는 애니메이션 동작 각도
    const rotationValues = position.x.interpolate({
        inputRange: [-255, 0 ,255], // x 좌표값이 이 줄의 값이라면
        outputRange: ["-8deg", "0deg" ,"8deg"], // 나에게 이렇게 보여달라! ( 이 범위 안에서 ) 값들은 (3개) 위에 있는 값들과 일치되어야한다. 
        extrapolate: "clamp"
        // 여기서 중요한점은, 음수에서 양수로 interpolate 해야한다. 
    });
    // 카드를 움직일 때 투명도
    const secondCardOpacity = position.x.interpolate({
        inputRange: [-255, 0 ,255],
        outputRange: [1, 0.2 ,1],
        extrapolate: "clamp"
    })
    const secondCardScale = position.x.interpolate({
        inputRange: [-255, 0 ,255],
        outputRange: [1, 0.8 ,1],
        extrapolate: "clamp"
    })
    return (
        <Container>
            {results.map((result, index) => {
                if(index < topIndex) {
                    return null
                }
                // 첫번째 보여지는 카드 
                else if(index === topIndex) {
                    return (
                        <Animated.View style={{
                            ...styles,
                            zIndex : 1,
                            transform: [{rotate: rotationValues}, ...position.getTranslateTransform()]
                        }} key={result.id} {...panResponder.panHandlers}>
                            <Poster source={{uri: apiImage(result.poster_path)}} />
                        </Animated.View>
                    )
                // 두번째로 보여지는 카드 ( 투명도가 설정되어있다. )
                } else if (index === topIndex + 1) {
                    return (
                        <Animated.View style={{
                            ...styles,
                            zIndex: -index,
                            opacity: secondCardOpacity,
                            transform: [{scale: secondCardScale}]
                        }} key={result.id} {...panResponder.panHandlers}>
                            <Poster source={{uri: apiImage(result.poster_path)}} />
                        </Animated.View>
                    )
                } else {
                // 그 외 나머지 카드들은 투명도를 0으로 가진다. 
                    return (
                        <Animated.View style={{
                            ...styles,
                            zIndex: -index,
                            opacity: 0
                        }} key={result.id} {...panResponder.panHandlers}>
                            <Poster source={{uri: apiImage(result.poster_path)}} />
                        </Animated.View>
                    ) 
                }          
            })}
        </Container>
    );
}
// 첫 번째 카드는 index가 0일 것이다.
// currentIndex도 마찬가지로 0이다. 
// 그럼 이 카드는 맨 위가 되는거다. 
// 하지만 우리가 첫 번째 카드를 버린다면 currentIndex 즉, topIndex가 1이 될것이다. 
// 그래서 이 카드는 더이상 맨 윗 카드가 아닌거고, 우린 이걸 Render 할 필요가 없다. 
// Index가 증가할수록 더 많은 카드를 Render 하지 않는것이다. 