import logoBookMyShow from "../../Assets/Bookmyshow-logoid.png"
import './NavbarAfter.css';
import {Link, useNavigate} from "react-router-dom";

function Navbar({searchValue, setSearchValue}){

    const navigate = useNavigate();
    const logout = ()=>{
        localStorage.removeItem("accessToken");
        navigate("/")
    }

    const searchValueChange = (e)=>{
        setSearchValue(e.target.value);
    }
    
    return <div className="navbar">
            <div className="navbar-left">
                <Link to="/homeMovies">
                <img className="logo" src={logoBookMyShow} alt="BookMyShow Logo" />
                </Link>
            </div>
            
            <div className="navbar-center">
                <input
                    type="text"
                    className="search-bar"
                    value={searchValue}
                    onChange={searchValueChange}
                    placeholder="Search for any specific Movies"
                />
            </div>
            <div className="navbar-right">
                <nav className="nav-links">
                <Link to="/registerUser">Register In</Link>
                </nav>
                <button onClick={logout} className="login-btn">
                    Logout
                </button>
            </div>
        </div>
        
}

export default Navbar;