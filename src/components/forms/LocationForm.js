import React from "react";

const LocationForm = ({coordinates, setCoordinates, handleSubmit}) => {
    return (
        <form className="custom-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="latitude">Latitude</label>
                <input
                    required
                    type="number"
                    id="latitude"
                    name="latitude"
                    value={coordinates.lat}
                    onChange={(e) => {setCoordinates({...coordinates, lat: e.target.value})}}
                    min={-90}
                    max={90}
                    step="0.0001"  // 4 decimals
                />
            </div>
            <div className="form-group">
                <label htmlFor="longitude">Longitude</label>
                <input
                    required
                    type="number"
                    id="longitude"
                    name="longitude"
                    value={coordinates.lng}
                    onChange={(e) => {setCoordinates({...coordinates, lng: e.target.value})}}
                    min={-180}
                    max={180}
                    step="0.0001"  // 4 decimals
                />
            </div>
            <button type="submit">Get Weather Data</button>
        </form>
    )
}
export default LocationForm;