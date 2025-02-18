import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  TextField, Button, Typography, Container, Paper, Box 
} from "@mui/material";

const SignupPage = () => {
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState({});
  const [apiMessage, setApiMessage] = useState("");
  const navigate = useNavigate();

  const handleInputs = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateInputs = () => {
    const errors = {};
    if (!values.name) errors.name = "Name is required";
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Invalid email format";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateInputs();
    setError(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios.post("http://localhost:1234/signup", values);
        setApiMessage("Signup successful! Redirecting...");
        setTimeout(() => navigate("/loginpage"), 2000);
      } catch (err) {
        console.error("API Error:", err.message);
        setApiMessage(err.response?.data?.message || "An error occurred during signup.");
      }
    } else {
      setApiMessage("");
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, mt: 5 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Signup
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={values.name}
            onChange={handleInputs}
            error={!!error.name}
            helperText={error.name}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={values.email}
            onChange={handleInputs}
            error={!!error.email}
            helperText={error.email}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleInputs}
            error={!!error.password}
            helperText={error.password}
            margin="normal"
          />
          <Button 
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Signup
          </Button>
        </form>
        {apiMessage && (
          <Typography color="green" align="center" sx={{ mt: 2 }}>
            {apiMessage}
          </Typography>
        )}
        <Box textAlign="center" sx={{ mt: 2 }}>
          {/* <Button 
            variant="outlined" 
            color="secondary" 
            onClick={() => navigate("/loginpage")}
          >
            Go to Login
          </Button> */}
        </Box>
      </Paper>
    </Container>
  );
};

export default SignupPage;
