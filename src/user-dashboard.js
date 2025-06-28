import React, { useState, useEffect } from 'react';
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
  Dialog,
  IconButton,
  Container,
  useMediaQuery,
  Divider
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PlaceIcon from '@mui/icons-material/Place';

const User = () => {
  const [events, setEvents] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [userBookings, setUserBookings] = useState([]);
  const [open, setOpen] = useState(false);
  const [showBookings, setShowBookings] = useState(false);

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const userName = localStorage.getItem("name");
  const userId = localStorage.getItem("userId");
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    axios.get("http://localhost:1234/regList")
      .then(response => setEvents(response.data))
      .catch(error => console.error("Error fetching events:", error));
  }, []);

  const fetchUserDetails = async () => {
    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:1234/userDetails?id=${userId}`);
      setUserDetails(response.data);
      setOpen(true);
    } catch (err) {
      console.error("Error fetching user details", err);
    }
  };

  const fetchUserBookings = async () => {
    try {
      const res = await axios.get(`http://localhost:1234/userBookings?userId=${userId}`);
      setUserBookings(res.data);
      setShowBookings(true);
    } catch (err) {
      console.error("Error fetching bookings", err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/loginpage");
  };

  return (
    <>
      <AppBar position="static" sx={{ background: "linear-gradient(to right, #43cea2, #185a9d)", mb: 4 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h5" fontWeight="bold">
            🎟️ EventZone
          </Typography>
          <Typography variant="h6">Hi, {userName}</Typography>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Button variant="contained" color="error" onClick={handleLogout}>
              Logout
            </Button>
            <IconButton color="inherit" onClick={fetchUserDetails}>
              <AccountCircleIcon fontSize="large" />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <Dialog open={open} onClose={() => setOpen(false)}>
        {userDetails && (
          <Card sx={{ padding: 3, width: 300, textAlign: "center" }}>
            <CardContent>
              <Typography variant="h6">👤 {userDetails.name}</Typography>
              <Typography variant="body2">🛡️ {userDetails.role}</Typography>
            <Button
  variant="outlined"
  sx={{ mt: 2 }}
  onClick={() => {
    setOpen(false);
    navigate('/my-bookings');
  }}
>
  View My Bookings
</Button>

              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => setOpen(false)}
                sx={{ mt: 1 }}
              >
                Close
              </Button>
            </CardContent>
          </Card>
        )}
      </Dialog>

      {showBookings && (
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            🎫 Your Booked Tickets
          </Typography>
          <Grid container spacing={2}>
            {userBookings.length > 0 ? userBookings.map((booking, idx) => (
              <Grid item xs={12} sm={6} key={idx}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{booking.title}</Typography>
                    <Typography>Date: {new Date(booking.date).toLocaleString()}</Typography>
                    <Typography>Venue: {booking.venue}</Typography>
                    <Typography>Tickets Booked: {booking.ticket_count}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            )) : (
              <Typography variant="body1">No bookings yet.</Typography>
            )}
          </Grid>
        </Container>
      )}

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
            🌟 Upcoming Events
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {events.length === 0 ? (
              <Typography variant="body1">No events available at the moment</Typography>
            ) : events.map((event, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Card
                    sx={{
                      borderRadius: 4,
                      boxShadow: 5,
                      backgroundColor: "#f0f8ff",
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      p: 2
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        <EventAvailableIcon sx={{ mr: 1 }} /> {event.title}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}><CalendarMonthIcon fontSize="small" /> {new Date(event.date).toLocaleString()}</Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}><PlaceIcon fontSize="small" /> {event.venue}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {event.description}
                      </Typography>
                      <Typography variant="body2">💰 Price: ₹{event.price}</Typography>
                      <Typography variant="body2">🎫 Available: {event.available_tickets} / {event.total_tickets}</Typography>
                      <Button
                        variant="contained"
                        color={event.available_tickets > 0 ? "success" : "warning"}
                        fullWidth
                        onClick={() => navigate(`/booking/${event.id}`)}
                        disabled={event.available_tickets === 0}
                        sx={{ mt: 2 }}
                      >
                        {event.available_tickets === 0 ? "House Filled" : "Book Tickets"}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </motion.div>
    </>
  );
};

export default User;

