import React, { useState, useEffect } from 'react';

const NeedsBoard = () => {
  // State to store nearby charity needs
  const [needs, setNeeds] = useState([
    { id: 1, charity: 'Local Food Bank', needs: 'Canned food', location: { lat: 40.7128, lon: -74.0060 } },  // Example location (New York City)
    { id: 2, charity: 'Homeless Shelter', needs: 'Toiletries', location: { lat: 40.730610, lon: -73.935242 } }  // Another example (Brooklyn)
  ]);

  // State to store user location (latitude and longitude)
  const [userLocation, setUserLocation] = useState({ lat: null, lon: null });

  // Function to handle geolocation API
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Get latitude and longitude from the geolocation API
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Set user location state
          setUserLocation({ lat: latitude, lon: longitude });

          // Log the user's latitude and longitude (for testing purposes)
          console.log("Latitude:", latitude);
          console.log("Longitude:", longitude);
        },
        (error) => {
          // Handle error if geolocation fails (e.g., user denies permission)
          console.error("Geolocation error:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Get the user's location when the component mounts
  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Nearby Needs</h1>
      {userLocation.lat && userLocation.lon ? (
        <p>Your Location: Latitude: {userLocation.lat}, Longitude: {userLocation.lon}</p>
      ) : (
        <p>Loading your location...</p>
      )}

      {/* Loop through charity needs and display them */}
      {needs.map((need) => (
        <div key={need.id} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
          <h2 style={{ color: '#0056b3' }}>{need.charity}</h2>
          <p>Needs: {need.needs}</p>
          <p>Charity Location: Latitude: {need.location.lat}, Longitude: {need.location.lon}</p>
        </div>
      ))}
    </div>
  );
};

export default NeedsBoard;
