import React,{useEffect,useState} from 'react';
import { useNavigate } from "react-router-dom";
import Moment from "moment";
import axios from 'axios';
const JobsPage = () => {
    const [jobs, setJobss] = useState([]);
    const Navigate = useNavigate();
    Moment.locale("en");
    useEffect(() => {
        axios
        .get(
          `${import.meta.env.VITE_BASESERVER_URL}/employee/jobs`)
          .then((response) => { 
             const values = response.data.data
             setJobss(values)
          }).catch((error) => {
            Navigate("/404");
        });  
    }, []);
    const jobProfile = (id)=>{
        Navigate(`/employee/jobs/${id}`)
      }
    return (
        <div>
          <div className='text-3xl font-bold p-5 min-h-screen'>
            JOBS
            <button className=' ml-3 p-3 bg-black text-yellow-400 rounded-xl text-xl' >Part Time</button>
            </div>
            <div className='w-50 '>
            {jobs &&
                jobs.map((value, index) => (
                  <div
                    className="   bg-yellow-400 p-5 m-5 rounded-xl"
                    key={index}
                    onClick={() => jobProfile(value._id)}
                  >
                    <p className="font-bold">{value.jobTitle}  </p>
                    <p className="ml-2">{value.Category}</p>
                    <p className="ml-2">Posted : {Moment(value.jobTitle.createdAt).format("d MMM yyyy")}</p>
                  </div>
                ))}  
            </div>
        </div>
    );
}

export default JobsPage;
