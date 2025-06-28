import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
  const [eventData,setEventData] = useState({ title:'',date:'',description:'',venue:'',total_tickets:'',available_tickets:'',price:''});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try 
    {
      await axios.post('http://localhost:1234/events', eventData);
      alert('Event created successfully!');
      navigate('/admin');
    }
     catch(error) {
      console.error('Failed to create event:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 5 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Create New Event
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Event Name"
            name="title"
            value={eventData.title}
            onChange={handleChange}
            margin="normal"
            required
          />

           <TextField
            fullWidth
            label="Date"
            name="date"
            type="date"
            value={eventData.date}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={eventData.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
            required
          />
           <TextField
            fullWidth
            label="Venue"
            name="venue"
            value={eventData.venue}
            onChange={handleChange}
            margin="normal"
            rows={4}
            required
          />
          <TextField
            fullWidth
            label="Total Tickets"
            name="total_tickets"
            value={eventData.total_tickets}
            type='number'
            onChange={handleChange}
            margin="normal"
            rows={4}
            required
          />
          <TextField
            fullWidth
            label="Available Tickets"
            name="available_tickets"
            value={eventData.available_tickets}
            type='number'
            onChange={handleChange}
            margin="normal"
            rows={4}
            required
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            value={eventData.price}
            type='number'
            onChange={handleChange}
            margin="normal"
            rows={4}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Create Event
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateEvent;