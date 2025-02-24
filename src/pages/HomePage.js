import React, {useState} from "react";
import { data } from "react-router-dom";
import { apiGetWeatherData } from "../services/apiWeather";
import WeatherDashboard from "../components/WeatherDashboard";
import LocationForm from "../components/forms/LocationForm";
import LocationFormSmall from "../components/forms/LocationFormSmall";
import MapView from "../components/maps/MapView";
// import dotenv from "dotenv";
// dotenv.config();
const HomePage = () => {

    const [weatherData, setWeatherData] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [error, setError] = useState(null);
    
    const [coordinates, setCoordinates] = useState({lat: 51.5, lng: 0});
    
    const getWeatherData = async (e) => {
        e.preventDefault();
        try {
            const latitude = (coordinates.lat).toString().replace(",", ".");
            const longitude = (coordinates.lng).toString().replace(",", ".");
            const response = await apiGetWeatherData(latitude, longitude);
            console.log(response);
            setWeatherData(response);
            setError(null);
        } catch (error) {
            console.log(error);
            if (error.response.status === 500) {
                setError("Bad request");
            }
        }
        
    };
    
    return (
        // <div className="center">
        <div className="content">
            <div className="location-container">
                <h1>Introduce Location</h1>
                <LocationForm
                    coordinates={coordinates}
                    setCoordinates={setCoordinates}
                    getWeatherData={getWeatherData}
                />
                {error && <p className="error">{error}</p>}
                <MapView coordinates={coordinates} setCoordinates={setCoordinates}/>
            </div>
            <div className="weather-container">
                {weatherData &&
                    <WeatherDashboard weatherData={weatherData} />
                }
            </div>

        </div>
  );
};
export default HomePage;