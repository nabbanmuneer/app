import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
const Error = () => {
    const navigate = useNavigate();
    return (
        <div className='flex justify-center flex-col items-center h-screen bg-black    '>
            <div className='text-9xl font-semibold text-yellow-400 '>
                404
            </div>
            <div className='text-yellow-400'>The requested resource was not found.</div>
            <div className='font-semibold text-yellow-400'>
                Page not found back to<span> </span> 
                <span className="text-blue-900 underline cursor-pointer" onClick={()=>{navigate("/")}} >home</span>
            </div>
        </div>
    );
}

export default Error;
