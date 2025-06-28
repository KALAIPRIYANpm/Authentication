import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField, Button, Typography, Card, CardContent, Grid, Box
} from '@mui/material';

const RegistrationsPage = () => {
  const [eventId, setEventId] = useState("");
  const [registrations, setRegistrations] = useState([]);
  const [totalTickets, setTotalTickets] = useState(0);

  const fetchRegistrations = async () => {
    if (!eventId) return;

    try {
      const res = await axios.get(`http://localhost:1234/registrations/${eventId}`);
      setRegistrations(res.data);

      // Calculate total tickets booked for the event
      const total = res.data.reduce((sum, reg) => sum + reg.ticket_count, 0);
      setTotalTickets(total);
    } catch (err) {
      alert("Error fetching registrations");
      console.error(err);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        🎫 View Registrations for Event
      </Typography>

      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="Enter Event ID"
          type="number"
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
        />
        <Button variant="contained" onClick={fetchRegistrations}>
          Fetch Registrations
        </Button>
      </Box>

      {registrations.length > 0 && (
        <>
          <Typography variant="h6" color="primary" gutterBottom>
            Total Tickets Booked: {totalTickets}
          </Typography>

          <Grid container spacing={3}>
            {registrations.map((reg) => (
              <Grid item xs={12} md={6} lg={4} key={reg.id}>
                <Card sx={{ padding: 2 }}>
                  <CardContent>
                    <Typography variant="h6">👤 {reg.userName}</Typography>
                    <Typography>Email: {reg.email}</Typography>
                    <Typography>Tickets: 🎟️ {reg.ticket_count}</Typography>
                    <Typography>Booked At: {new Date(reg.booking_time).toLocaleString()}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default RegistrationsPage;
