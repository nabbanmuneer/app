import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectCurrentToken,
} from "../../features/auth/authSlice";

const employeeUpdate = ({ setIsOpen }) => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [place, setPlace] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [qualification, setQualification] = useState("");
  const [image, setImage] = useState("");
  const [pdf, setPdf] = useState("");
  const [id, setId] = useState(' ');
  // ---------------------------for details--------------------------
  useEffect(() => {
    console.log("error", user, token);
    if (token) {
      axios
        .post(`${import.meta.env.VITE_BASESERVER_URL}/home/get`, user, {
          headers: { token },
        })
        .then((response) => {
          if (response.status == "404") {
          } else {
            let data = response.data.data;
            setUserName(data.userName);
            setPhoneNo(data.phoneNo);
            setEmail(data.email);
            setPlace(data.place);
            setQualification(data.qualification);
            setImage(data.profilePic)
            setPdf(data.resume);
            setId(data._id);
          }
        });
    }
  }, []);
  //================validation=================
  const [validation, setValidation] = useState({
    userName: {
      status: true,
      message: "",
    },
  });

  const nameCheck = () => {
    let letters = /^[A-Za-z]+$/;
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
  const onHandleSubmit = async (e) => {
    e.preventDefault();
    nameCheck();
    let profilePic =image ;
    let resume = pdf;
    // here
    //------------------------- it's for profile image-------------------------------
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append(
        "upload_preset",
        `${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}`
      );
      data.append(
        "cloud_name",
        `${import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET}`
      );
      await axios
        .post(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
          }/image/upload`,
          data
        )
        .then((response) => {
          profilePic = response.data.secure_url;
          console.log("url photo cloudinary;", profilePic);
        })
        .catch((error) => {
          console.error(error);
          return "error";
        });
    }
    //   here over
    //-------------------------  pdf posted-----------------------------------------------
    console.log("profileURL", profilePic);
    if (pdf) {
      const resumeData = new FormData();
      resumeData.append("file", pdf);
      resumeData.append(
        "upload_preset",
        `${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}`
      );
      resumeData.append(
        "cloud_name",
        `${import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET}`
      );
      await axios
        .post(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
          }/image/upload`,
          resumeData
        )
        .then((response) => {
          resume = response.data.secure_url;
          console.log("url of pdf cloudinary;", resume);
        })
        .catch((error) => {
          console.error(error);
          return "error";
        });
    }
    const user = { userName, place, qualification, profilePic, resume ,id };
    console.log("data", user);
    //=============================Sumbition to controllers===============================
    if (nameCheck()) {
      const response = axios
        .post(`${import.meta.env.VITE_BASESERVER_URL}/employee/update`, user)
        .then((res) => {
          if (res.data) {
          
          } else {
            console.log("error");
          }
        });
      console.log(
        "data log",
        place,
        userName,
        qualification,
        profilePic,
        pdf
      );
      setIsOpen(false);
    } else {
      console.log("Error");
    }
  };

  return (
    <>
    <div className="w-full h-screen h-lg-full bg-opacity-75 bg-black inset-0 fixed flex flex-col items-center" >
      <div className="text-white font-extrabold self-end cursor-pointer" onClick={() => setIsOpen(false)}>close</div>
      <div className="p-5 text-3xl">Profile Update</div>
      <div className="w-[70%] sm:w-[50%] md:w-[40%] lg:w-[30%]">
        <form
          className="w-full bg-yellow-400 p-5 rounded-xl bottom-5 h-full"
          onSubmit={onHandleSubmit}
          onClick={() => setIsOpen(true)}
        >
          <div className="flex items-center border-b border-gray-700  py-2">
            <p className="w-[50%]">Username :</p>
            <input
              name="userName"
              onBlur={nameCheck}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              className="appearance-none border-b  border-gray-700 bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
              type="text"
              placeholder="Username"
              aria-label="Username"
              value={userName}
            />
          </div>
          {!validation.userName.status && (
            <p className="text-red-700 mt-6 ">{validation.userName.message}</p>
          )}
          <div className="flex items-center border-b border-gray-700 py-2 ">
            <p className="w-[50%]">email :</p>
            <label
              name="email"
              className="appearance-none  bg-transparent border-none w-full  leading-tight focus:outline-none"
            >{email}</label>
          </div>

          <div className="flex items-center border-b border-gray-700  py-2 ">
            <p className="w-[50%]">Phone no :</p>
            <label
              name="phoneNo"
              className="aappearance-none  bg-transparent border-none w-full  leading-tight focus:outline-none"
              >
              {phoneNo}
              </label>
          </div>

          <div className="flex items-center border-b border-gray-700 py-2 ">
            <p className="w-[50%]">Location :</p>
            <input
              name=" "
              onChange={(e) => {
                setPlace(e.target.value);
              }}
              className="appearance-none border-b  border-gray-700 bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
              type="text"
              placeholder="place"
              aria-label="PhoneNo"
              value={place}
            />
          </div>
          <div className="flex items-center border-b border-gray-700 py-2 ">
            <p className="w-[50%]">Qualification :</p>
            <input
              name=" "
              onChange={(e) => {
                setQualification(e.target.value);
              }}
              className="appearance-none border-b  border-gray-700 bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
              type="text"
              placeholder="Qualification"
              aria-label="PhoneNo"
              value={qualification}
            />
          </div>
          <div className="flex items-center border-b border-gray-700 py-2 ">
            <p className="w-[50%]">Add Picture :</p>
            <label className="w-full ">
              <input
                className="text-sm cursor-pointer w-36 hidden"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
                type="file"
                multiple
              />
              <div class="text bg-neutral-800  text-neutral-300 border border-gray-300 text-center rounded cursor-pointer p-1 px-3">
                Select the picture
              </div>
            </label>
          </div>
          <div className="flex items-center border-b border-gray-700 py-2 ">
            <p className="w-[50%]">Upload CV :</p>
            <label className="w-full ">
              <input
                class="text-sm cursor-pointer w-36 hidden"
                onChange={(e) => {
                  setPdf(e.target.files[0]);
                }}
                type="file"
                multiple
              />
              <div class="text bg-neutral-800  text-neutral-300 border border-gray-300 text-center rounded cursor-pointer p-1 px-3">
                Upload your cv
              </div>
            </label>
          </div>

          <button
            className="flex-shrink-0 bg-black hover:bg-yellow-400 border-black text-semibold hover:border-yellow-400 text-sm border-4  text-white py-1 px-2 w-full mt-3 rounded"
            type="submit"
          >
            Update
          </button>
        </form>
      </div>

      <div className="flex items-center py-2 ">
        <p className="text-red-900"></p>
      </div>
    </div>
    </>
  );
};

export default employeeUpdate;
