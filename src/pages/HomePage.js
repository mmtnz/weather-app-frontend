import React, {useState} from "react";
import { data } from "react-router-dom";
import { apiGetWeatherData } from "../services/apiWeather";
import WeatherDashboard from "../components/WeatherDashboard";
import LocationForm from "../components/forms/LocationForm";
import LocationFormSmall from "../components/forms/LocationFormSmall";
// import dotenv from "dotenv";
// dotenv.config();
const HomePage = () => {

    const [weatherData, setWeatherData] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);
    
    const getWeatherData = async (e) => {
        e.preventDefault();
        const response = await apiGetWeatherData(longitude, latitude);
        console.log(response);
        setWeatherData(response);
    };
    
    return (
        <div className="center">
            <div className="content">
            {!weatherData ? (
                <>
                    <h1>Introduce location</h1>
                    <LocationForm
                        longitude={longitude}
                        setLongitude={setLongitude}
                        latitude={latitude}
                        setLatitude={setLatitude}
                        getWeatherData={getWeatherData}
                    />
                </>
            ) : (
                <>
                    <LocationFormSmall
                        longitude={longitude}
                        setLongitude={setLongitude}
                        latitude={latitude}
                        setLatitude={setLatitude}
                        getWeatherData={getWeatherData}
                    />
                    <WeatherDashboard weatherData={weatherData} />
                </>
            )}
            </div>
            
            {/* <form className="custom-form" onSubmit={getWeatherData}>
                <div className="form-group">
                    <label htmlFor="longitude">Longitude</label>
                    <input required type="text" id="longitude" name="longitude" onChange={(e) => {setLongitude(e.target.value)}}/>
                </div>
                <div className="form-group">
                    <label htmlFor="latitude">Latitude</label>
                    <input required type="text" id="latitude" name="latitude" onChange={(e) => {setLatitude(e.target.value)}}/>
                </div>

                <button type="submit">Get Weather Data</button>
            </form>
 
            {weatherData && (
                <WeatherDashboard weatherData={weatherData} />
            )} */}
        </div>
  );
};
export default HomePage;