import axios from "axios";
import Moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectCurrentId,
  selectCurrentRole,
  selectCurrentUser,
} from "../../features/auth/authSlice";
import Swal from "sweetalert2";

const detailJob = () => {
  const role = useSelector(selectCurrentRole);
  const userId = useSelector(selectCurrentId);
  const userName = useSelector(selectCurrentUser)
  const [jobTitle, setJobTitle] = useState("");
  const [bidValue, setBidValue] = useState("");
  const [bided, setBided] = useState("");
  const [bid, setBid] = useState(false);
  Moment.locale("en");
  let { id } = useParams();
  const bidPost = (jobId) => {
    const bidData = { bidValue, userId, jobId, userName };
    axios
      .post(`${import.meta.env.VITE_BASESERVER_URL}/employee/bidPost`, bidData)
      .then((response) => {
        if (response.data.status == true) {
          Swal.fire("You Applied successfully").then(() => {
            setBid(true);
          });
        } else {
          Swal.fire("bid failed");
        }
      });
  };
  useEffect(() => {
    const data = { id, userId };
    axios
      .post(`${import.meta.env.VITE_BASESERVER_URL}/employer/jobData`, data)
      .then((response) => {

        const jobData = response.data.jobsData;
        const job = response.data.job[0];
        console.log(jobData);
        setJobTitle(jobData);
        setBided(job);
      });
  }, [bid]);


  return (
    <div>
      <div className="bg-yellow-400 m-5 p-5 flex flex-col rounded-lg">
        <div className="self-center text-xl font-bold  p-2 ">
          {jobTitle.jobTitle}{" "}
        </div>
        <div className="p-2">
          <span className="font-bold"> CATEGORY : </span>{" "}
          <span className="">{jobTitle.Category} </span>{" "}
        </div>
        <div className="p-2">
          <span className="font-bold"> AMOUNT : </span> {jobTitle.amount}{" "}
          {jobTitle.salaryType}
        </div>
        <div className=" p-2">
          <span className="font-bold"> WORK TYPE : </span>{" "}
          {jobTitle.workPlacetype}
        </div>
        <div className="text-lg p-2">
          {" "}
          <span className="font-bold">DURATION :</span> {jobTitle.duration}{" "}
        </div>

        <div className="whitespace-pre-line font-bold p-2">DECRPTION</div>
        <div className="whitespace-pre-line ml-5">{jobTitle.decrption}</div>
        <div className="p-2 self-end">
          POST DATE :
          <span> {Moment(jobTitle.createdAt).format("d MMM yyyy")} </span>
        </div>
        <div className="p-2 text-lg tex">
          <span className="font-bold">S :</span>{" "}
          <span>{jobTitle.status} </span>
        </div>
      </div>
      {role == "employee" ? (
        <>
          {" "}
          {!bided ? (
            <div className="p-5 grid-flow-col m-5 rounded-xl bg-yellow-400  w-fit">
              {jobTitle.jobType == "partTime" ? (
                <>
                  <input
                    onChange={(e) => {
                      setBidValue(e.target.value);
                    }}
                    type="text"
                    className="w-28 rounded-sm"
                    placeholder=" eg:500 "
                    pattern="[0-9]*"
                  />
                  <span className="font-bold"> /{jobTitle.salaryType}</span>
                  <button
                    className="bg-black text-yellow-400 p-1 rounded-xl w-16 ml-6"
                    onClick={() => bidPost(jobTitle._id)}
                  >
                    BID
                  </button>
                </>
              ) : (
                <button
                  className="bg-black text-yellow-400 p-1 rounded-xl w-16"
                  onClick={() => bidPost(jobTitle._id)}
                >
                  APPLY
                </button>
              )}
            </div>
          ) : (
            <div className="p-5 grid-flow-col m-5 rounded-xl bg-yellow-400  w-fit text-xl font-bold">
              You Already Applied
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};

export default detailJob;
