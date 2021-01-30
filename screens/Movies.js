import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { movieApi } from '../api';

export default () => {
    // const [nowPlaying, setnowPlaying] = useState({
    //     movies: [],
    //     error: null
    // });
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
        const [nowPlaying, error] = await movieApi.nowPlaying();
        const [popular, popularError] = await movieApi.popular();
        console.log(popular, popularError);
    };
    useEffect(() => {
        getData();
    }, []);
    return (
        <View style={{ flex: 1, backgroundColor:"black"}}>
            <Text>Movies</Text>
        </View>
    );
};

// home은 screen이다. navigator의 모든 screen은 navigation이란 prop에 접근권을 가지고있다. 
// 그리고 navigation 과 함께 우린 navigate할 수 있다. 