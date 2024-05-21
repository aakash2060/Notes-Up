export const NotesCard =({note}) => {
    return (
        <div className="note-card">
            <h3>{note.title}</h3>
            <p>{note.description}</p>
            <div className="prioritylevel">
                {note.prioritylevel}
            </div>
        </div>
    )
}
