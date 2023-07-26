import React, { useEffect,useState } from 'react';
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
                    
                } else if (res.status == 501)
                {
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
                    <div className='text-6xl'>{data.employeeCount}</div>
                    <div className='text-2xl'>Total Employee</div>
                </div>
                <div className='flex flex-col'>
                    <div className='text-6xl'>{data.employerCount}</div>
                    <div className='text-2xl'>Total Employer</div>
                </div>
                <div className='flex flex-col'>
                    <div className='text-6xl'>{data.jobCount ? 0 :data.jobCount}</div>
                    <div className='text-2xl'>Total Job</div>
                </div>
                <div className='flex flex-col'>
                    <div className='text-6xl'>55</div>
                    <div className='text-2xl'>total employee</div>
                </div>
            </div>
        </div>
    );
}

export default AdminMain;
