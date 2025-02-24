import React from "react";

const LocationFormSmall = ({longitude, setLongitude, latitude, setLatitude, getWeatherData}) => {
    return (
        // <div>
        <form className="custom-form-small" onSubmit={getWeatherData}>
            <div className="form-group">
                <label htmlFor="longitude">Longitude</label>
                <input
                    required
                    type="text"
                    id="longitude"
                    name="longitude"
                    value={longitude}
                    onChange={(e) => {setLongitude(e.target.value)}}/>
            </div>
            <div className="form-group">
                <label htmlFor="latitude">Latitude</label>
                <input
                    required
                    type="text"
                    id="latitude"
                    name="latitude"
                    value={latitude}
                    onChange={(e) => {setLatitude(e.target.value)}}/>
            </div>

            <button type="submit">Get Weather Data</button>
        </form>
        // </div>
    )
}
export default LocationFormSmall;