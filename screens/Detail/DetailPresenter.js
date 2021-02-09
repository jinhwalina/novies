import React from "react";
import { ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { apiImage } from '../../api';
import Poster from '../../components/Poster';
import ScrollContainer from "../../components/ScrollContainer";
import Votes from '../../components/Votes';
import { formatDate } from '../../utils';
import * as WebBrowser from 'expo-web-browser';
import Link from '../../components/Detail/Link';

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
    margin-top: 30px;
`;
const DataName = styled.Text`
    margin-top: 30px;
    color: white;
    opacity: 0.8;
    font-weight: 800;
    margin-bottom: 15px;
`;

const DataValue = styled.Text`
    color: white;
    opacity: 0.8;
    font-weight: 500;
`;

export default ({ openBrowser, result, loading }) => (
    // detail 페이지로 이동할때, 상단 detail이 아니라 해당하는 아이디의 제목을 나타내줌! 
    // navigation.setOptions({title})

        <ScrollContainer loading={false} contentContainerStyle={{paddingBottom: 80}} >
            <>
            <Header>
                <BG source={{uri: apiImage(result.backgroundImage, "")}} />
                <Container>
                    <Poster url={result.poster} />
                    <Info>
                        <Title>{result.title}</Title>
                        {result.votes && <Votes votes={result.votes} />}
                    </Info>
                </Container>
            </Header>
            <Data>

            {/* 내용 */}
            {result.overview && (
                    <>
                        <DataName>Overview</DataName>
                        <DataValue>{result.overview}</DataValue>
                    </>
            )}
            {loading && <ActivityIndicator style={{marginTop: 30}} color="white" size="small" />}

            {/* 언어 */}
            {result.spoken_languages && (
                <>
                    <DataName>Languages</DataName>
                    <DataValue>
                        {result.spoken_languages.map(l => `${l.name} `)}
                    </DataValue>
                </>
            )}

            {/* 개봉날짜 */}
            {result.release_date && (
                <>
                    <DataName>Release Date</DataName>
                    <DataValue>{formatDate(result.release_date)}</DataValue>
                </>
            )}

            {/* release 상태 */}
            {result.status && (
                <>
                    <DataName>Status</DataName>
                    <DataValue>{result.status}</DataValue>
                </>
            )}

            {/* 러닝타임 */}
            {result.runtime && (
                <>
                    <DataName>Runtime</DataName>
                    <DataValue>🎬 {result.runtime} minutes</DataValue>
                </>
            )}

            {/* 첫 방영날짜 (tv) */}
            {result.first_air_date && (
                <>
                    <DataName>First Air Date</DataName>
                    <DataValue>{formatDate(result.first_air_date)}</DataValue>
                </>
            )}

            {/* 장르 */}
            {result.genres && (
                <>
                    <DataName>Genres</DataName>
                    <DataValue> 
                        {result.genres.map((g, index) => index + 1 === result.genres.length ? g.name : `${g.name}, `)}
                        {/* , 가 마지막에도 계속 붙기때문에 이를 설정해주기 위한 코드를 추가로 작성해줬다! */}
                    </DataValue>
                </>
            )}

            {/* 에피소드 */}
            {result.number_of_episodes && (
                <>
                    <DataName>Seasons / Episodes</DataName>
                    <DataValue>{result.number_of_seasons} / {result.number_of_episodes}</DataValue>
                </>
            )}

            {result.imdb_id && (
                <Link 
                    text={"IMDB PAGE"}
                    icon={"imdb"}
                    onPress={()=> 
                        openBrowser(`https://www.imdb.com/title/${result.imdb_id}`)
                    } 
                />

            )}

            </Data>
            </>
        </ScrollContainer>
);