// 구분이 없는 components 폴더를 사용하면 내가 어디서 작업을 하고 있는지 모르기에,, 
// 니꼬는 이렇게 나눠서 작업하는걸 선호한다! 
import React from 'react';
import styled from 'styled-components/native';
import PropTypes from "prop-types";
import { apiImage } from "../../api";
//import { Content, Data, Title } from 'react-native';

const Container = styled.View`
    height: 100%
    width: 100%
`;

const BG = styled.Image`
    height: 100%
    width: 100%
    opacity: 0.6;
    position: absolute;
`;

const Content = styled.View`
    flex-direction: row;
`;
const Data = styled.View`
    width: 50%;
`;
const Title = styled.Text`
    color: white;
    font-weight: bold;
    font-size: 18px;
`;
const Votes = styled.Text`
    color: white;
    opacity: 0.7;
`;
const Overview = styled.Text`
    color: white;
    opacity: 0.7;   
`;

// 어떤 특정 props들을 보낼거라 PropTypes를 쓸거다 
const Slide =  ({id, title, backgroundImage, votes, overview}) => (
    <Container>
        <BG source={{ uri: apiImage(backgroundImage) }} />
        <Content>
            <Data>
                <Title>{title}</Title>
                <Votes>{votes} / 10</Votes>
                <Overview>{overview}</Overview>
            </Data>
        </Content>
    </Container>
);

Slide.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
    overview: PropTypes.string.isRequired
};

export default Slide;