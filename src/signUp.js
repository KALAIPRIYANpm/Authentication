import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import signupValidation from "./SignUpValidation";
import axios from "axios";


const SignupPage = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleInputs = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    console.log(event.target.name);
    console.log(event.target.value);
  };

  

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = signupValidation(values);
    setError(validationErrors);

    // if (Object.keys(validationErrors).length === 0) {
    //   console.log("Navigating to login page...");
    //   navigate("/loginpage"); // Redirect to LoginPage
    // }

    if(error.name === ""&& error.email === "" && error.password === ""){
      axios.post(`http://localhost:1234/signup`,values)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center">Signup</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Enter your name"
                    onChange={handleInputs}
                    value={values.name}
                  />
                  {error.name && <span className="text-danger">{error.name}</span>}
                </div>
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
                  {error.email && <span className="text-danger">{error.email}</span>}
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
                  {error.password && <span className="text-danger">{error.password}</span>}
                </div>
                <button type="submit" className="btn btn-primary w-100">Signup</button>
              </form>
              <span></span>
              <button
                  className="btn btn-success w-100 mt-3"
                  onClick={() => navigate("/loginpage")+console.log("redirecting to login Page...")}
                >
                  login
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
