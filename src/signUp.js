import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupPage = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
    });
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
                const response = await axios.post("http://localhost:1234/signup", values);
                setApiMessage("Signup successful! Redirecting to login page...");
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
                                <button type="submit" className="btn btn-primary w-100">
                                    Signup
                                </button>
                            </form>
                            {apiMessage && <p className="text-center mt-3">{apiMessage}</p>}
                            <button
                                className="btn btn-success w-100 mt-3"
                                onClick={() => navigate("/loginpage")}
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
