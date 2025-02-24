import React from "react";

const LocationForm = ({longitude, setLongitude, latitude, setLatitude, getWeatherData}) => {
    return (
        <form className="custom-form" onSubmit={getWeatherData}>
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
    )
}
export default LocationForm;