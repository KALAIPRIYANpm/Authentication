import React from 'react'
import { useState } from 'react';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Booking = () => {

    const [booking , setBooking] = useState({
        number:"",
        name:"",
        email:"",
        mobile:""
    });

    // const navigate = useNavigate();

    const handleChange = (e) =>{
        setBooking({
            ...booking,
            [e.target.name] : e.target.value
        })
    };


const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
        await axios.post(`http://localhost:1234/booking`,booking)
        alert("Tickets Booked Successfully");
    }catch(error){
        console.log("Failed to book a Ticket",error);
    }
}



  return (

    <>

<Container>

    <Paper>
        <Typography>
            <TextField
            fullWidth
            label="Number of tickets"
            name='number'
            value={booking.number}
            onChange={handleChange}
            type='number'
            />

<TextField
            fullWidth
            label="Name"
            name='name'
            value={booking.name}
            onChange={handleChange}
            type='text'
            />

<TextField
            fullWidth
            label="Email"
            name='email'
            value={booking.email}
            onChange={handleChange}
            type='text'
            />

<TextField
            fullWidth
            label="Mobile"
            name='mobile'
            value={booking.mobile}
            onChange={handleChange}
            type='number'
            />

            <Button onClick={handleSubmit}>Confirm</Button>
        </Typography>
    </Paper>

</Container>


    </>
    
  )
}

export default Booking;