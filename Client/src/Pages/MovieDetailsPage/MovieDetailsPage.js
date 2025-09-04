import { useNavigate, useParams, useSearchParams,Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchMovieById } from '../../Api/HomeMovies';
import './MovieDetailsPage.css';
import Navbar from '../../Component/Navbar/Navbar';
import { Col, Flex, Input, Row } from "antd";
import { getShowsByMovieId } from '../../Api/Shows';



function MovieDetailsPage(){
    const navigate = useNavigate();


    const [movie, setMovie] = useState(null);

    const [shows, setShows] = useState(null);

    //making initial date as today's date
    const [searchParams, setSearchParams] = useSearchParams();
    const [date, setDate] = useState(searchParams.get('Date'));

    const params = useParams();
    const movieId = params.movieId;

    useEffect(() =>{
        const fetchMovieDetails = async () => {
            const movieDetails = await fetchMovieById(movieId);
            setMovie(movieDetails.data);
        };

        if (movieId) {
            fetchMovieDetails();
        }
    },[movieId])

    const handleDateChange = (e)=>{
        const selectedDate = e.target.value;
        setDate(selectedDate);
        navigate(`/homeMovies/${movie._id}?Date=${selectedDate}`)
    }

    //fetching Show Details from server with having call of api with dependent on date change
    useEffect(()=>{
        const fetchShowDetails = async()=>{
            const showDetails = await getShowsByMovieId(movieId, date);
            setShows(showDetails.data);
        }

        if(date){
            fetchShowDetails();
        }
    },[date])


    


    return <div>
        <Navbar/>
        {
            movie === null && <div className='loadingDetails'><h2>Fetching Movie Details...</h2></div>
        }
        
        { 
            
            movie!= null && (       
                <div className='MovieDetailsSection'>
                    <div className="container1">
                        <img className="MoviePoster" src={movie.poster} alt="moviePoster"></img>
                        <h4 className='ReleaseDate'> Release Date: {movie.releaseDate.split("T")[0]}</h4>
                    </div>

                    <div
                        className="movie-banner" 
                        style={{
                            backgroundImage:`linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${movie.poster})` ,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            boxShadow: `inset 150px 150px 150px 150px rgba(0, 0, 0, 0.7)`
                        }}>

                        <div className = "container2">
                            <h1 className='MovieName'>{movie.name}</h1>
                            <h4 className='MovieDescription'>{movie.description}</h4>
                            <div className='MovieMeta'>
                                <span className='MovieDuration'> Duration: {movie.duration}</span>
                                <span style={{ color: 'white', margin: '0 5px' }}>•</span>
                                <span className='MovieLanguage'> Language: {movie.language}</span>
                            </div>
                            <p className='MovieGenre'> Genre: {movie.genre.join(", ")}</p>

                            <div className = "BookingDate">
                                <label className='DateSectionLabel'>Choose Booking Date</label>
                                <input value={date} onChange={handleDateChange} className="DateSection" type="date"></input>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        {
            shows === null && <div className='loaderShows'><h2>Fetching Shows...</h2></div>
        }
        <div className='TheaterAndShowSection'>
            {
                shows && <div className='TandS1'>
                    <h3 style={{backgroundColor:' rgb(255, 101, 101)', height:'1.5rem', width:'20rem', display:'flex', justifyContent:'center', alignItems:'center' , marginBottom:'2.5rem', borderRadius:'3px', fontWeight:'700'}}> Theaters & Shows </h3>
                </div>
            }
            {
                shows && Object.keys(shows).length === 0 && <div><h2 className='noShows'>🎬 Oops! No shows for this movie on {date}. Try a different date or movie.</h2> </div>
            }

            {
                shows && Object.keys(shows).length > 0 && 
                <div className='TheaterAndShowDetails'>
                    {
                        Object.keys(shows).map((theaterId)=>{
                            const allShowsForThisTheater = shows[theaterId];
                            const TheaterDetails = allShowsForThisTheater[0].theater;

                            return <div className='Theaters'>
                                <Row gutter={24} >
                                    <Col span={12} className='TheaterColumn'>
                                        <h3 style={{color:'rgb(255, 101, 101)', fontSize:'18px'}}>{TheaterDetails.name}</h3>
                                        <p style={{fontSize:'10px'}}>{TheaterDetails.address}</p>
                                    </Col>

                                    <Col className='showColumn'>
                                        <ul className='show-ul'>
                                            {
                                                allShowsForThisTheater.map((show)=>{
                                                    return <Link to={`/book-show/${show._id}`}>
                                                        <li style={{fontSize:'12px'}}>{show.showTime}</li>
                                                    </Link>
                                                })
                                            }
                                        </ul>
                                    </Col>
                                </Row>
                            </div>
                        })
                    }
                </div>
            }
        </div>
    </div>
}

export default MovieDetailsPage;