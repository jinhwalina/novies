import React from "react";
import styled from 'styled-components/native';
import Swiper from "react-native-web-swiper";
import { ActivityIndicator, Dimensions } from 'react-native';

const {width, height} = Dimensions.get("screen");

const Container = styled.View`
    flex: 1;
    background-color: black;
    justify-content: center;
`;

const Header = styled.View`
    width: 100%;
    height: ${height / 3}px;
`;

const Section = styled.View`
    background-color: red;
    height:100%;
`;

const Text = styled.Text``;


// timeout 은 자동적으로 얼마나 기다려야하는지..이다 초 단위로 
export default ({ loading, nowPlaying }) => (
    <Container>
        {loading ? (
            <ActivityIndicator color="white" size="small" />
        ) : (
            // 이렇게 적어주게 되면 각 슬라이더에 nowPlaying 요소가 담긴다! 
            <Header>
                <Swiper controlsEnabled={false} loop timeout={3}>
                    {nowPlaying.map(movie => (
                        <Section key={movie.id}>
                            <Text>{movie.original_title}</Text>
                        </Section>
                    ))}
                </Swiper>
            </Header>
        )}
    </Container>
);