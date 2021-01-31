import React from "react";
import styled from 'styled-components/native';
import Swiper from "react-native-web-swiper";
import { ActivityIndicator } from 'react-native';
import Slide from "../../components/Movies/Slide";


const Container = styled.View`
    flex: 1;
    background-color: black;
    justify-content: center;
`;


// timeout 은 자동적으로 얼마나 기다려야하는지..이다 초 단위로 
export default ({ loading, nowPlaying }) => (
    <Container>
        {loading ? (
            <ActivityIndicator color="white" size="small" />
        ) : (
            // 이렇게 적어주게 되면 각 슬라이더에 nowPlaying 요소가 담긴다! 
            <>
                <Swiper controlsEnabled={false} loop timeout={3}>
                    {nowPlaying.map(movie => (
                        <Slide 
                            key={movie.id} 
                            id={movie.id} 
                            title={movie.original_language}
                            overview={movie.overview}
                            votes={movie.vote_average}
                            backgroundImage={movie.backdrop_path}
                        />
                    ))}
                </Swiper>
            </>
        )}
    </Container>
);