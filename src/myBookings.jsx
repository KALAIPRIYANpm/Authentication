import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  CircularProgress
} from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;
    axios.get(`http://localhost:1234/userBookings?userId=${userId}`)
      .then(res => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch bookings:", err);
        setLoading(false);
      });
  }, [userId]);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>🎫 My Bookings</Typography>

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <CircularProgress />
        </div>
      ) : bookings.length === 0 ? (
        <Typography align="center" sx={{ mt: 4 }}>
          You haven't booked any tickets yet.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {bookings.map((booking, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card elevation={4} sx={{ background: '#f8f9ff', borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <EventAvailableIcon sx={{ mr: 1 }} /> {booking.title}
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    <CalendarMonthIcon fontSize="small" /> {new Date(booking.date).toLocaleString()}
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    <PlaceIcon fontSize="small" /> {booking.venue}
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    <ConfirmationNumberIcon fontSize="small" /> Tickets Booked: {booking.ticket_count}
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    <MonetizationOnIcon fontSize="small" /> Total Price: ₹{(booking.ticket_count * booking.price).toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default MyBookings;
