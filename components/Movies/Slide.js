// 구분이 없는 components 폴더를 사용하면 내가 어디서 작업을 하고 있는지 모르기에,, 
// 니꼬는 이렇게 나눠서 작업하는걸 선호한다! 
import React from 'react';
import styled from 'styled-components/native';
import PropTypes from "prop-types";
import { apiImage } from "../../api";
import Poster from "../Poster";
import { TouchableOpacity } from 'react-native';


const Container = styled.View`
    height: 100%
    width: 100%
`;

const BG = styled.Image`
    height: 100%
    width: 100%
    opacity: 0.4;
    position: absolute;
`;

const Content = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    height: 100%
`;
const Data = styled.View`
    width: 50%;
    align-items: flex-start;
`;
const Title = styled.Text`
    color: white;
    font-weight: bold;
    font-size: 19px;
    margin-bottom: 10px;
`;
const Votes = styled.Text`
    color: rgb(220, 220, 220);
    margin-bottom: 7px;
    font-size: 12px;
    font-weight: 500;
`;
const Overview = styled.Text`
    color: rgb(220, 220, 220);   
    font-size: 14px;
    font-weight: 500;
`;

const Button = styled.View`
    background-color: red;
    padding: 7px 10px;
    margin-top: 10px;
    border-radius: 3px;
`;

const ButtonText = styled.Text`
    color: white;
`;

// Button은 TouchableOpacity에 view랑 text를 더해서 같이 갖고있는 컴포넌트다.
// 이모지 사용하는 단축키는 윈도우 + . ( 마침표 )


// 어떤 특정 props들을 보낼거라 PropTypes를 쓸거다 
const Slide =  ({id, title, backgroundImage, votes, overview, poster}) => (
    <Container>
        <BG source={{ uri: apiImage(backgroundImage) }} />
        <Content>
            <Poster url={apiImage(poster)}/>
            <Data>
                <Title>{title.length > 40 ? `${title.slice(0, 40)}...` : title}</Title>
                <Votes>⭐ {votes} / 10</Votes> 
                <Overview>{overview.slice(0, 110)}...</Overview>
                <TouchableOpacity>
                    <Button>
                        <ButtonText>View details</ButtonText>
                    </Button>
                </TouchableOpacity>
            </Data>
        </Content>
    </Container>
);

Slide.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
    overview: PropTypes.string.isRequired,
};

export default Slide;