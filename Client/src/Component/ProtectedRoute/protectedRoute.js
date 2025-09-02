import{Navigate} from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({children}){
    const token = localStorage.getItem('accessToken');

    if (!token){
        return <Navigate to='/' replace/>;
    }

    try{
        const decode = jwtDecode(token);
        if (decode.exp * 1000 < Date.now()){
            localStorage.removeItem('accessToken');
            return <Navigate to='/' replace/>;
        }
    }catch(err){
        localStorage.removeItem('accessToken');
        return <Navigate to='/' replace/>;
    }

    return children;
}

export default ProtectedRoute;