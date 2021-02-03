import React from "react";
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { apiImage } from '../api';
import Poster from '../components/Poster';
import ScrollContainer from "../components/ScrollContainer";
import Votes from '../components/Votes';

const BG = styled.Image`
    width: 100%;
    height: ${Dimensions.get("window").height /3}px;
    opacity: 0.4;
    position: absolute;
`;

const Container = styled.View`

`;

const Header = styled.View``;
const Info = styled.View``;
const Title = styled.Text``;

export default ({
    navigation,
    route:{
        params: {id, title, backgroundImage, poster, votes}
    } 
}) => {
    // detail 페이지로 이동할때, 상단 detail이 아니라 해당하는 아이디의 제목을 나타내줌! 
    navigation.setOptions({title})
    return (
        <ScrollContainer>
            <Header>
                <BG source={{uri: apiImage(backgroundImage, "")}} />
                <Container>
                    <Poster url={poster} />
                    <Info>
                        <Title>{title}</Title>
                        <Votes votes={votes}></Votes>
                    </Info>
                </Container>
            </Header>
        </ScrollContainer>
    );
};