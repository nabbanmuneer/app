import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Home = () => {
  const [catFull, setCatFull] = useState([]);
  const [catPart, setCatPart] = useState([]);
  const [catOption, setCatOption] = useState("");
  const Navigate = useNavigate();
  useEffect(() => {
          axios
        .post(`${import.meta.env.VITE_BASESERVER_URL}/home/homeGet`)
        .then((response) => {
          setCatFull(response.data.data1);
          setCatPart(response.data.data2)
        })
      }, []);
 const filterJobs = (value)=>{
  Navigate(`/jobs/Category/${value}`)
 }
 
  return (
    <div className="">
      <div className="w-full  flex justify-center items-center flex-col">
        <div className="w-[100%] text-center mt-10 ">
          <p className="font-extrabold text-2xl mt-3 mb-3 md:text-4xl p-5 md:tracking-widest text-yellow-500">
            RECOMMENDED JOBS
          </p>
          <p className="font-bold text-2xl md:text-4xl mb-5 p-5 md:tracking-widest ">
            {" "}
            15,000+ AVAILABLE HERE FOR YOU{" "}
          </p>
        </div>
        <div className=" w-full h-10 flex justify-around mt-5 mb-16">
          <div>
            <button
            onClick={()=>{setCatOption("")}}
              className={
                !catOption
                  ? "bg-black text-yellow-400 rounded-xl font-semibold w-40 h-full hover:bg-yellow-400  hover:text-black"
                  : " bg-yellow-400 rounded-xl font-semibold w-40 h-full hover:bg-black hover:text-yellow-400"
              }
            >
              Full Time
            </button>
          </div>
          <div>
            <button
            onClick={()=>{setCatOption("value")}}
              className={
                catFull
                ? " bg-yellow-400 rounded-xl font-semibold  w-40 h-full hover:bg-black hover:text-yellow-400"
                  : "bg-black text-yellow-400 rounded-xl font-semibold w-40 h-full hover:bg-yellow-400  hover:text-black"
              }
            >
              Part Time
            </button>
          </div>
        </div>
        {catOption ?(<div className="grid grid-cols-3 lg:p-24 md:p-16 p-8 items-center justify-around w-full">
          {catPart &&
            catPart.map((value, index) => (
              <div
                className="font-bold font-mono  bg-yellow-400 rounded-2xl text-center flex items-center justify-center lg:text-3xl md:text-2xl text-xl h-[150px] lg:h-[200px] xl:h-[250px]  m-5 "
                key={index}
                onClick={() =>filterJobs(value._id) }
              >
                {value._id}
              </div>
            ))}
        </div>):(<div className="grid grid-cols-3 lg:p-24 md:p-16 p-8 items-center justify-around w-full ">
          {catFull &&
            catFull.map((value, index) => (
              <div
                className=" font-bold font-mono  bg-yellow-400 rounded-2xl text-center flex items-center justify-center lg:text-3xl md:text-2xl text-xl h-[150px] lg:h-[200px] xl:h-[250px]  m-5 "
                key={index}
                onClick={() =>filterJobs(value._id) }
              >
                {value._id}
              </div>
            ))}
        </div>)}
      </div>
    </div>
  );
};

export default Home;
