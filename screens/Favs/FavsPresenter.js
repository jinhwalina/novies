import React from "react";
import { Dimensions, PanResponder } from "react-native";
import styled from "styled-components/native";
import { apiImage } from '../../api';

const {width:WIDTH, height:HEIGHT} = Dimensions.get("window");

const Container = styled.View`
    flex: 1;
    background-color:black;
    align-items: center;
`;

const Card = styled.View`
    top: 80px;
    position: absolute;
    height: ${HEIGHT / 1.5}px;
    width: 90%;
`;

const Poster = styled.Image`
    overflow: hidden;
    width: 100%;
    height: 100%;
    border-radius:20px;
`;


export default ({results}) => {
    
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, {dx}) =>{
            console.log(dx)
        }
    })
    return (
        <Container>
            {results.reverse().map(result => 
                <Card key={result.id} {...panResponder.panHandlers}>
                    <Poster source={{uri: apiImage(result.poster_path)}} />
                </Card>
            )}
        </Container>
    );
}
