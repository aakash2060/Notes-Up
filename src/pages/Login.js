import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import supabase from "../config/supabaseClient";
import { Link,useNavigate } from "react-router-dom";

const Login = () => {
    let navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
          })

      if (error) throw error 
      console.log(data)
      navigate('/home')

    } catch (error) {
      alert(error);
   
    }
  };

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <div style={{ fontWeight: "bold", textAlign: "center" }}>Login In</div>

        <label htmlFor="email"> Email: </label>
        <input type="email" id="email" onChange={handleChange} />

        <label htmlFor="password"> Password: </label>
        <input type="password" char id="password" onChange={handleChange} />

        <button className="login-button" >Login </button>
        <div className="signuplink" style={{  marginTop: '10px' }}>Don't have an account?<Link to="/signup" style={{ color: '', marginTop: '10px' }}>SignUp</Link></div>
      </form>
      <ToastContainer className="custom-toast-container" />
      
    </div>
  );
};

export default Login;
