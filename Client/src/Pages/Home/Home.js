import Banner from "../../Component/Banner/Banner";
import MovieList from "../../Component/MovieList/MovieList";
import AfterLogInNavbar from '../../Component/AfterLogInNavbar/AfterLoggedInNavbar';
import { useState } from "react";

function Home(){
    const [searchValue, setSearchValue] = useState("");

    return <div className="home-page">
        <AfterLogInNavbar searchValue={searchValue} setSearchValue={setSearchValue}/>
        <Banner/>
        <MovieList searchValue={searchValue}/>
    </div>
}

export default Home;