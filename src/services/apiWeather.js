import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;


// Create new axios instance
const api = axios.create({
    baseURL: API_BASE_URL || "https://api.open-meteo.com/v1",
    timeout: 10000, // 10 seg
    headers: {
      'Content-Type': 'application/json',
    },
});


export const apiGetWeatherData = async (latitude, longitude) =>{
    try {
        let result;
        // if local API provided
        if (API_BASE_URL){
            result = await api.get(`/data`, {
                params: {
                    latitude,
                    longitude
                }
            });
        } else {
            result = await api.get(`/forecast`, {
                params: {
                    latitude,
                    longitude,
                    daily: [
                        "temperature_2m_max",
                        "temperature_2m_min",
                        "weather_code",
                        "precipitation_probability_mean"
                    ],
                    hourly: [
                        "temperature_2m",
                        "precipitation_probability"
                    ]
                }
            });
        }
        return result.data
    } catch (error) {
        console.log(error)
        throw error
    }
}