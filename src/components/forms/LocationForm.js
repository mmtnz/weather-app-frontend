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
                    // onChange={(e) => {setLatitude(e.target.value)}}
                    // onChange={(e) => {setCoordinates({...coordinates, lat: e.target.value !== "" ? parseFloat(e.target.value) : null})}}
                    onChange={(e) => {setCoordinates({...coordinates, lat: e.target.value})}}
                    min={-90}
                    max={90}
                    // step="any"
                    step="0.0001"
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
                    // onChange={(e) => {setLongitude(e.target.value)}}
                    onChange={(e) => {setCoordinates({...coordinates, lng: e.target.value})}}
                    min={-180}
                    max={180}
                    step="0.0001"
                />
            </div>
            

            <button type="submit">Get Weather Data</button>
        </form>
    )
}
export default LocationForm;