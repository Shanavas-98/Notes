import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import userInstance from "../api/userInstance";
import { toast } from "react-toastify";
import CustomAlert from "../components/CustomAlert";

function NotePage() {
  const navigate = useNavigate();
  const { noteId } = useParams();
  const [showAlert, setShowAlert] = useState(false);
  const [note, setNote] = useState({});
  useEffect(() => {
    async function getNote(id) {
      const { data } = await userInstance.get(`/notes/${id}`);
      setNote(data);
    }
    getNote(noteId);
  }, [noteId]);

  const handleDelete = async (id) => {
    try {
      const { data } = await userInstance.delete(`/delete-note/${id}`);
      if (data.success) {
        toast.warning(data.message);
        navigate("/notes");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setShowAlert(false);
    }
  };

  const handleCancel = () => {
    // Handle cancel action or simply close the alert
    setShowAlert(false);
  };
  return (
    <>
      <div className='border p-4 rounded-lg'>
        <div className='flex justify-between border-b-2'>
          <h1 className='text-3xl'>{note.title}</h1>
          <div className='flex gap-2 items-center'>
            <button onClick={() => setShowAlert(true)}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='2'
                stroke='red'
                className='w-6 h-6'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
                />
              </svg>
            </button>
            <NavLink to={`/notes/edit/${note._id}`}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='2'
                stroke='blue'
                className='w-6 h-6'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10'
                />
              </svg>
            </NavLink>
          </div>
        </div>
        <div className='text-md py-2 max-h-svh overflow-y-scroll'>{note.description}</div>
      </div>
      <CustomAlert
        show={showAlert}
        message='Are you sure you want to delete?'
        onCancel={handleCancel}
        onConfirm={handleDelete}
        documentId={noteId}
      />
    </>
  );
}

export default NotePage;
