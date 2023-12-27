import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import userInstance from "../api/userInstance";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

function NoteFormPage() {
    const navigate = useNavigate();
    const { noteId } = useParams();
    const formik = useFormik({
        initialValues: {
            title: "",
            description: ""
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .trim("no trailing spaces")
                .strict(true)
                .required("title is required"),
            description: Yup.string()
                .trim("no trailing spaces")
                .strict(true)
                .required("description is required"),
        }),
        onSubmit: async (formData) => {
            try {
                if (noteId) {
                    //update note api
                    const { data } = await userInstance.put(`/edit-note/${noteId}`, formData);
                    console.log("edit note", data);
                } else {
                    //add note api
                    const { data } = await userInstance.post("/add-note", formData);
                    if(data.success){
                        toast.success(data.message, {
                            position: "top-center",
                        });
                        console.log("add note", data);
                    }else{
                        throw Error(data.message);
                    }
                }
            } catch (error) {
                toast.error(error.message, {
                    position: "top-center",
                });
            }finally{
                navigate("/notes");
            }
        },
    });
        //use effect function for calling the function on page load
        useEffect(() => {
            //api call to fetch note data
            async function getNote(id) {
                try {
                    const { data } = await userInstance.get(`/notes/${id}`);
                    // Update the formik initialValues based on the fetched data
                    formik.setValues({
                        title: data.title,
                        description: data.description,
                    });
                } catch (error) {
                    toast.error(error.message, {
                        position: "top-center"
                    });
                }
            }
            if (!noteId) {
                return;
            } else {
                getNote(noteId);
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [noteId]);
    return (
        <div className="">
            <h1 className="text-4xl text-center">Your Note</h1>
            <form onSubmit={formik.handleSubmit} className="max-w-xl mx-auto">
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                />
                {formik.touched.title && formik.errors.title && <div className="text-red-600">{formik.errors.title}</div>}

                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                />
                {formik.touched.description && formik.errors.description && <div className="text-red-600">{formik.errors.description}</div>}

                <button type="submit" className="primary">Save Note</button>
            </form>
        </div>
    );
}

export default NoteFormPage;