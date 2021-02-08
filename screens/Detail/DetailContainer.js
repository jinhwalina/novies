import React, { useState, useEffect } from "react";
import { movieApi } from '../../api';
import DetailPresenter from "./DetailPresenter";

export default ({
    navigation,
    route:{
        params: {id, title, backgroundImage, poster, votes, overview}
    } 
}) => {
    const [movie, setmovie] = useState({
        title,
        backgroundImage,
        poster,
        overview,
        votes
    });
    const getData = async() => {
        const [getMoive, getMovieError] = await movieApi.movie(id);
        setmovie({
            ...getMoive,
            title: getMoive.title,
            backgroundImage: getMoive.backdrop_path,
            poster: getMoive.poster_path,
            overview: getMoive.overview,
            votes: getMoive.vote_average
        })
    }

    useEffect(() => {
        getData();
    }, [id])

    React.useLayoutEffect(() => {
        navigation.setOptions({ title });
    })
    return <DetailPresenter {...movie} />;
};