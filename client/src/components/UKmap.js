    import React, { useEffect, useState } from 'react';
    import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
    import L from 'leaflet';

    // Fix default icon issue for Leaflet + React
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });

    function UKMap() {
    const [landmarks, setLandmarks] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/landmarks/')
        .then(response => response.json())
        .then(data => setLandmarks(data))
        .catch(error => console.error('Error fetching landmarks:', error));
    }, []);

    return (
        <MapContainer center={[54.5, -3]} zoom={6} style={{ height: '700px', width: '100%' }}>
        <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {landmarks.map((lm) => (
            <Marker key={lm.id} position={[lm.lat, lm.lon]}>
            <Popup>
                <strong>{lm.name}</strong><br />
                {lm.description}
            </Popup>
            </Marker>
        ))}
        </MapContainer>
    );
    }

    export default UKMap;
