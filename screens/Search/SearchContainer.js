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
        if(keyword === "") {
            return;
        } // 이 코드를 추가해주는 이유는 검색창에서 새로고침 할 경우 키워드가 없기때문에 에러가 생긴다. 그래서 널값인 경우 리턴해준다는 코드를 넣어준것! 
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