import { useEffect, useState } from "react";
import userInstance from "../api/userInstance";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import CustomAlert from "../components/CustomAlert";

function NotesPage() {
  const [reload, setReload] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [noteId, setNoteId] = useState("");
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    async function getUserNotes(query) {
      const { data } = await userInstance.get(`/notes?search=${query}`);
      setNotes(data);
    }
    getUserNotes(search);
  }, [reload, search]);
  const handleDelete = async (id) => {
    try {
      const { data } = await userInstance.delete(`/delete-note/${id}`);
      if (data.success) {
        toast.warning(data.message);
        setReload(!reload);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setShowAlert(false);
    }
  };

  const handleAlert = (id) => {
    setNoteId(id);
    setShowAlert(true);
  };

  const handleCancel = () => {
    // Handle cancel action or simply close the alert
    setShowAlert(false);
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex place-items-center">
        <input type="text" className="" placeholder="Search" onChange={(e)=>setSearch(e.target.value)} />
      </div>
      {notes?.length <= 0 && (
        <div className="flex flex-col place-items-center">
          <h1 className="text-4xl text-center my-10">Notes not found</h1>
          <NavLink
            to="/notes/add"
            className="bg-blue-500 cursor-pointer border border-blue-500 text-white flex max-w-40 px-4 py-2 rounded-xl"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Create Note
          </NavLink>
        </div>
      )}
      {notes?.length > 0 && notes?.map((note) => (
        <div key={note._id} className="border p-3 rounded-lg cursor">
          <div className="flex justify-between">
            <NavLink to={`/notes/${note._id}`} className='text-xl'>{note.title}</NavLink>
            <div className="flex gap-2 items-center">
              <button onClick={() => handleAlert(note._id)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="red" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
              </button>
              <NavLink to={`/notes/edit/${note._id}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="blue" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
              </NavLink>
            </div>
          </div>
          <div className="max-h-12 overflow-hidden">
            <NavLink to={`/notes/${note._id}`} className='text-base text-gray-400'>{note.description}</NavLink>
          </div>
        </div>
      ))}
      <CustomAlert
        show={showAlert}
        message="Are you sure you want to delete?"
        onCancel={handleCancel}
        onConfirm={handleDelete}
        documentId={noteId}
      />
    </div>
  );
}

export default NotesPage;