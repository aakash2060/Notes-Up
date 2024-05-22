import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Update = () => {
  const notify = () => toast("Wow so easy!");
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prioritylevel, setPriorityLevel] = useState("");
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !prioritylevel) {
      setFormError("Please fill all the fields!");
      return;
    }
    const { data, error } = await supabase
      .from("notes")
      .update({ title, description, prioritylevel })
      .eq("id", id)
      .select();

    if (error) {
      setFormError("Please fill all the fields");
      console.log(error);
    } else if (data) {
      console.log(data);
      setFormError(null);

      navigate("/");
    }
  };
  useEffect(() => {
    const fetchNote = async () => {
      const { data, error } = await supabase
        .from("notes")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        navigate("/", { replace: true });
      }
      if (data) {
        setTitle(data.title);
        setDescription(data.description);
        setPriorityLevel(data.prioritylevel);
      }
    };
    fetchNote();
  }, [id, navigate]);
  return (
    <div className="page update">
      <form onSubmit={handleSubmit}>
        <div style={{ fontWeight: "bold", textAlign: "center" }}>
          Update Note
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
          onChange={(e) => setPriorityLevel(e.target.value)}
        />
        <button onClick={notify}>Update</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Update;
