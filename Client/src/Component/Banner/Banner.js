import '../../Pages/Home/Home.css';
import './Banner.css';
import offer1 from "../../Assets/Offers/Offer1.jpg";
import offer2 from "../../Assets/Offers/Offer2.jpg";
import { useState, useEffect } from "react";

function Banner(){

    const offers = [offer1,offer2];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() =>{
        const timer = setTimeout(()=>{
            setCurrentIndex((prevIndex)=>
                prevIndex === offers.length -1 ? 0: prevIndex +1
            );
        }, 3000); 

        return ()=> clearTimeout(timer);

    }, [currentIndex, offers.length]);

    return <div className="BannerSection">
        
        <img className="Offers" src={offers[currentIndex]} alt="Offers"></img>
    </div>
}

export default Banner;