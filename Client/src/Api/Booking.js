import { axiosInstance } from "./AxiosInstance";
 
export const createBooking = async(data) =>{
    try{
        const response = await axiosInstance.post(`${process.env.REACT_APP_BASE_URL}/bookings`, data);
        return response.data;
    }catch(err){
        console.log(err);
        return err.response.data;
    }
}

export const makePayment = async(data) =>{
    try{
        const response = await axiosInstance.post(`${process.env.REACT_APP_BASE_URL}/payments`, data);
        return response.data;
    }catch(err){
        console.log(err.response.data);
        return err.response.data;
    }
}

