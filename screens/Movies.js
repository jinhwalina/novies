import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { movieApi } from '../api';

export default () => {
    // const [nowPlaying, setnowPlaying] = useState({
    //     movies: [],
    //     error: null
    // });
    const [movies, setmovies] = useState({
        nowPlaying: [],
        popular: [],
        upcoming: [],
        nowPlayingError: null,
        popularError: null,
        upcoming: null
    })
    const getData = async() => {
        // try {
        //     const { data: {results} } = await movieApi.nowPlaying();
        //     setnowPlaying({
        //         movies: results,
        //         error: null
        //     });
        // } catch (e) {
        //     setnowPlaying({
        //         error: e
        //     });
        // }
        const [nowPlaying, nowPlayingError] = await movieApi.nowPlaying();
        const [popular, popularError] = await movieApi.popular();
        const [upcoming, upcomingError] = await movieApi.upcoming();
        setmovies({
            nowPlaying, 
            popular, 
            upcoming, 
            nowPlayingError, 
            popularError, 
            upcomingError
        });
        console.log(popular, popularError);
    };
    useEffect(() => {
        getData();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor:"black"}}>
            <Text style={{ color:"white" }}>{movies.nowPlaying?.length}</Text> 
        </View>
    );
    // 위처럼 작성하면 화면에 20이 찍힌다. 
};

// home은 screen이다. navigator의 모든 screen은 navigation이란 prop에 접근권을 가지고있다. 
// 그리고 navigation 과 함께 우린 navigate할 수 있다. 