import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import {
  selectCurrentId,
} from "../../features/auth/authSlice";
import Swal from "sweetalert2";
import axios from "axios";
const AddJob = ({ setIsOpenFrom }) => {
  const id = useSelector(selectCurrentId);
  const validate = (values)=>{
    const error = {};
    if(!values.jobTitle || values.jobTitle==" "){
      error.jobTitle = "Job tilte is required";
    }
    if(!values.Category || values.Category==" "){
      error.Category = "Category is required";
    }
    if(!values.amount || values.amount==" "){
      error.amount = "Amount is required";
    }
    if(!values.decrption || values.decrption==" "){
      error.decrption = "Decrption is required";
    }
    return error;
  };


  const formik = useFormik({
    initialValues: {
      jobTitle: "",
      Category: "",
      jobType: "full Time",
      workPlacetype: "On site",
      amount: "",
      salaryType: "per month",
      decrption: "",
      duration: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        let {
          jobTitle,
          Category,
          jobType,
          workPlacetype,
          amount,
          salaryType,
          decrption,
          duration,
        } = values;
        const job = {
          jobTitle,
          Category,
          jobType,
          workPlacetype,
          amount,
          salaryType,
          decrption,
          duration,
          id
        };
        console.log(job);
        axios
          .post(`${import.meta.env.VITE_BASESERVER_URL}/employer/addJob`, job)
          .then(response=>{
            if(response?.status==200){
              Swal.fire("job posted sucessfully")
              .then(()=>{
                setIsOpenFrom(false);
              })
            }else{
              Swal.fire("job post unsucessfully");
            }
          }
          ).catch((error) => {
            Swal.fire("job post unsucessfully");
          })
      } catch (error) {
        Swal.fire("job post unsucessfully");
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

  return (
    <>
      <div className="w-full h-screen h-lg-full bg-opacity-75 bg-black inset-0 fixed flex flex-col items-center">
        <div
          className="text-white font-extrabold self-end cursor-pointer"
            onClick={() => setIsOpenFrom(false)}
        >
          close
        </div>
        <div className="p-5 text-3xl text-white">Add Job From</div>
        <div className="w-[70%]  md:w-[40%] lg:w-[30%]">
          <form
            className="w-full bg-yellow-400 p-5 rounded-xl bottom-5 h-full"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex items-center border-b border-gray-700  py-2">
              <p className="w-[50%]">Job Title :</p>
              <input
                name="jobTitle"
                onChange={formik.handleChange}
                className="appearance-none border-b  border-gray-700 bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
                type="text"
                placeholder="Job Title"
                aria-label="jobTitle"
                value={formik.values.jobTitle}
              />
            </div>
              {formik.errors?.jobTitle ?
               <div className="text-red-400">
                {formik.errors.jobTitle}</div> : null}
           
            <div className="flex items-center border-b border-gray-700  py-2">
              <p className="w-[50%]"> Category :</p>
              <input
                name="Category"
                onChange={formik.handleChange}
                className="appearance-none border-b  border-gray-700 bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
                type="text"
                placeholder="Category"
                aria-label="Category"
                value={formik.values.Category}
              />
            </div>
            {formik.errors?.Category ?
               <div className="text-red-400">
                {formik.errors.Category}</div> : null}
            <div className="flex items-center border-b border-gray-700  py-2">
              <p className="">Job Type :</p>
              <select
                name="jobType"
                onChange={formik.handleChange}
                className="bg-yellow-400 mr-1"
                value={formik.values.jobType}
              >
                <option value="partTime">Part time</option>
                <option value="fullTime">Full time</option>
              </select>
              <p className="">Workplace Type :</p>
              <select
                name="workPlacetype"
                onChange={formik.handleChange}
                className="bg-yellow-400"
                value={formik.values.workPlacetype}
              >
                <option value="onSite">On Site</option>
                <option value="remote">Remote</option>
                <option value="hybrid">hybrid</option>
              </select>
            </div>
            
            <div className="flex items-center border-b border-gray-700  py-2">
              <p className="w-[50%]"> Salary :</p>
              <input
                name="amount"
                onChange={formik.handleChange}
                className="appearance-none border-b  border-gray-700 bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
                type="text"
                placeholder="Amount"
                aria-label="Duration"
                value={formik.values.amount}
              />
              <select
                name="salaryType"
                onChange={formik.handleChange}
                value={formik.values.salaryType}
                className="bg-yellow-400"
              >
                <option value="per month">per month</option>
                <option value="per day">per hour</option>
              </select>
            </div>
            {formik.errors?.amount ?
               <div className="text-red-400">
                {formik.errors.amount}</div> : null}
            <div className="flex items-center border-b border-gray-700  py-2">
              <p className="w-[50%]"> Duration :</p>
              <input
                name="duration"
                onChange={formik.handleChange}
                className="appearance-none border-b  border-gray-700 bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
                type="text"
                placeholder="Duration in year"
                aria-label="Duration"
                value={formik.values.duration}
              />
            </div>
            <label>Add decrption :</label>
            <div
              name="decrption"
              className="flex items-center border-b border-gray-700 py-2 w-[100%]"
              onChange={formik.handleChange}
              value={formik.values.decrption}
            >
              <textarea name="decrption" className=" w-full"></textarea>
            </div>
            {formik.errors?.decrption ?
               <div className="text-red-400">
                {formik.errors.decrption}</div> : null}
            <button
              className="flex-shrink-0 bg-black hover:bg-yellow-400 border-black text-semibold hover:border-yellow-400 text-sm border-4  text-white py-1 px-2 w-full mt-3 rounded"
              type="submit"
              disabled={formik.isSubmitting}
            >
              Add Job
            </button>
          </form>
        </div>

        <div className="flex items-center py-2 ">
          <p className="text-red-900"></p>
        </div>
      </div>
    </>
  );
};

export default AddJob;
