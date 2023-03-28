import axios, { Axios } from "axios";
import Moment from "moment";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import EditJob from "../../components/modals/editJob";
import Swal from "sweetalert2";
const JobDetail = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [job, setJob] = useState([]);
  const [isOpenFrom, setIsOpenFrom] = useState(false);
  const Navigate = useNavigate();
  Moment.locale("en");
  let { id } = useParams();

  useEffect(() => {
    const data = { id };
    axios
      .post(`${import.meta.env.VITE_BASESERVER_URL}/employer/jobData`, data)
      .then((response) => {
        const jobData = response.data.jobsData;
        const jobBid = response.data.job;
        setJobTitle(jobData);
        setJob(jobBid);
      }).catch((error) => {
        Navigate("/404");
    });
  }, []);

  const employeeProfile = (user) => {
    Navigate(`/employee/profile/${user}`);
  }
  const deleteJob = (id) => {
    const data = { id };
    axios
      .post(`${import.meta.env.VITE_BASESERVER_URL}/employer/jobData/delete`, data)
      .then((response) => {
        Swal.fire("job delete sucessfully")
        Navigate("/employer/profile/user")
      })
  }
  const accpted = (id, value) => {
    let jobId = jobTitle._id
    let userId = id
    let amount = value
    const data = { jobId, userId, amount };
    console.log("ssss", data);
    axios
      .post(`${import.meta.env.VITE_BASESERVER_URL}/employer/selected`, data)
      .then((response) => {
        Swal.fire("job sucessfully");
        Navigate("/employer/profile/user");
      })
  }

  return (
    <div>
      <div className="bg-yellow-400 m-5 p-5 flex flex-col">
        <div className="self-center text-xl font-bold  p-2 ">{jobTitle.jobTitle} </div>
        <div className="p-2"><span className="font-bold"> CATEGORY : </span> <span className=''>{jobTitle.Category} </span> </div>
        <div className="p-2">
          <span className="font-bold"> AMOUNT : </span> {jobTitle.amount} {jobTitle.salaryType}
        </div>
        <div className=" p-2">
          <span className="font-bold"> JOB TYPE : </span> {jobTitle.jobType}
        </div>
        <div className=" p-2">
          <span className="font-bold"> WORK TYPE : </span> {jobTitle.workPlacetype}
        </div>
        <div className="text-lg p-2"> <span className="font-bold">DURATION :</span> {jobTitle.duration} </div>

        <div className="whitespace-pre-line font-bold p-2">DECRPTION</div>
        <div className="whitespace-pre-line ml-5">
          {jobTitle.decrption}
        </div>
        <div className="p-2 self-end">
          POST DATE :<span  > {Moment(jobTitle.createdAt).format('d MMM yyyy')}{" "}</span>
        </div>
        <div>STATUS : {jobTitle.selected && !jobTitle.selected[0] ? "pending" : "Selected" }</div>
        {jobTitle.selected && !jobTitle.selected[0] ?<div className="p-2">
          <button
            onClick={() => setIsOpenFrom(true)}
            className="p-2 bg-neutral-800 rounded-md  text-white hover:bg-black "
          >Edit</button>
          <button className="p-2 rounded-md ml-3 hover:bg-red-900 bg-red-700" onClick={() => deleteJob(jobTitle._id)}>Delete</button>
        </div>:null}
      </div>

      {jobTitle.selected && !jobTitle.selected[0] ? <div className='m-5 p-5 flex flex-col'>
        <div className="text-3xl" >Bids</div>

        {job && job.map((value, index) =>
          <div className="flex flex-col   bg-yellow-400 p-5 m-5 rounded-xl " key={index} >
            <div className="text-2xl flex flex-row ">
              <div onClick={() => employeeProfile(value.bid.userId)}> {value.bid.user}</div>
              <div> {value.bid.value}</div>
            </div>
            <div><button onClick={() => { accpted(value.bid.userId, value.bid.value || jobTitle.amount) }} className="bg-black rounded-xl p-3 mt-2 text-yellow-400 hover:bg-white hover:text-black ">Accepted</button></div>
          </div>
        )}

      </div> : <div className=" text-3xl font-bold p-5 " onClick={() => employeeProfile(jobTitle.selected[0].userId)}>
        Selected 
      </div>} 
      {isOpenFrom && <EditJob setIsOpenFrom={setIsOpenFrom} />}
    </div>
  );
};

export default JobDetail;

