import  {Link} from 'react-router-dom'
export const NotesCard =({note}) => {
    return (
        <div className="note-card">
            <h3>{note.title}</h3>
            <p>{note.description}</p>
            <div className="prioritylevel">
                {note.prioritylevel}
            </div>
            <div className='buttons'>
                <Link to ={'/' + note.id}>
                     <i className='material-icons'>edit</i> {/*takes edit image from google with through <i></i> tag */}
                </Link>
            </div>
        </div>
    )
}
