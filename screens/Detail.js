import React from "react";
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { apiImage } from '../api';
import Poster from '../components/Poster';
import ScrollContainer from "../components/ScrollContainer";
import Votes from '../components/Votes';

const BG = styled.Image`
    width: 100%;
    height: 100%;
    opacity: 0.4;
    position: absolute;
`;

const Container = styled.View`
    flex-direction: row;
    align-items: center;
    top: 30px;
`;

const Header = styled.View`
    height: ${Dimensions.get("window").height /3}px;
    align-items: center;
    justify-content: flex-end;
    
`;
const Info = styled.View`
    width: 50%;
    margin-left: 40px;

`;
const Title = styled.Text`
    color: white;
    font-weight: 600;
    font-size: 24px;
    margin-bottom: 10px;
`;

const Data = styled.View`
    padding: 0px 30px;
    margin-top: 80px;
`;
const DataName = styled.Text`
    color: white;
    opacity: 0.8;
    font-weight: 800;
    margin-bottom: 5px;
`;

const DataValue = styled.Text`
    color: white;
    opacity: 0.8;
    font-weight: 500;
`;

export default ({
    navigation,
    route:{
        params: {id, title, backgroundImage, poster, votes, overview}
    } 
}) => {
    // detail 페이지로 이동할때, 상단 detail이 아니라 해당하는 아이디의 제목을 나타내줌! 
    navigation.setOptions({title})
    return (
        <ScrollContainer>
            <>
            <Header>
                <BG source={{uri: apiImage(backgroundImage, "")}} />
                <Container>
                    <Poster url={poster} />
                    <Info>
                        <Title>{title}</Title>
                        {votes && <Votes votes={votes} />}
                    </Info>
                </Container>
            </Header>
            <Data>
            {overview && (
                    <>
                        <DataName>Overview</DataName>
                        <DataValue>{overview}</DataValue>
                    </>
            )}
            </Data>
            </>
        </ScrollContainer>
    );
};