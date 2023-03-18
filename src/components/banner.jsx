import React from 'react';
import slide from '../assets/slider-img.png';
import axios from 'axios';
import { useEffect } from 'react';
const Banner = () => {
    useEffect(() => {
        try {
            axios
                .get(`${import.meta.env.VITE_BASESERVER_URL}/home/search`)
                .then((response) => {
                })
        } catch (error) {
            console.log(error);
        }
    }, []);
    const SearchBar = async () => {

        try {
            axios
                .get(`${import.meta.env.VITE_BASESERVER_URL}/home/search`)
                .then((response) => {
                    console.log(response.data.data);
                })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className='flex flex-row'>
                <div className='w-full md:w-[85.2%] lg:w-[85.3%] bg-black h-[400px] md:h-[550px] relative flex justify-end items-center' >
                    <div className='text-white text-[150%] md:text-[250%] lg:text-[300%] w-[40%]' >
                        <p>FIND A </p><p> PERFECT JOB </p> <p>FOR YOU </p>
                    </div>
                    <div className='w-[45%] md:w-[43%] lg:w-[40%] p-3 '>
                        <img src={slide} alt="slider" />
                    </div>
                    <div className='self-end w-[60%] h-[15%] absolute bottom-[-7.5%] left-[20%] p-3 bg-white border border-5 flex flex-row'>
                        <div className='  w-[75%]  border-gray-800 border-r text-center '>
                            <input className='w-full h-full outline-none bg-slate-300 p-2' onChange={SearchBar} placeholder='Keyword' />
                        </div>
                        <div className=' w-[25%] '>
                            <button className='w-full h-full  bg-yellow-400 text-[60%] font-semibold md:text-[100%] p-2'>SEARCH</button>
                        </div>
                    </div>
                </div>
                <div className='hidden md:block bg-yellow-400 w-[14.9%]  h-[550px]'>

                </div>

            </div>
        </div>
    );
}

export default Banner;
