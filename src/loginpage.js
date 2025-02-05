import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Validation function
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
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [apiMessage, setApiMessage] = useState("");
  const navigate = useNavigate();

  // Handle form inputs
  const handleInputs = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateInputs(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await axios.post("http://localhost:1234/login", values);

        if (res.data.role === "admin") {
          setApiMessage("Welcome Admin! Redirecting...");
          setTimeout(() => navigate("/admin"), 2000);
            // navigate("/admin"); 
            // setApiMessage("Welcome Admin");
            // setTimeout("Redirecting you to Admin Page ",3000);
        } else {
            // navigate("/user");

            setApiMessage("Welcome User! Redirecting...");
            setTimeout(() => navigate("/user"), 2000);
        }
    } catch (error) {
        alert("Invalid email or password");
    }
    } else {
      setApiMessage("");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleInputs}
                    value={values.email}
                  />
                  {errors.email && <span className="text-danger">{errors.email}</span>}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleInputs}
                    value={values.password}
                  />
                  {errors.password && <span className="text-danger">{errors.password}</span>}
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
              </form>
              {apiMessage && <p className="text-center mt-3">{apiMessage}</p>}
              <div className="mt-3 text-center">
                <button
                  className="btn btn-link"
                  onClick={() => navigate("/signup")}
                >
                  Don't have an account? Signup here.
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
