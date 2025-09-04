
import FlickBook from "../../Assets/FlickBook.png"
import './Navbar.css';
import {Link, useNavigate} from "react-router-dom";

function Navbar(){ 
    const navigate = useNavigate();
    const logout = ()=>{
        localStorage.removeItem("accessToken");
        navigate("/")
    }   

    return <div className="navbar">
            <div className="navbar-left">
                <img className="logo" src={FlickBook} alt="FlickBook Logo" />
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