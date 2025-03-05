import React from 'react'
import { useState , useEffect } from 'react';
import axios from "axios";
import { AppBar, Toolbar,Button, Typography, Card, CardContent, Grid } from '@mui/material';

const User = () => {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:1234/regList")
      .then(response => setEvents(response.data))
      .catch(error => console.error("Error fetching events:", error));
  }, []);

  const userName = localStorage.getItem("name");
  return (
  <>
    <h1>{userName}</h1>

    <div style={{ padding: "20px" }}>
      <Typography variant="h5" align="center" gutterBottom>
        Upcoming Events
      </Typography>

      <Grid container spacing={3}>
        {events.map((event, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card style={{ backgroundColor: "#f5f5f5", padding: "10px", borderRadius: "10px" }}>
              <CardContent>
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                  {event.eventName}
                </Typography>
                <Typography variant="body2">📅 {event.date}</Typography>
                <Typography variant="body2">🎥 {event.title}</Typography>
                <Typography variant="body2">📍 {event.venue}</Typography>
                <Typography variant="body2">{event.description}</Typography>
                <Button variant='contained' color='success'>Book Tickets</Button> 
                
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
    </>
  );
};


export default User