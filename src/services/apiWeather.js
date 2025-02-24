import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;

// Create new axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // 10 seg
    headers: {
      'Content-Type': 'application/json',
    },
});


export const apiGetWeatherData = async (latitude, longitude) =>{
    try {
        const result = await api.get(`/data?latitude=${latitude}&longitude=${longitude}`);
        console.log(result)
        return result.data
    } catch (error) {
        console.log(error)
        throw error
    }
}