import { useState } from "react";
import supabase from "../config/supabaseClient";
import { Navigate, useNavigate} from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prioritylevel, setPriorityLevel] = useState("");
  const [formError, setFormError] = useState(null);
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

  if (!title || !description || !prioritylevel) {
      setFormError('Please fill all the fields');
      return;
  }
  
  console.log("Form Data:", { title, description, prioritylevel });
  const { data, error } = await supabase
    .from("notes")
    .insert([{ title, description, prioritylevel }])
    .select();

  if (error) {
    console.log("Supabase Error:", error);
    setFormError("Please fill all the fields");
  }
  if (data) {
    console.log("Supabase Data:", data);
    setFormError(null);
    Navigate('/')
   }

 };

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
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
          onChange={(e) => setPriorityLevel(e.target.value)}
        />
        <button>Create</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Create;
