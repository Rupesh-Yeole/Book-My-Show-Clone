import { useEffect, useRef, useState } from "react";
import { fetchAllMovies } from "../../Api/HomeMovies";
import './MovieCard.css';
import '../../Pages/Home/Home.css';
import {Link} from 'react-router-dom';
import moment from "moment";

function MovieList({searchValue}){

    const [movies, setMovies] = useState(null);
    const allMoviesRef = useRef(null);

    useEffect(()=>{
        const token = localStorage.getItem('accessToken');
        const fetchMovies = async()=>{
            const moviesData = await fetchAllMovies();
            allMoviesRef.current = moviesData.data;
            setMovies(moviesData.data);
        }
        
        if (token){
            fetchMovies();
        }
    },[])
        
    useEffect(()=>{
        if (!allMoviesRef.current){
            return;
        }
        const filteredMovies = allMoviesRef.current.filter((movie) =>{
            return movie.name.toLowerCase().includes(searchValue.toLowerCase())
        })
        setMovies(filteredMovies);
    
    },[searchValue]);

    return <div className="MovieListSection">
        {
            movies == null &&<div> <h2> fetching movie details... </h2></div>
        }

        {
            movies && movies.map((movie, index)=>{
                return<div className="MovieCard" key={index}>
                    <Link to={`/homeMovies/${movie._id}?Date=${moment().format("YYYY-MM-DD")}`}>
                        <img className="moviePoster" src={movie.poster} alt="poster"></img>
                        <h3 className="movieName">{movie.name}</h3>
                    </Link>
                </div>

            }) 
        }
    </div>
}

export default MovieList;