import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

const Registrations = () => {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await axios.get('http://localhost:1234/registrations');
        setRegistrations(response.data);
      } catch (error) {
        console.error('Error fetching registrations:', error);
      }
    };
    fetchRegistrations();
  }, []);

  return (
    <Container>
      <Paper elevation={3} sx={{ padding: 4, mt: 5 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Registered Events
        </Typography>
        <List>
          {registrations.map((registration, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`Event: ${registration.eventName}`}
                secondary={`User: ${registration.userName}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default Registrations;
