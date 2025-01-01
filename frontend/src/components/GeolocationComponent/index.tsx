import React, { useState, useEffect } from "react";
import { getApiCurrentLocation } from "../../services/apiAddress";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

interface Address {
  city: string;
  district: string;
  ward: string;
}

const GeolocationComponent: React.FC = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [placeName, setPlaceName] = useState<Address | null>(null);

  const handleGetLocationAndPlaceName = async () => {
    if (!navigator.geolocation) {
      alert("Trình duyệt không hỗ trợ định vị.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        
        // Gọi API để lấy thông tin địa chỉ từ tọa độ
        const res = await getApiCurrentLocation(latitude, longitude);
        if (res && res.address) {
          const address = res.address;
          setPlaceName({
            city: address.city || "",
            district: address.suburb.replace('District', '').trim() || "",
            ward: address.quarter || "",
          });
        } else {
          setPlaceName(null);
        }
      },
      (error) => {
        console.error("Lỗi khi lấy vị trí:", error);
        alert("Vui lòng bật định vị để sử dụng tính năng này.");
      }
    );
  };

  useEffect(() => {
    handleGetLocationAndPlaceName();
  }, []);

  // Khi vị trí thay đổi, render lại bản đồ với key mới
  const mapKey = location ? `${location.latitude}-${location.longitude}` : "default";

  return (
    <div className="p-4">
      <button
        onClick={handleGetLocationAndPlaceName}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Lấy vị trí hiện tại
      </button>
      
      {location && (
        <div className="mt-4">
          <p>📍 <strong>Vĩ độ:</strong> {location.latitude}</p>
          <p>📍 <strong>Kinh độ:</strong> {location.longitude}</p>
        </div>
      )}
      
      {placeName && (
        <div className="mt-2">
          <p>🌍 <strong>Thành phố:</strong> {placeName.city}</p>
          <p>🌍 <strong>Quận:</strong> {placeName.district}</p>
          <p>🌍 <strong>Phường:</strong> {placeName.ward}</p>
        </div>
      )}

      {location && (
        <MapContainer
          center={[location.latitude, location.longitude] as LatLngExpression}  // Dùng latitude và longitude từ vị trí người dùng
          zoom={13}
          style={{ height: "300px", width: "80%" }} // Chỉnh sửa kích thước của bản đồ
          key={mapKey} // Unique key cho phép re-render bản đồ khi vị trí thay đổi
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[location.latitude, location.longitude] as LatLngExpression}>
            <Popup>
              {placeName ? `${placeName.city}, ${placeName.district}, ${placeName.ward}` : "Vị trí không xác định"}
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default GeolocationComponent;
