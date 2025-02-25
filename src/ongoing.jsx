import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

const OngoingEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchOngoingEvents = async () => {
      try {
        const response = await axios.get('http://localhost:1234/ongoing-events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching ongoing events:', error);
      }
    };
    fetchOngoingEvents();
  }, []);

  return (
    <Container>
      <Paper elevation={3} sx={{ padding: 4, mt: 5 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Ongoing Events
        </Typography>
        <List>
          {events.map((event, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`Event: ${event.name}`}
                secondary={`Date: ${event.date}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default OngoingEvents;
