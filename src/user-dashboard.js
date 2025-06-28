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
  useMediaQuery
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
  const [open, setOpen] = useState(false);

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

  const handleLogout = () => {
    localStorage.clear();
    navigate("/loginpage");
  };

  return (
    <>
      {/* AppBar */}
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

      {/* User Details */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        {userDetails && (
          <Card sx={{ padding: 3, width: 300, textAlign: "center" }}>
            <CardContent>
              <Typography variant="h6">👤 {userDetails.name}</Typography>
              <Typography variant="body2">🛡️ {userDetails.role}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpen(false)}
                sx={{ mt: 2 }}
              >
                Close
              </Button>
            </CardContent>
          </Card>
        )}
      </Dialog>

      {/* Event Section */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
            🌟 Upcoming Events
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {events.map((event, index) => (
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
                        <EventAvailableIcon sx={{ mr: 1 }} /> {event.eventName}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}><CalendarMonthIcon fontSize="small" /> {event.date}</Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>🎥 {event.title}</Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}><PlaceIcon fontSize="small" /> {event.venue}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {event.description}
                      </Typography>
                      <Button
                        variant="contained"
                        color="success"
                        fullWidth
                        onClick={() => navigate(`/booking/${event.id}`)}
                      >
                        Book Tickets
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
