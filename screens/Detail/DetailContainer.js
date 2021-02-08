import React, { useState, useEffect } from "react";
import { movieApi, tvApi } from '../../api';
import DetailPresenter from "./DetailPresenter";

export default ({
    navigation,
    route:{
        params: {isTv, id, title, backgroundImage, poster, votes, overview}
    } 
}) => {
    const [loading, setloading] = useState(true);
    const [movie, setmovie] = useState({
        title,
        backgroundImage,
        poster,
        overview,
        votes
    });
    const getData = async () => {
        if(isTv) {
            const [getMoive, getMovieError] = await tvApi.show(id);
        } else {
            const [getMoive, getMovieError] = await movieApi.movie(id);
        }
        setmovie({
            ...getMoive,
            title: getMoive.title,
            backgroundImage: getMoive.backdrop_path,
            poster: getMoive.poster_path,
            overview: getMoive.overview,
            votes: getMoive.vote_average
        });
        setloading(false);
    };

    useEffect(() => {
        getData();
    }, [id])

    React.useLayoutEffect(() => {
        navigation.setOptions({ title });
    })
    return <DetailPresenter movie={movie} loading={loading} />;
};