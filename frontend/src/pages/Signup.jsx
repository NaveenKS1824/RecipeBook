import React, { useContext, useState } from 'react';
import './Auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { setUser } = useContext(AuthContext)
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
     try {
      const res = await axios.post("https://recipebook-aosa.onrender.com/api/auth/signup", formData);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      navigate("/login");
    } catch (err) {
         console.log("Signup Error:", err);
      alert(err.response?.data?.message || "Signup failed");
    }
    console.log(formData);
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSignup}>
        <h2>Create Account</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Create password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
        <p>Already have an account? <a href="/login">Log in</a></p>
      </form>
    </div>
  );
};

export default Signup;
