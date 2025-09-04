
import FlickBook from "../../Assets/FlickBook.png"
import './NavbarBefore.css';
import {Link} from "react-router-dom";

function Navbar(){

    return <div className="navbar">
            <div className="navbar-left">
                <img className="logo" src={FlickBook} alt="FLickBook Logo" />
            </div>
            
            <div className="navbar-right">
                <nav className="nav-links">
                <Link to="/registerUser">Register In</Link>
                </nav>
                <Link to="/">
                    <button className="login-btn">
                    Sign In
                    </button>
                </Link>
            </div>
        </div>
        
}

export default Navbar;