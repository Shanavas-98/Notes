import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import userInstance from "../api/userInstance";
import { UserContext } from "../context/UserContext";

function RegisterPage() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (user) {
      navigate("/notes");
    }
  }, [user, navigate]);
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirm: ""
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(3, "min 3 characters")
        .max(20, "max 20 characters")
        .trim("no trailing spaces")
        .strict(true)
        .matches(/^[A-Za-z ]*$/, "please enter valid name")
        .required("full name required"),
      email: Yup.string()
        .trim("no trailing spaces")
        .strict(true)
        .email("invalid email address")
        .required("email is required"),
      password: Yup.string()
        .min(6, "min 6 charaters")
        .max(20, "max 20 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])/,
          "password must contain uppercase,lowercase,special characters,numbers",
        )
        .required("password is required"),
      confirm: Yup.string()
        .oneOf([Yup.ref("password"), null], "passwords must match")
        .required("confirm password is required "),
    }),
    onSubmit: async (formData) => {
      try {
        const { data } = await userInstance.post("/register", formData);
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
          toast.success(data.message, {
            position: "top-center",
          });
          navigate("/login");
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
      <h1 className="text-4xl text-center">Register</h1>
      <form onSubmit={formik.handleSubmit} className="max-w-xl mx-auto">
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.fullName}
        />
        {formik.touched.fullName && formik.errors.fullName && <div className="text-red-600">{formik.errors.fullName}</div>}
        {errors?.fullName && <div className="text-red-600">{errors?.fullName}</div>}

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

        <label htmlFor="password">New Password</label>
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

        <label htmlFor="confirm">Confirm Password</label>
        <input
          id="confirm"
          name="confirm"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirm}
        />
        {formik.touched.confirm && formik.errors.confirm && <div className="text-red-600">{formik.errors.confirm}</div>}
        {errors?.confirm && <div className="text-red-600">{errors?.confirm}</div>}

        <button type="submit" className="primary">Register</button>
      </form>
      <div className="flex text-sm font-medium text-gray-500 py-2">
        Already registered?
        <NavLink
          to="/login"
          className=" hover:underline cursor-pointer text-cyan-400 px-4"
        >
          Login
        </NavLink>
      </div>
    </div>
  );
}

export default RegisterPage;