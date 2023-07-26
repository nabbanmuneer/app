import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const loginSumbition = (e) => {
    const data = { loginId, adminPassword };
    e.preventDefault();
    console.log("12345",loginId,adminPassword);
    const response = axios
      .post(`${import.meta.env.VITE_BASESERVER_URL}/admin/login`,data)
      .then((response) => {
       
        if (response.status == 200) {
          navigate("/admin")
        } else {

        }
      }).catch((error) => {
        console.log(error,"error");
      });
  }
  return (
    <div className='w-[screen] h-[screen] grid grid-flow-row ' >
      <div className='w-[screen] h-[60px] bg-slate-500 text-white pl-7 pt-2 text-3xl '>
        Admin
      </div>
      <div className=' w-[full] h-[720px] flex flex-row justify-center ' >
        <div className=' xl:w-[30%] lg:w-[35%] bg-white h-[30%] m-5 border border-slate-500 mt-10 rounded-lg'>
          <div className='m-5 mt-3 text-3xl text-slate-500 font-semibold'>LOGIN</div>
          <form className='m-3 mt-5' onSubmit={loginSumbition} >
            <div className='flex flex-col justify-items-center'>
              <div className='mb-5 '>
                <label className='ml-5 text-slate-500 ' >User Name</label>
                <input
                  name="userName"
                  type="text" className='ml-5 border-b-2 text-slate-500 focus:outline-none '
                  placeholder="User name"
                  value={loginId}
                  onChange={(e) => {
                    setLoginId(e.target.value);
                  }}
                />
              </div>
              <div>
                <label className='ml-5 text-slate-500 ' >Password</label>
                <input
                  name='password'
                  className=' ml-10 border-b-2 text-slate-500 focus:outline-none'
                  placeholder='Password'
                  value={adminPassword}
                  onChange={(e) => {
                    setAdminPassword(e.target.value);
                  }}
                />
              </div>
              <div>
                <button className='p-2 ml-5 mt-3 bg-slate-500 rounded-xl text-white' type="submit">SUBMIT</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin;
