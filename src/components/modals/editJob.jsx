import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
const AddJob = ({ setIsOpenFrom }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [Category, setCategory] = useState("");
  const [jobType, setJobType] = useState("");
  const [workPlacetype, setWorkPlacetype] = useState("");
  const [amount, setAmount] = useState("");
  const [salaryType, setSalaryType] = useState("");
  const [decrption, setDecrption] = useState("");
  const [duration, setDuration] = useState("");

  let { id } = useParams();
  useEffect(() => {
    const data = { id };
    axios
      .post(`${import.meta.env.VITE_BASESERVER_URL}/employer/jobData`, data)
      .then((response) => {
        console.log(response);
        const jobData = response.data.jobsData;
        setJobTitle(jobData.jobTitle);
        setCategory(jobData.Category);
        setJobType(jobData.jobType);
        setWorkPlacetype(jobData.workPlacetype);
        setAmount(jobData.amount);
        setSalaryType(jobData.salaryType);
        setDecrption(jobData.decrption);
        setDuration(jobData.duration);
      }).catch((error) => {
          Navigate("/404");
      })
  }, [id]);

  const handleOnSubmit = async (values) => {
    try {
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
      axios
        .post(`${import.meta.env.VITE_BASESERVER_URL}/employer/editJob`, job)
        .then((response) => {
          if (response.data.status == true) {
            Swal.fire("job Edited sucessfully").then(() => {
              setIsOpenFrom(false);
            });
          } else {
            Swal.fire("job Edited unsucessfully");
          }
        });
    } catch (error) {
      Swal.fire("job post unsucessfully");
    }
  };

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
            onSubmit={handleOnSubmit}
          >
            <div className="flex items-center border-b border-gray-700  py-2">
              <p className="w-[50%]">Job Title :</p>
              <input
                name="jobTitle"
                onChange={(e) => {
                  setJobTitle(e.target.value);
                }}
                className="appearance-none border-b  border-gray-700 bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
                type="text"
                placeholder="jobTitle"
                aria-label="jobTitle"
                value={jobTitle}
              />
            </div>
            <div className="flex items-center border-b border-gray-700  py-2">
              <p className="w-[50%]"> Category :</p>
              <input
                name="Category"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className="appearance-none border-b  border-gray-700 bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
                type="text"
                placeholder="Category"
                aria-label="Category"
                value={Category}
              />
            </div>
            <div className="flex items-center border-b border-gray-700  py-2">
              <p className="">Job Type :</p>
              <select
                name="jobType"
                onChange={(e) => {
                  setJobType(e.target.value);
                }}
                className="bg-yellow-400 mr-1"
                value={jobType}
              >
                <option value="partTime">Part time</option>
                <option value="fullTime">Full time</option>
              </select>
              <p className="">Workplace Type :</p>
              <select
                name="workPlacetype"
                onChange={(e) => {
                  setWorkPlacetype(e.target.value);
                }}
                className="bg-yellow-400"
                value={workPlacetype}
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
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                className="appearance-none border-b  border-gray-700 bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
                type="text"
                placeholder="Amount"
                aria-label="Duration"
                value={amount}
              />
              <select
                name="salaryType"
                onChange={(e) => {
                  setSalaryType(e.target.value);
                }}
                value={salaryType}
                className="bg-yellow-400"
              >
                <option value="per month">per month</option>
                <option value="per day">per hour</option>
              </select>
            </div>
            <div className="flex items-center border-b border-gray-700  py-2">
              <p className="w-[50%]"> Duration :</p>
              <input
                name="duration"
                onChange={(e) => {
                  setDuration(e.target.value);
                }}
                className="appearance-none border-b  border-gray-700 bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
                type="text"
                placeholder="Duration in year"
                aria-label="Duration"
                value={duration}
              />
            </div>
            <label>Add description :</label>
            <div
              name="decrption"
              className="flex items-center border-b border-gray-700 py-2 w-[100%]"
              onChange={(e) => {
                setDecrption(e.target.value);
              }}
              value={decrption}
            >
              <textarea name="decrption" className=" w-full"></textarea>
            </div>

            <button
              className="flex-shrink-0 bg-black hover:bg-yellow-400 border-black text-semibold hover:border-yellow-400 text-sm border-4  text-white py-1 px-2 w-full mt-3 rounded"
              type="submit"
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
