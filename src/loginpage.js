import React, { useState } from "react";
import { TextField, Button, Card, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const validateInputs = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Invalid email format";
  }
  if (!values.password) {
    errors.password = "Password is required";
  }
  return errors;
};

const LoginPage = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiMessage, setApiMessage] = useState("");
  const navigate = useNavigate();

  const handleInputs = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateInputs(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await axios.post("http://localhost:1234/login", values);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("adminId",res.data.adminId);
        localStorage.setItem("userId", res.data.userId); 
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("token", res.data.token);



        // console.log("Stored Admin ID:", res.data.adminId); 
        // alert("Stored Admin ID: " + res.data.adminId); 

        if (res.data.role === "admin") {
          setApiMessage("Welcome Admin! Redirecting...");
          setTimeout(() => navigate("/admin"), 1000);
        } else {
          setApiMessage("Welcome User! Redirecting...");
          setTimeout(() => navigate("/user"), 1000);
        }
      } catch (error) {
        alert("Invalid email or password");
      }
    } else {
      setApiMessage("");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Card sx={{ padding: 4, width: 300 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            variant="outlined"
            margin="normal"
            value={values.email}
            onChange={handleInputs}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            margin="normal"
            value={values.password}
            onChange={handleInputs}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ marginTop: 2 }}
          >
            Login
          </Button>
        </form>
        {apiMessage && (
          <Typography align="center" color="green" sx={{ marginTop: 2 }}>
            {apiMessage}
          </Typography>
        )}
        <Typography align="center" sx={{ marginTop: 2 }}>
          Don't have an account?{" "}
          <Button color="primary" onClick={() => navigate("/signup")}>
            Signup here.
          </Button>
        </Typography>
      </Card>
    </Box>
  );
};

export default LoginPage;
