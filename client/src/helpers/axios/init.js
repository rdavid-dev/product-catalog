import axios from 'axios';

const { VITE_SERVER_URL } = import.meta.env;

const axiosInstance = axios.create({
    baseURL: `${VITE_SERVER_URL}`,
    withCredentials: false
})

axiosInstance.interceptors.request.use(
    config => {
        //Set the default header here
        config.headers['X-Requested-With'] = 'XMLHttpRequest'

        return config
    },
    error => {
        return Promise.reject(error)
    })

axiosInstance.interceptors.response.use(
    response => {
        //When success return the promise data
        const data = response.data

        return Promise.resolve(data)
    },
    error => {
        //For now return the full error object
        //error.response.data - Content for the error data
        //error.response.status - Status code of the error
        //error.response.headers - Set of headers of an error
        return Promise.reject(error)
    })

export default axiosInstance