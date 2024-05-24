import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import { NotesCard } from "../components/NotesCard";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [notes, setNotes] = useState(null);
  const [orderBy, setOrderBy] = useState("created_at");

  //Updates the local state after deletion
  const handleDelete = (id) => {
    setNotes((prevNotes) => {
      //prevNotes is the array of Notes before deletion
      return prevNotes.filter((note) => note.id !== id); // note is each note object in 'prevNotes'
      //note.id !== id > filters out note with the matching 'id'
    });
    //       prevNotes: Represents the previous state of the notes array.
    // filter: Iterates over prevNotes and creates a new array without the deleted note.
    // Arrow Function Variable (note): Can be named anything. It's just a placeholder for each element in the array.
  };
  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase //getting data and error from supabase
        .from("notes") // from where we want to get the data > its from 'notes'
        .select() //selects all the data from the database
        .order(orderBy, { ascending: false });

      if (error) {
        setFetchError("Could not fetch the notes");
        setNotes(null);
        console.log(error);
      }
      if (data) {
        setNotes(data);
        setFetchError(null);
      }
    };
    fetchNotes();
  }, [orderBy]);

  return (
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}
      {notes && (
        <div className="notes">
          <div className="order-by">
            {" "}
            {/* we're just creating a button with for sorting notes based on time created and priority level */}
            <p>Order Notes: </p>
            <button onClick={() => setOrderBy("created_at")}>
              Time Created
            </button>
            <button onClick={() => setOrderBy("prioritylevel")}>
              Priority level
            </button>
          </div>
          <div className="note-grid">
            {notes.map((note) => (
              <NotesCard key={note.id} note={note} onDelete={handleDelete} /> //calls handleDelete
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
