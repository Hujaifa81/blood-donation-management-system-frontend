import axios from "axios";

const axiosInstance=axios.create({
baseURL:import.meta.env.VITE_baseURL,
})
export const useAxios=()=>{
    return axiosInstance
}