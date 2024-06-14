import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import supabase from "../config/supabaseClient";
import { Link } from "react-router-dom";
import darkImage from "../assets/dark.png";
import lightImage from "../assets/light2.png";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleGoogleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "http://localhost:3000/home",
        },
      });
      if (error) {
        throw error;
      }
      // Handle successful Google signup
    } catch (error) {
      toast.error(error.message);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Basic input validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
          },
        },
      });
      if (error) {
        throw error;
      }
      toast.success("Check your email for verification link.");
    } catch (error) {
      toast.error(error.message);
      setError("Error signing up. Please try again.");
    }
  }

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <div style={{ fontWeight: "bold", textAlign: "center" }}>SignUp</div>
        <label htmlFor="firstname">FirstName:</label>
        <input
          type="text"
          id="firstname"
          name="firstName"
          onChange={handleChange}
        />
        <label htmlFor="lastname">LastName:</label>
        <input
          type="text"
          id="lastname"
          name="lastName"
          onChange={handleChange}
        />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" onChange={handleChange} />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
        />
        <button
          className="login-button"
          disabled={
            formData.firstName === "" ||
            formData.lastName === "" ||
            formData.email === "" ||
            formData.password === ""
          }
        >
          SignUp
        </button>
        {error && <p className="error">{error}</p>}
        Already have an account? <Link to="/login">Login</Link>
        <div className="googlesignupbutton">
          <button
            onClick={handleGoogleSignupSubmit}
            style={{ border: "none", background: "none", padding: 0 }}
          >
            <img
              src={lightImage}
              style={{ margin: "10px", cursor: "pointer" }}
              alt="Sign up with Google"
            />
          </button>
        </div>
      </form>

      <ToastContainer className="custom-toast-container" />
    </div>
  );
};

export default SignUp;
