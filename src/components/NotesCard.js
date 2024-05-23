import { Link } from "react-router-dom";
import supabase from "../config/supabaseClient";
import { FaCheckCircle } from "react-icons/fa";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const NotesCard = ({ note, onDelete }) => {
  const notify = () => {
    toast(
      <div style={{ display: "flex", alignItems: "center" }}>
        <FaCheckCircle style={{ color: "red", marginRight: "8px" }} />
        Note was Deleted!
      </div>,
      {
        className: "custom-toast-delete",
        bodyClassName: "custom-toast-body",
        progressClassName: "custom-toast-progress",
      }
    );
  };
  const handleDelete = async (id) => {
    const { data, error } = await supabase
      .from("notes")
      .delete()
      .eq("id", note.id)
      .select();

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
      onDelete(note.id); // Passes note.id to onDelete function so that the parent function from Home.js can get the id that needs to be deleted from local state
      notify();
    }
  };
  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <p>{note.description}</p>
      <div className="prioritylevel">{note.prioritylevel}</div>
      <div className="buttons">
        <Link to={"/" + note.id}>
          <i className="material-icons">edit</i>{" "}
          {/*takes edit image from google with through <i></i> tag */}
        </Link>
        <i className="material-icons" onClick={handleDelete}>
          delete
        </i>
      </div>
    </div>
    
  );
};
