import './App.css';
import Home from './Pages/Home/Home.js'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./Pages/Login/Login.js";
import RegisterUser from "./Pages/Login/RegisterUser.js";
import ForgotPassword from "./Pages/Login/ForgotPassword.js";
import MovieDetailsPage from "./Pages/MovieDetailsPage/MovieDetailsPage.js";
import ProtectedRoute from './Component/ProtectedRoute/protectedRoute.js';
import BookShow from './Pages/BookShow/BookShow.js';
import ResetPassword from './Pages/Login/ResetPassword.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/homeMovies" element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
        <Route path="/registerUser" element={<RegisterUser/>}></Route>
        <Route path="/forgotPassword" element={<ForgotPassword/>}></Route>
        <Route path='/resetPassword' element={<ResetPassword/>}></Route>
        <Route path='/homeMovies/:movieId' element={<ProtectedRoute><MovieDetailsPage/></ProtectedRoute>}></Route>
        <Route path='/book-show/:showId' element={<ProtectedRoute><BookShow/></ProtectedRoute>}></Route>
      </Routes>  
    </BrowserRouter>

  );
}

export default App;
