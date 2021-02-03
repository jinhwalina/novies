import React, { useState } from "react";
import { movieApi, tvApi } from '../../api';
import SearchPresenter from "./SearchPresenter";

export default () => {
    const [keyword, setkeyword] = useState("");
    const [results, setresults] = useState({
        movies: [],
        shows: [],
        movieError: null,
        showsError: null
    })
    const onChange = (text) => setkeyword(text);
    // const onSubmit = () => console.log("search for", keyword);
    const search = async () =>{ // search는 async가 되어야 한다.
        const [movies, movieError] = await movieApi.search(keyword);
        const [shows, showsError] = await tvApi.search(keyword);
        setresults({
            movies,
            shows,
            movieError,
            showsError
        });
    };
    console.log(results);
    return (
        <SearchPresenter 
            {...results}
            onChange={onChange}
            onSubmit={search} 
            keyword={keyword}
        />
    );
};