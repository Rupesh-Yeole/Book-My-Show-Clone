import { axiosInstance } from "./AxiosInstance"

export const getShowsByMovieId = async(movieId, date) =>{
    try{
        const response = await axiosInstance.get(`${process.env.REACT_APP_BASE_URL}/shows/movies/${movieId}?showDate=${date}`);
        return response.data;
    }catch(err){
        console.log(err);
        return err.response.data;
    }
}

export const getShowDetails = async(showId) =>{
    try{
        const response = await axiosInstance.get(`${process.env.REACT_APP_BASE_URL}/shows/${showId}`);
        return response.data;
    }catch(err){
        console.log(err);
        return err.response.data;
    }
}