import React from 'react';
import empoloyee from '../assets/Lovepik_com-401864255-professionals.png';
import empoloyer from "../assets/pngwing.com.png";
import { useNavigate } from "react-router-dom";


const choice = () => {
    const Navigate = useNavigate();
    return (
        <div className=' grid grid-cols-1 md:grid-cols-2 divide-y justify-center relative  h-screen'>
            <div className='absolute md:flex flex-row w-full justify-center hidden  '>
                <span className='text-black text-5xl font-semibold  '>Choose  &nbsp;</span>
                <span className='text-white text-5xl font-semibold  ' >the &nbsp;</span>
                <span className='text-yellow-400 text-5xl font-semibold'>option &nbsp;</span>
            </div>
            <div onClick={()=>Navigate('/employee/register')} className=' bg-yellow-400 flex items-center  justify-center' >
                <div className=' border-8 border-black item-center w-[40%] md:w-[60%]'>
                    <div className='text-center text-3xl font-bold text-white'>Employee</div>
                    <img className='' src={empoloyee} alt="empoyee" />
                </div>
            </div>
            <div onClick={()=>Navigate('/employer/register')} className='bg-black text-white flex items-center  justify-center'>
                <div className='border-8 border-yellow-400 flex flex-col items-center  w-[40%] md:w-[60%] '>
                    <div className='text-center text-3xl font-bold text-white'>Employer</div>
                    <img className=' ' src={empoloyer} width='80%' alt="empoyer" />
                </div>
            </div>
        </div>
    );
}

export default choice;
