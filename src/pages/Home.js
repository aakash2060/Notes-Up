import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import {NotesCard} from "../components/NotesCard"

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase //getting data and error from supabase
        .from("notes") // from where we want to get the data > its from 'notes'
        .select(); //selects all the data from the database

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
  }, []);
  return (
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}
      {notes && (
        <div className="notes">
        <div className="note-grid">
        {notes.map((note) => (
            <NotesCard key ={note.id} note ={note}/>
          ))}
        </div>
        </div>
      )}
    </div>
  );
};

export default Home;
