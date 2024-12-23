import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import { ENV } from '../../utils/config/ENV';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = {
  lat: 10.8231, // Mặc định: Thành phố Hồ Chí Minh
  lng: 106.6297,
};

const MapComponent = () => {
  const [mapCenter, setMapCenter] = useState(defaultCenter); // Tọa độ hiển thị bản đồ
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null); // Autocomplete instance

  // Xử lý khi Autocomplete được tải
  const handleAutocompleteLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  // Xử lý khi người dùng chọn địa điểm
  const handlePlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const { lat, lng } = place.geometry.location!;
        setMapCenter({ lat: lat(), lng: lng() }); // Cập nhật tọa độ
      }
    }
  };

  return (
    <LoadScript googleMapsApiKey={ENV.MAP_API_KEY} libraries={['places']}>
      {/* Input tìm kiếm */}
      <Autocomplete onLoad={handleAutocompleteLoad} onPlaceChanged={handlePlaceChanged}>
        <input
          type="text"
          placeholder="Nhập địa điểm"
          style={{
            width: '240px',
            height: '32px',
            padding: '0 12px',
            position: 'absolute',
            top: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          }}
        />
      </Autocomplete>

      {/* Bản đồ Google Map */}
      <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={14}>
        <Marker position={mapCenter} /> {/* Marker tại địa điểm được chọn */}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
