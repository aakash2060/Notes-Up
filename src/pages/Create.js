import { useState } from "react";
import supabase from "../config/supabaseClient";
import { navigate, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prioritylevel, setPriorityLevel] = useState("");
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();

  const notify = () => {
    toast(
      <div style={{ display: "flex", alignItems: "center" }}>
        <FaCheckCircle style={{ color: "green", marginRight: "8px" }} />
        Note was created!
      </div>,
      {
        className: "custom-toast-create",
        bodyClassName: "custom-toast-body",
        progressClassName: "custom-toast-progress",
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !prioritylevel) {
      setFormError("Please fill all the fields");
      return;
    }

    if (prioritylevel < 0 || prioritylevel > 10) {
      setFormError("Priority level must be between 0 and 10");
      return;
    }

    console.log("Form Data:", { title, description, prioritylevel });
    const { data, error } = await supabase
      .from("notes")
      .insert([{ title, description, prioritylevel }])
      .select();

    if (error) {
      console.log(" Error:", error);
      setFormError("Please fill all the fields");
    }
    if (data) {
      console.log(" Data:", data);
      setFormError(null);
      notify();
      setTimeout(() => {
        navigate("/");
      }, 2000); // Navigate after 2 seconds
    }
  };

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <div style={{ fontWeight: "bold", textAlign: "center" }}>
          Create Note
        </div>
        <label htmlFor="title"> Title: </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="description">Description: </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="prioritylevel">PriorityLevel: </label>
        <input
          type="number"
          id="prioritylevel"
          value={prioritylevel}
          min="0"
          max="10"
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            if (value >= 0 && value <= 10) {
              setPriorityLevel(value);
            } else if (e.target.value === "") {
              setPriorityLevel("");
            }
          }}
        />
        <button className="create-button">Create</button>
        {formError && <p className="error">{formError}</p>}
      </form>
      <ToastContainer className="custom-toast-container" />
    </div>
  );
};

export default Create;
