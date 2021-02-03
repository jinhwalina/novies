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

const getAnything = async(path, params = {}) => {
    try {
        const {
            data: {results},
            data
        } = await makeRequest(path, params);
        
        return [results || data, null]
    } catch(e) {
        return [null, e]
    }
};
// 기본적으로 파라미터는 빈 object가 된다. 
export const movieApi = {
    nowPlaying: () => getAnything("/movie/now_playing"),
    popular: () => getAnything("/movie/popular"),
    upcoming: () => getAnything("/movie/upcoming", {region: "kr"}),
    search: query => getAnything("/search/movie/", { query }),
    movie: id => getAnything(`/movie/${id}`),
    discover: () => getAnything("/discover/movie/")
};

export const tvApi = {
    today: () => getAnything("/tv/airing_today"),
    thisWeek: () => getAnything("/tv/on_the_air"),
    topRated: () => getAnything("/tv/top_rated"),
    popular: () => getAnything("/tv/popular"),
    search: query => getAnything("/search/tv/", { query }),
    show: id => getAnything(`/tv/${id}`)
};

export const apiImage = (path, defaultPoster= "https://images.unsplash.com/photo-1571847140471-1d7766e825ea?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTR8fHBvc3RlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60") => path ? `https://image.tmdb.org/t/p/w500${path}` : defaultPoster;