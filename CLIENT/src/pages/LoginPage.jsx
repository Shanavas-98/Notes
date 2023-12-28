import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import userInstance from "../api/userInstance";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function LoginPage() {
  const navigate = useNavigate();
  const {user,setUser} = useContext(UserContext);
  const [errors, setErrors] = useState({});

  useEffect(()=>{
    if(user){
      navigate("/notes");
    }
  },[user,navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .trim("no trailing spaces")
        .strict(true)
        .email("invalid email address")
        .required("email is required"),
      password: Yup.string()
        .required("password is required"),
    }),
    onSubmit: async (formData) => {
      try {
        const {data} = await userInstance.post("/login", formData);
        if (data?.validationErrors) {
          setErrors(data?.validationErrors?.reduce((acc, error) => {
            const existingError = acc[error.path];
            if (existingError) {
              acc[error.path] = `${existingError}, ${error.msg}`;
            } else {
              acc[error.path] = error.msg;
            }
            return acc;
          }, {}));
        }
        if(data?.success){
          localStorage.setItem("userToken", data.token);
          setUser(data?.userData);
        }else{
          toast.error(data?.message, {
            position: "top-center",
          });
        }
      } catch (error) {
        toast.error(error.message, {
          position: "top-center",
        });
      }
    },
  });
  return (
    <div className="">
      <h1 className="text-4xl text-center">Login</h1>
      <form onSubmit={formik.handleSubmit} className="max-w-xl mx-auto">
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && <div className="text-red-600">{formik.errors.email}</div>}
        {errors?.email && <div className="text-red-600">{errors?.email}</div>}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password && <div className="text-red-600">{formik.errors.password}</div>}
        {errors?.password && <div className="text-red-600">{errors?.password}</div>}

        <button type="submit" className="primary">Login</button>
      </form>
      <div className="flex text-sm font-medium text-gray-500 py-4">
        Not registered?
        <NavLink
          to="/register"
          className=" hover:underline cursor-pointer text-cyan-400 px-4"
        >
          Register Now
        </NavLink>
      </div>
    </div>
  );
}

export default LoginPage;