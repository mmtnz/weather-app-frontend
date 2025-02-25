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

// Get coordinates from location name
export const apiGetCoordinates = async (location) =>{
    try {
        const result = await api.get('/search', {
            params: {
                "accept-language": "en",
                "q": location,
                "format": "json"
            }
        });
        return result.data[0]
    } catch (error) {
        console.log(error)
        throw error
    }
}

// Get location name from coordinates
export const apiReverseLocation = async (latitude, longitude) =>{
    try {
        const result = await api.get("/reverse", {
            params: {
                "accept-language": "en",
                "format": "json",
                "lat": latitude,
                "lon": longitude
            }
        });
        return result.data
    } catch (error) {
        console.log(error)
        throw error
    }
}