import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [captcha, setCaptcha] = useState("");
    const [userCaptcha, setUserCaptcha] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        generateCaptcha();
    }, []);

    const generateCaptcha = () => {
        const randomCaptcha = Math.random().toString(36).substring(6).toUpperCase();
        setCaptcha(randomCaptcha);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (userCaptcha !== captcha) {
            alert("Captcha verification failed. Please try again.");
            return;
        }

        axios.post('http://localhost:4500/register', { name, email, password })
            .then(result => {
                console.log(result);
                navigate("/login");
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Name</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            autoComplete="off"
                            name="email"
                            required
                            className="form-control rounded-0"
                            onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            autoComplete="off"
                            name="email"
                            required
                            className="form-control rounded-0"
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            required
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="captcha">
                            <strong>Captcha</strong>
                        </label>
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="captcha-box" style={{ textDecoration: 'line-through' }}>{captcha}</div>
                            <button type="button" className="btn btn-light rounded-0 ml-2" onClick={generateCaptcha}>
                                Refresh
                            </button>
                        </div>
                        <input
                            type="text"
                            placeholder="Enter captcha"
                            name="captcha"
                            required
                            className="form-control rounded-0 mt-2"
                            onChange={(e) => setUserCaptcha(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Register
                    </button>
                </form>
                <p>Already have an account ?</p>
                <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Login
                </Link>
            </div>
        </div>
    )
}

export default Signup;
