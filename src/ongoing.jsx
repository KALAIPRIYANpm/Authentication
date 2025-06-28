import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Container,
  Chip,
  Tooltip,
  Divider,
  Stack,
  Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PeopleIcon from '@mui/icons-material/People';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { motion } from 'framer-motion';

const OngoingEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios.get("http://localhost:1234/regList")
      .then(res => setEvents(res.data))
      .catch(err => console.error("Error fetching events:", err));
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1234/deleteEvent/${id}`);
      setEvents(events.filter(event => event.id !== id));
      setConfirmOpen(false);
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
        🔄 Ongoing Events
      </Typography>
      <Divider sx={{ mb: 4 }} />

      {events.length === 0 ? (
        <Typography align="center">🚫 No ongoing events available.</Typography>
      ) : (
        <Grid container spacing={4}>
          {events.map((event) => {
            const filled = event.total_tickets - event.available_tickets;
            const isFull = event.available_tickets === 0;

            return (
              <Grid item xs={12} sm={6} md={4} key={event.id}>
                <motion.div whileHover={{ scale: 1.03 }}>
                  <Card sx={{ borderRadius: 4, boxShadow: 6, p: 2, background: isFull ? '#ffe6e6' : '#f0f8ff' }}>
                    <CardContent>
                      <Stack spacing={1}>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                          <EventAvailableIcon sx={{ mr: 1 }} /> {event.title}
                        </Typography>
                        <Chip label={`🆔 Event ID: ${event.id}`} color="secondary" variant="outlined" />
                        <Typography variant="body2">
                          <PlaceIcon fontSize="small" /> {event.venue}
                        </Typography>
                        <Typography variant="body2">
                          <CalendarMonthIcon fontSize="small" /> {new Date(event.date).toLocaleString()}
                        </Typography>
                        <Typography variant="body2">
                          <PeopleIcon fontSize="small" /> Tickets Filled: {filled} / {event.total_tickets}
                        </Typography>
                        <Tooltip title={isFull ? "House Full" : `${event.available_tickets} tickets remaining`}>
                          <Typography variant="body2" color={isFull ? 'error' : 'text.primary'}>
                            <ConfirmationNumberIcon fontSize="small" /> {isFull ? "House Filled" : `${event.available_tickets} Available`}
                          </Typography>
                        </Tooltip>
                      </Stack>
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<DeleteIcon />}
                        fullWidth
                        sx={{ mt: 3 }}
                        onClick={() => {
                          setSelectedEvent(event);
                          setConfirmOpen(true);
                        }}
                      >
                        Delete Event
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>🗑️ Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the event "{selectedEvent?.title}" (ID: {selectedEvent?.id})?
          This will remove it for all users.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="primary">Cancel</Button>
          <Button
            onClick={() => handleDelete(selectedEvent.id)}
            color="error"
            variant="contained"
          >
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default OngoingEvents;
