import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './BookShow.css'
import { getShowDetails } from '../../Api/Shows';
import { createBooking, makePayment } from '../../Api/Booking';
import {message, Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import StripeCheckout from 'react-stripe-checkout';



function BookShow(){

    const navigate = useNavigate();

    const [showDetails, setShowDetails] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);

    const params = useParams();
    const showId = params.showId;

    const fetchShowDetails = async()=>{
        const showResponse = await getShowDetails(showId);
        setShowDetails(showResponse.data);
    }
    useEffect(()=>{
        fetchShowDetails();
    },[]);

    const handleSelectedSeats = (seatNumber)=>{
        if (!selectedSeats.includes(seatNumber)){
            setSelectedSeats([...selectedSeats, seatNumber]);
            return;
        }

        if (showDetails.bookedSeats.includes(seatNumber) || 
            showDetails.bookedSeats.includes(seatNumber.toString())) {
            return; 
        }

        const updatedSeats = selectedSeats.filter((seat) => seat !== seatNumber)
        setSelectedSeats(updatedSeats);

    }

    
    const onToken = async(token) =>{
        console.log(token);

        const paymentRequest = {
            token:token.id,
            amount:selectedSeats.length * showDetails.ticketPrice
        }

        const paymentResponse = await makePayment(paymentRequest);

        if (paymentResponse.success){
            message.success(paymentResponse.message);
            //Booking Request 
            const BookingRequest = {
                show:showId,
                seats:[...selectedSeats],
                transactionId: "123"
            }     
            
            const createBookingResponse = await createBooking(BookingRequest);
            if (createBookingResponse.success){
                message.success(createBookingResponse.message);
                navigate("/homeMovies")
            }
            else{
                message.error(createBookingResponse.message);
            }
        }
        else{
            message.error(paymentResponse.message);
        }
    }

    
    const getSeats = ()=>{

        const totalSeats = showDetails ? showDetails.totalSeats: 0;

        const columns = 20;
        const rows = Math.ceil(totalSeats/columns);

        let allRows = [];
        for (let i=0; i<rows; i++){
            allRows.push(i);
        }

        let allColumns = [];
        for (let i=0; i<columns; i++){
            allColumns.push(i);
        }

        return <div>
            {
                allRows.map((row)=>{
                    return <div>
                        {
                            allColumns.map((column)=>{
                                let seatNumber = row * columns + column + 1;

                                let seatClass = "seat-btn"

                                const isSeatBooked = showDetails.bookedSeats.includes(seatNumber.toString()) || showDetails.bookedSeats.includes(seatNumber);
                                const isSeatSelected = selectedSeats.includes(seatNumber);

                                if (isSeatBooked){
                                    seatClass+= " booked";
                                }

                                if (isSeatSelected){
                                    seatClass += " selected";
                                }

                                return <button disabled={isSeatBooked} onClick={()=>handleSelectedSeats(seatNumber)} className={seatClass}>{seatNumber}</button>
                            })
                        }
                    </div> 
                })
            }
        </div>

    }

    return <div>
        {
            showDetails === null && <div className='loadingShowDetails'><Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} /></div>
        }

        {
            showDetails && <div className='ShowHeaderContainer'>
                <div className='ShowHeader1'>
                    <div className='details'>
                        <h4 className='ShowMovieName'>{showDetails.movie.name}</h4>
                        <h4 className='ShowTheaterDetail'>
                            <span>{showDetails.theater.name}</span>: 
                            <span> {showDetails.theater.address}</span> | 
                            <span> {showDetails.showDate.split("T")[0]}</span>
                        </h4>
                    </div>

                    <div className='showAvailableSeats'>
                        {`Available seats: ${showDetails.totalSeats - showDetails.bookedSeats.length}`}
                    </div>
                </div>

                {
                    showDetails && <div className='ShowHeader2'>
                        <div className='showtimeSec'>
                            {showDetails.showTime}
                        </div>
                    </div> 
                }               
            </div>
        }
        <div className='seatSection'>
            {
                showDetails && getSeats()
            }   
        </div>
        {showDetails && <div className="theater-screen">SCREEN THIS WAY</div>}
        {
                showDetails && <div className='SelectedSeatsAndBooked'>
                    <div >Selected Seats: <span >{selectedSeats.join(", ")}</span></div>
                    <div >Total Price: <span >{selectedSeats.length * showDetails.ticketPrice}</span></div>

                    {
                        selectedSeats.length > 0 && 
                        <StripeCheckout className='payButton'
                            token = {onToken}
                            stripeKey= {process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
                        />
                    }
                </div>
        }
    </div>
}

export default BookShow;