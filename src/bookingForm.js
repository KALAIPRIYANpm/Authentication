import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Typography, Container, Box, Alert } from "@mui/material";

const BookingForm = () => {
  const { eventId } = useParams();
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [ticketCount, setTicketCount] = useState("");
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchEventDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:1234/event/${eventId}`);
      setEvent(res.data);
    } catch (err) {
      setEvent(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ticketCount || ticketCount <= 0) {
      return setError("Please enter a valid ticket count.");
    }

    const available = event.total_tickets - event.tickets_booked;
    if (available <= 0) {
      return setError("🎭 House Filled! No more tickets available.");
    }

    if (ticketCount > available) {
      return setError(`Only ${available} tickets left! Please reduce the number.`);
    }

    try {
      await axios.post("http://localhost:1234/book", {
        userId,
        eventId,
        email,
        ticketCount,
      });
      alert("Booking successful!");
      navigate("/user");
    } catch (err) {
      setError("Booking failed. Try again.");
    }
  };

  if (loading) {
    return <Typography align="center" mt={5}>Loading event details...</Typography>;
  }

  if (!event) {
    return <Typography align="center" mt={5}>❌ No event found for ID {eventId}</Typography>;
  }

  const available = event.total_tickets - event.tickets_booked;

  return (
    <Container maxWidth="sm">
      <Box mt={5} p={4} boxShadow={3} borderRadius={2} bgcolor="#f9f9f9">
        <Typography variant="h5" align="center" gutterBottom>
          🎟️ Book Tickets for {event.title}
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Typography variant="body2" color="textSecondary" mt={1}>
          Available Tickets: <strong>{available > 0 ? available : "House Filled"}</strong>
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Number of Tickets"
            type="number"
            margin="normal"
            required
            value={ticketCount}
            onChange={(e) => setTicketCount(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={available <= 0}
          >
            Confirm Booking
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default BookingForm;
