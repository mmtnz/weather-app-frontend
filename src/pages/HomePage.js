import React, {useState} from "react";
import { data } from "react-router-dom";
import { apiGetWeatherData } from "../services/apiWeather";
import WeatherDashboard from "../components/WeatherDashboard";
import LocationForm from "../components/forms/LocationForm";
import LocationFormSmall from "../components/forms/LocationFormSmall";
import MapView from "../components/maps/MapView";
import { apiReverseLocation } from "../services/apiReverseLocation";

const HomePage = () => {

    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [locationName, setLocationName] = useState(null);
    
    const [coordinates, setCoordinates] = useState({lat: 51.5, lng: 0});

    const translateReverseLocation = (reversedLocation) => {
        if (reversedLocation.address.city) {
            return `${reversedLocation.address.city}, ${reversedLocation.address.country}`;
        }
        if (reversedLocation.address.county) {
            return `${reversedLocation.address.county}, ${reversedLocation.address.country}`;
        }

    }
    
    const getWeatherData = async (e) => {
        e.preventDefault();
        try {
            const latitude = (coordinates.lat).toString().replace(",", ".");
            const longitude = (coordinates.lng).toString().replace(",", ".");
            const response = await apiGetWeatherData(latitude, longitude);
            console.log(response);
            setWeatherData(response);
            setError(null);
            const reversedLocation = await apiReverseLocation(latitude, longitude);
            console.log(reversedLocation);
            setLocationName(translateReverseLocation(reversedLocation));
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
                <div>{locationName}</div>
                {weatherData &&
                    <WeatherDashboard weatherData={weatherData} />
                }
            </div>

        </div>
  );
};
export default HomePage;