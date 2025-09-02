import { axiosInstance } from "./AxiosInstance"

export const fetchAllMovies = async(data) =>{
    try{
        const response = await axiosInstance.get(`${process.env.REACT_APP_BASE_URL}/homeMovies`);
        return response.data;
    }catch(err){
        console.log(err);
        return err.response.data;
    }
}

export const fetchMovieById = async(movieId) =>{
    try{
        const response = await axiosInstance.get(`${process.env.REACT_APP_BASE_URL}/homeMovies/${movieId}`);
        return response.data;
    }catch(err){
        console.log(err);
        return err.response.data;
    }
}