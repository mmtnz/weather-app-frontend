import React, {useState} from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default icon issue in Leaflet with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


const LocationMarker = ({ coordinates, setCoordinates }) => {
    useMapEvents({
        click(e) {
            const { lat, lng } = e?.latlng;
            console.log(lat, lng);
            setCoordinates({ lat: lat.toFixed(4), lng: lng.toFixed(4)}); // Update parent state
            // setCoordinates({ lat: parseFloat(lat.toFixed(5)), lng: parseFloat(lng.toFixed(5)) }); // Update parent state
        },
    });
  
    return coordinates ? (
        <Marker position={[coordinates?.lat ?? 0, coordinates?.lng ?? 0]}>
            {/* <Popup>
            📍 Latitude: {coordinates?.lat.toFixed(4) ?? 0}, Longitude: {coordinates?.lng.toFixed(4) ?? 0}
            </Popup> */}
        </Marker>
        ) : null;
};

const MapView = ({ coordinates, setCoordinates }) => {
    const position = [coordinates?.lat ?? 0, coordinates?.lng ?? 0]; // Default to London
  
    return (
    //   <MapContainer center={position} zoom={6} style={{ height: '50vh', width: '100%' }}>
        <div className='map-container'>
            <MapContainer center={position} zoom={6} >
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker coordinates={coordinates} setCoordinates={setCoordinates} />
            </MapContainer>
          </div>
    );
  };

export default MapView;
