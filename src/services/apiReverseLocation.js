import axios from 'axios';

const API_BASE_URL = "https://nominatim.openstreetmap.org";

// Create new axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // 10 seg
    headers: {
      'Content-Type': 'application/json',
    },
});

export const apiReverseLocation = async (latitude, longitude) =>{
    try {
        const result = await api.get(`/reverse?accept-language=en&format=json&lat=${latitude}&lon=${longitude}`);
        return result.data
    } catch (error) {
        console.log(error)
        throw error
    }
}