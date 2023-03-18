import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'

const employerRegisterform = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRe_password] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [status, setstatus] = useState(false);
  const [otp, setotp] = useState("");
  const [msg, setmsg] = useState("");
  const [validation, setValidation] = useState({
    userName: {
      status: true,
      message: "",
    },
    email: {
      status: true,
      message: "",
    },
    password: {
      status: true,
      message: "",
    },
    phoneNo: {
      status: true,
      message: "",
    },
    passwordResult: {
      status: true,
      message: "",
    },
    otp: {
      statue: true,
      message: "",
    },
  });
  const handleChange = (enteredOtp) => {
    setotp(enteredOtp);
  };
  const otpCheck = () => {
    if (otp.length == 4) {
      setValidation((prevState) => ({
        ...prevState,
        otp: {
          status: true,
          message: "Enter the 4 digits",
        },
      }));
    } else {
      setValidation((prevState) => ({
        ...prevState,
        otp: {
          status: true,
          message: "",
        },
      }));
    }
  };
  const nameCheck = () => {
    if (userName.length < 3) {
      setValidation((prevState) => ({
        ...prevState,
        userName: {
          status: false,
          message: "name must be more than 2 character",
        },
      }));
      return false;
    } else {
      setValidation((prevState) => ({
        ...prevState,
        userName: {
          status: true,
          message: "",
        },
      }));
      return true;
    }
  };
  const passwordCheck = () => {
    if (password.length < 6) {
      setValidation((prevState) => ({
        ...prevState,
        password: {
          status: false,
          message: "password must be 6 characters",
        },
      }));
      return false;
    } else {
      setValidation((prevState) => ({
        ...prevState,
        password: {
          status: true,
          message: "",
        },
      }));
      return true;
    }
  };
  const mobileCheck = () => {
    if (phoneNo.length !== 10) {
      setValidation((prevState) => ({
        ...prevState,
        phoneNo: {
          status: false,
          message: "invalid mobile number",
        },
      }));
      return false;
    } else {
      setValidation((prevState) => ({
        ...prevState,
        phoneNo: {
          status: true,
          message: "",
        },
      }));
      return true;
    }
  };

  const passwordVerify = () => {
    if (password !== re_password) {
      setValidation((prevState) => ({
        ...prevState,
        passwordResult: {
          status: false,
          message: "password does not match",
        },
      }));
      return false;
    } else {
      setValidation((prevState) => ({
        ...prevState,
        passwordResult: {
          status: true,
          message: "",
        },
      }));
      return true;
    }
  };

  const onHandleSubmit = (e) => {
    const user = { email, userName, phoneNo, password, re_password };
    e.preventDefault();
    nameCheck();
    passwordCheck();
    mobileCheck();
    passwordVerify();
    if (
      nameCheck() &&
      passwordCheck() &&
      mobileCheck() &&
      password == re_password
    ) {
     axios
        .post(`${import.meta.env.VITE_BASESERVER_URL}/employer/register`, user)
        .then((res) => {
          if (res.data.status == true) {
            setstatus(true);
          }
        });
    } else {
      console.log("Error");
    }
  };
  const otpverify = (e) => {
    const user = { email, userName, phoneNo, password, otp };
    e.preventDefault();
    const response = axios
      .post(`${import.meta.env.VITE_BASESERVER_URL}/employer/otpverify`, user)
      .then((res) => {
        if (res.data.status == true) {
          Swal.fire("registered sucessfully").then(() => {
            navigate("/login");
          });
        } else {
          Swal.fire("Invalid OTP")
        }
      });
  };
  return (
    <div className="w-full h-screen h-lg-full bg-yellow-400  flex flex-col items-center  ">
      <div className="p-5 text-5xl">Sign Up</div>
      <div className="w-[70%] sm:w-[50%] md:w-[40%] lg:w-[30%]">
        <form
          className="w-full bg-white p-5 rounded-xl bottom-5 h-full"
          onSubmit={onHandleSubmit}
        >
          <div className="flex items-center border-b bg-white border-gray-700 py-2">
            <input
              name="userName"
              onBlur={nameCheck}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="User name"
              aria-label="userName"
              value={userName}
            />
          </div>
          {!validation.userName.status && (
            <p className="text-red-700 mt-6 ">
              {validation.userName.message}
            </p>
          )}
          <div className="flex items-center border-b bg-white border-gray-700 py-2 ">
            <input
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="email"
              placeholder="Email"
              aria-label="Email"
              value={email}
            />
          </div>

          <div className="flex items-center border-b bg-white border-gray-700 py-2 ">
            <input
              name="phoneNo"
              onChange={(e) => {
                setPhoneNo(e.target.value);
              }}
              onBlur={mobileCheck}
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Phone no"
              aria-label="phoneNo"
              value={phoneNo}
            />
          </div>
          {!validation.phoneNo.status && (
            <p className="text-red-700 mt-6 ">{validation.phoneNo.message}</p>
          )}
          <div className="flex items-center border-b bg-white border-gray-700 py-2 ">
            <input
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onBlur={passwordCheck}
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="password"
              placeholder="Password"
              aria-label="Password"
              value={password}
            />
          </div>
          {!validation.password.status && (
            <p className="text-red-700 mt-6 ">{validation.password.message}</p>
          )}
          <div className="flex items-center border-b bg-white border-gray-700 py-2 ">
            <input
              name="re_password"
              onBlur={passwordVerify}
              onChange={(e) => {
                setRe_password(e.target.value);
              }}
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="password"
              placeholder="Re-Password"
              aria-label="Re-Password"
              value={re_password}
            />
          </div>
          {!validation.passwordResult.status && (
            <p className="text-red-700 mt-6 ">
              {validation.passwordResult.message}
            </p>
          )}
          <button
            className="flex-shrink-0 bg-black hover:bg-yellow-400 border-black hover:border-yellow-400 text-sm border-4  text-white py-1 px-2 w-full mt-3 rounded"
            type="submit"
          >
            Sign Up
          </button>
          <p className="p-3">
            You Already have a Accon?
            <span className="text-blue-400 cursor-default">
              <a>Log in</a>
            </span>
          </p>
        </form>
      </div>
      {status ? (
        <div className="mt-5 w-[70%] sm:w-[50%] md:w-[40%] lg:w-[30%] p-4 flex flex-col rounded-xl border-3 items-center ">
          <div className="text-white"> Verify OTP</div>
          <div>
            <OtpInput
              className="text-black ml-5"
              value={otp}
              onChange={handleChange}
              numInputs={4}
              separator={<span className="m-2  p-1 text-xl text-white">-</span>}
              isInputNum={true}
            />
          </div>
          <div>
            <button
              className="bg-neutral-900 text-white px-3 rounded-xl"
              onClick={otpverify}
            >
              SUBMIT
            </button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <div className="flex items-center border-b  border-gray-700 py-2 ">
        <p className="text-red-900">{msg}</p>
      </div>
    </div>
  );
};

export default employerRegisterform;
