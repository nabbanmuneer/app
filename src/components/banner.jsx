import React from 'react';
import slide from '../assets/slider-img.png';
import axios from 'axios';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
const Banner = () => {
    useEffect(() => {
        try {
            axios
                .get(`${import.meta.env.VITE_BASESERVER_URL}/home/search`)
                .then((response) => {
                })
        } catch (error) {
            Navigate("/404")
        }
    }, []);


    return (
        <div>
            <div className='flex flex-row'>
                <div className='w-full md:w-[85.1%] lg:w-[85.3%] bg-black h-[400px] md:h-[550px] relative flex justify-end items-center' >
                    <div className='text-white text-[150%] md:text-[250%] lg:text-[300%] w-[40%]' >
                        <p>FIND A </p><p> PERFECT JOB </p> <p>FOR YOU </p>
                    </div>
                    <div className='w-[45%] md:w-[43%] lg:w-[40%] p-3 '>
                        <img src={slide} alt="slider" />
                    </div>
                    
                </div>
                <div className='hidden md:block bg-yellow-400 w-[14.9%]  h-[550px]'>

                </div>

            </div>
        </div>
    );
}

export default Banner;
