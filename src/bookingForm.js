// BookingForm.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Typography, Container, Box } from "@mui/material";

const BookingForm = () => {
  const { eventId } = useParams(); 
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const [email, setEmail] = useState("");
  const [ticketCount, setTicketCount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:1234/book", {
        userId,
        eventId,
        email,
        ticketCount,
      });

      alert("Booking successful!");
      navigate("/user");
    } catch (err) {
      console.error("Booking error:", err);
      alert("Booking failed. Try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} p={4} boxShadow={3} borderRadius={2} bgcolor="#f9f9f9">
        <Typography variant="h5" align="center" gutterBottom>
          Book Tickets
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
          >
            Confirm Booking
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default BookingForm;
