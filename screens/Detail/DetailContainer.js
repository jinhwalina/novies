import React, { useState, useEffect } from "react";
import { movieApi, tvApi } from '../../api';
import DetailPresenter from "./DetailPresenter";
import * as WebBrowser from 'expo-web-browser';

export default ({
    navigation,
    route:{
        params: {isTv, id, title, backgroundImage, poster, votes, overview}
    } 
}) => {
    const [loading, setloading] = useState(true);
    const [detail, setdetail] = useState({
        loading: true,
        result: {
            title,
            backgroundImage,
            poster,
            overview,
            votes
        }
    });
    const getData = async () => {
        const [getDetail, getDetailError] = isTv ? await tvApi.show(id) : await movieApi.movie(id);
        setdetail({
            loading:false,
            result: {
                ...getDetail,
                title: getDetail.title || getDetail.name,
                backgroundImage: getDetail.backdrop_path,
                poster: getDetail.poster_path,
                overview: getDetail.overview,
                votes: getDetail.vote_average
            }
        });
    };

    useEffect(() => {
        getData();
    }, [id])

    React.useLayoutEffect(() => {
        navigation.setOptions({ title });
    })

    const openBrowser = async(url) => {
        await WebBrowser.openBrowserAsync(url);
    } 

    return <DetailPresenter openBrowser={openBrowser} {...detail}/>;
};