// axios는 request를 위한 library!!

import axios from "axios";

const TMDB_KEY = "e2bce8028065e839bfbde219a3a62a8c"

// request를 만드는 function 
// * 니꼬의 특징! 오직 하나의 일만 하는 매~~~~우 작은 function들을 만드는것을 좋아함 ㅎㅎ 

const makeRequest = (path, params) => 
    axios.get(`https://api.themoviedb.org/3${path}`,{
        params: {
            ...params,
            api_key: TMDB_KEY
        }
    });
// 여기서 request는 path 로 간다. 그리고 파라미터! 

export const movieApi = {
    nowPlaying: () => makeRequest(),
    popular: () => makeRequest(),
    upcoming: () => makeRequest(),
    search: word => makeRequest(),
    movie: id => makeRequest(),
    discover: () => makeRequest()
}

export const tvApi = {
    today: () => makeRequest(),
    thisWeek: () => makeRequest(),
    topRated: () => makeRequest(),
    popular: () => makeRequest(),
    search: word => makeRequest(),
    show: id => makeRequest()
}