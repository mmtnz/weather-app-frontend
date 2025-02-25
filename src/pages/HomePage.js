import React, {useEffect, useState} from "react";
import { apiGetWeatherData } from "../services/apiWeather";
import WeatherDashboard from "../components/WeatherDashboard";
import LocationForm from "../components/forms/LocationForm";
import MapView from "../components/maps/MapView";
import NameForm from "../components/forms/NameForm";
import { apiGetCoordinates, apiReverseLocation } from "../services/apiGetCoordinates";
import translateReverseLocation from "../utils/translateReverseLocation";

const HomePage = () => {

    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [locationName, setLocationName] = useState(null);
    const [searchLocationName, setSearchLocationName] = useState("");
    const [coordinates, setCoordinates] = useState({lat: 51.5, lng: 0});
    const [searchByCoordinates, setSearchByCoordinates] = useState(false);

    useEffect(() => {
        const latitude = (coordinates.lat).toString().replace(",", ".");
        const longitude = (coordinates.lng).toString().replace(",", ".");
        getReverseLocation(latitude, longitude);
    }, [coordinates]);

    // Handle form submit when using coordinates
    const handleSubmit = async (e) => {
        e.preventDefault();
        const latitude = (coordinates.lat).toString().replace(",", ".");
        const longitude = (coordinates.lng).toString().replace(",", ".");
        await getWeatherData(latitude, longitude);
    };

    // Handle form submit when using location name
    const handleSubmitByName = async (e) => {
        e.preventDefault();
        try {
            // Get coordinates from location name
            const response = await apiGetCoordinates(searchLocationName);
            const latitude = response.lat;
            const longitude = response.lon;
            setCoordinates({lat: latitude, lng: longitude});
            await getWeatherData(latitude, longitude);
        } catch (error) {
            console.log(error);
            setError("Location not found");
        }
    }
    
    // Queries weather data from api
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

    // Get the name of the location
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
        <div className="content">
            <div className="location-container">
                <h1>Introduce Location</h1>
                <label htmlFor="daily">
                    <input
                        type="checkbox"
                        name="searchByCoordinates"
                        checked={searchByCoordinates}
                        onChange={() => {setSearchByCoordinates(!searchByCoordinates)}}
                    />
                    Search by coordinates
                </label>

                {searchByCoordinates ? (
                    <LocationForm
                        coordinates={coordinates}
                        setCoordinates={setCoordinates}
                        handleSubmit={handleSubmit}
                    />
                ):(
                    <NameForm
                        name={searchLocationName}
                        setName={setSearchLocationName}
                        handleSubmit={handleSubmitByName}
                    />
                )}

                {error && <p className="error">{error}</p>}
                <div>{locationName}</div>
                <MapView coordinates={coordinates} setCoordinates={setCoordinates}/>
            </div>
            <div className="weather-container">
                <h1>Weather Data</h1>
                {weatherData &&
                    <WeatherDashboard weatherData={weatherData} />
                }
            </div>

        </div>
  );
};
export default HomePage;