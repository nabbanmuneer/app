import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { useLoginMutation } from "../features/auth/authApiSlice";
import Swal from 'sweetalert2'

const Login = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useDispatch();

  const validate = (values) => {
    
    const errors = {};
    console.log("validation");
    if (!values.email) {
      errors.email = "Email is Required ";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validate,
    onSubmit: async (values) => {
       try {
        let { email, password } = values;
        console.log(values);
        const userData = await login({ email, password }).unwrap();
        console.log(userData);
        let token = await userData.accessToken
        dispatch(setCredentials({ ...userData, email }));
        if (!userData) {
          formik.setErrors(userData.errors);
          console.log("formik user",userData.errors);
        } else {
          axios.defaults.headers.common["Authorization"] = token;
          Swal.fire('successfully login')
          .then(()=>{navigate("/")})
        }
      } catch (err) {
        Swal.fire('Invalid Email or Password')
        console.log(err);
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

  return (
    <div className="w-full h-screen h-lg-full bg-yellow-400  flex flex-col items-center  ">
      <div className="p-5 text-5xl">Sign In</div>
      <div className="w-[60%] sm:w-[40%] md:w-[35%] lg:w-[25%]  ">
        <form
          className="w-full bg-white p-6 rounded-xl bottom-5 h-full"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex items-center border-b bg-white border-gray-700 py-4">
            <input
              name="email"
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="email"
              placeholder="Email"
              aria-label="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </div>
          {formik.errors?.email ? <div className="text-red-400">{formik.errors.email}</div> : null}
          <div className="flex items-center border-b bg-white border-gray-700 py-4">
            <input
              name="password"
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="password"
              placeholder="password"
              aria-label="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </div>
          <button
            className="flex-shrink-0 bg-black hover:bg-yellow-400 border-black hover:border-yellow-400 text-sm border-4  text-white py-1 px-2 w-full mt-5 rounded"
            type="submit"
            disabled={formik.isSubmitting}
          >
            Sign In
          </button>
          <p className="p-3 text-gray-500">
            You don't have a Accont?
            <span className="text-blue-400 cursor-default">
              <a> Sign Up</a>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
