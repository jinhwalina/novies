import React from "react";
import styled from 'styled-components/native';
import Swiper from "react-native-web-swiper";
import { ActivityIndicator, View, Dimensions, ScrollView } from 'react-native';
import Slide from "../../components/Movies/Slide";
import Title from "../../components/Title";
import Vertical from '../../components/Vertical';
import Horizontal from '../../components/Horizontal';

const {width:WIDTH, height:HEIGHT} = Dimensions.get("window"); 
// get("screen")을 사용하게되면 웹에서 볼 때 포스터가 중간에 위치하고, width의 길이를 길게 사용하게된다. 
// 그래서 window로 바꿔줘야함! 

const SliderContainer = styled.View`
    width: 100%;
    height: ${HEIGHT / 4}px;
    margin-bottom: 50px;
`;

const Container = styled.View``;

const UpcomingContainer = styled.View`
    margin-top: 20px
`;

// timeout 은 자동적으로 얼마나 기다려야하는지..이다 초 단위로 
export default ({ loading, nowPlaying, popular, upcoming }) => (
    <ScrollView 
            style={{backgroundColor:"black"}}
            contentContainerStyle={{
                justifyContent: loading ? "center" : "flex-start"
            }}
        
        >
        {loading ? (
            <ActivityIndicator color="white" size="small" />
        ) : (
            <>
            <SliderContainer>
                <Swiper controlsEnabled={false} loop timeout={3}>
                    {nowPlaying.map(movie => (
                        <Slide 
                            key={movie.id} 
                            id={movie.id} 
                            title={movie.original_title}
                            overview={movie.overview}
                            votes={movie.vote_average}
                            backgroundImage={movie.backdrop_path}
                            poster={movie.poster_path}
                        />
                    ))}
                </Swiper>
            </SliderContainer>
            <Container>
                <Title title={"Popular Movies"} />
                <ScrollView 
                    style={{ marginTop: 20, marginBottom: 40 }}
                    contentContainerStyle={{paddingLeft:30}} 
                    horizontal showsHorizontalScrollIndicator={false}
                >
                    {popular.map(movie => (
                        <Vertical 
                            id={movie.id}
                            key={movie.id} 
                            poster={movie.poster_path} 
                            title={movie.original_title} 
                            votes={movie.vote_average} 
                        />
                    ))}
                </ScrollView>
                <Title title={"Coming soon"} />
                <UpcomingContainer>
                    {upcoming.map(movie => (
                        <Horizontal 
                            key={movie.id} 
                            id={movie.id} 
                            title={movie.title}
                            releaseDate={movie.release_date}
                            overview={movie.overview}
                            poster={movie.poster_path} 
                        />
                    ))}
                </UpcomingContainer>
            </Container>
            </>
        )}
    </ScrollView>
);