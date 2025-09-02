import { axiosInstance } from "./AxiosInstance"


export const login = async(data) =>{
    try{
        const response = await axiosInstance.post(`${process.env.REACT_APP_BASE_URL}/users/login`, data);
        return response.data;
        
    }catch(err){
        console.log(err);
        return err.response.data;
    }
}

export const registerUser = async(data)=>{
    try{
        const response = await axiosInstance.post(`${process.env.REACT_APP_BASE_URL}/users/registerUser`, data);
        return response.data;
    }catch(err){
        console.log(err);
        return err.response.data;
    }
}

export const forgotPasswordAPI = async(data) =>{
    try{
        const response = await axiosInstance.post(`${process.env.REACT_APP_BASE_URL}/users/forgotPassword`, data);
        return response.data;
    }
    catch(err){
        console.log(err);
        return err.response.data;
    }
}

export const resetPasswordAPI = async(data)=>{
    try{
        const response = await axiosInstance.post(`${process.env.REACT_APP_BASE_URL}/users/resetPassword`, data);
        return response.data;
    }
    catch(err){
        console.log(err);
        return err.response.data;
    }
}