import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';

const axiosInstance=axios.create({
baseURL:import.meta.env.VITE_baseURL,
withCredentials:true
})
const useAxiosSecure = () => {
    const {logOut}=useAuth()
    const navigate=useNavigate()
    useEffect(()=>{
        axiosInstance.interceptors.response.use( (response)=> {
            
            return response;
          }, (error)=> {
            if(error.status === 401 || error.status === 403){
                
                logOut()
                .then(()=>{
                   navigate('/sign-in')
                })
                
                return Promise.reject(error);
            }
            
          });
    },[logOut,navigate])
    return axiosInstance
    
};

export default useAxiosSecure;