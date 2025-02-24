import React, {useEffect, useState} from "react";
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

    useEffect(() => {
        const latitude = (coordinates.lat).toString().replace(",", ".");
        const longitude = (coordinates.lng).toString().replace(",", ".");
        getReverseLocation(latitude, longitude);
    }, [coordinates]);

    // Write the name of the place depending the precision of the coordinates
    const translateReverseLocation = (reversedLocation) => {
        if (reversedLocation.address.town) {
            return `${reversedLocation.address.town}, ${reversedLocation.address.state}, ${reversedLocation.address.country}`;
        }
        if (reversedLocation.address.city) {
            return `${reversedLocation.address.city}, ${reversedLocation.address.state}, ${reversedLocation.address.country}`;
        }
        if (reversedLocation.address.province) {
            return `${reversedLocation.address.province}, ${reversedLocation.address.state}, ${reversedLocation.address.country}`;
        }
        if (reversedLocation.address.county) {
            return `${reversedLocation.address.county}, ${reversedLocation.address.state}, ${reversedLocation.address.country}`;
        }
        return `${reversedLocation.address.state}, ${reversedLocation.address.country}`;
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const latitude = (coordinates.lat).toString().replace(",", ".");
        const longitude = (coordinates.lng).toString().replace(",", ".");
        await getWeatherData(latitude, longitude);
    };
    
    const getWeatherData = async (latitude, longitude) => {
        try {
            const response = await apiGetWeatherData(latitude, longitude);
            setWeatherData(response);
            setError(null);
        } catch (error) {
            console.log(error);
            if (error.response.status === 500) {
                setError("Bad request");
            }
        }
    };

    const getReverseLocation = async () => {
        try {
            const latitude = (coordinates.lat).toString().replace(",", ".");
            const longitude = (coordinates.lng).toString().replace(",", ".");
            const reversedLocation = await apiReverseLocation(latitude, longitude);
            console.log(reversedLocation);
            setLocationName(translateReverseLocation(reversedLocation));
        } catch (error) {
            console.log(error);
            setLocationName("Unknown location");
        }
    }
    
    return (
        // <div className="center">
        <div className="content">
            <div className="location-container">
                <h1>Introduce Location</h1>
                <div>{locationName}</div>
                <LocationForm
                    coordinates={coordinates}
                    setCoordinates={setCoordinates}
                    handleSubmit={handleSubmit}
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