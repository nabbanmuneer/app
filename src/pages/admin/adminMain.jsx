import React, { useEffect, useState } from 'react';
import { BiMenu } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx"
import axios from 'axios';

const AdminMain = () => {
    const [data, setData] = useState('');

    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BASESERVER_URL}/admin/fullData`)
            .then((res) => {
                if (res.status == 201) {
                    setData(res.data);

                } else if (res.status == 501) {
                    console.log(" Internal Server Error: The server encountered an error while processing the request ");
                }
            }).catch((error) => {
                navigate('/404');
                console.log(error);
            })
    }, []);
    return (
        <div>
            <div className='  '>
                <div className="cursor-context-menu h-[60px] max-w-[1240] mx-auto px-0 bg-slate-700 flex flex-row ">
                    <div className='text-white p-3'>
                        <GiHamburgerMenu size={30} />
                    </div>
                    <div className='text-3xl font-bold text-white p-3 ml-5 '>
                        Admin

                    </div>
                </div>
                <div>

                </div>
            </div>
            <div className='grid grid-flow-col justify-around mt-14'>
                <div className='flex flex-col'>
                    <div className='text-6xl text-center'>{data.employeeCount}</div>
                    <div className='text-2xl'>Total Employee</div>
                </div>
                <div className='flex flex-col'>
                    <div className='text-6xl text-center'>{data.employerCount}</div>
                    <div className='text-2xl'>Total Employer</div>
                </div>
                <div className='flex flex-col'>
                    <div className='text-6xl text-center'>{data.jobCount}</div>
                    <div className='text-2xl'>Total Job</div>
                </div>
                <div className='flex flex-col'>
                    <div className='text-6xl text-center'>55</div>
                    <div className='text-2xl'>total employee</div>
                </div>
            </div>
            <div className='bg-slate-100' >
                <div className='h-[50px] mt-10  bg-slate-500'>
                    <div className='text-2xl  ml-5 text-center font-bold'>
                        Employee Data
                    </div>
                </div>
                {data.employee &&
                    data.employee.map((value, index) => (
                        <div className=" m-5  h-[50px] rounded-2xl bg-slate-200  "
                            onClick={() => selection(value._id)} key={index}>
                            <div className="font-semibold ml-3 text-xl">{value.userName}</div>
                        </div>
                    ))}
            </div>
            <div className='bg-slate-100 pb-5' >
                <div className='h-[50px] mt-10  bg-slate-500'>
                    <div className='text-2xl  ml-5 text-center font-bold'>
                        Employer Data
                    </div>
                </div>
                {data.employer &&
                    data.employer.map((value, index) => (
                        <div className=" m-5  h-[50px] rounded-2xl bg-slate-200  "
                            onClick={() => selection(value._id)} key={index}>
                            <div className="font-semibold ml-3 text-xl">{value.userName}</div>
                        </div>
                    ))}
            </div>
            <div className='bg-slate-100 pb-5' >
                <div className='h-[50px] mt-10  bg-slate-500'>
                    <div className='text-2xl  ml-5 text-center font-bold'>
                        Jobs
                    </div>
                </div>
                {data.job &&
                    data.job.map((value, index) => (
                        <div className=" m-5  h-[50px] rounded-2xl bg-slate-200  "
                            onClick={() => selection(value._id)} key={index}>
                            <div className="font-semibold ml-3 text-xl">{value.jobTitle}</div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default AdminMain;
