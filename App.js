//import liraries
import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

// create a component
const initialState = {
  latitude: null,
  longitude: null,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}
const App = () => {
  const [currentPosition, setCurentPosition] = useState(initialState);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      // alert(JSON.stringify(position))
      const { latitude, longitude } = position.coords;

      setCurentPosition({
        ...currentPosition,
        latitude,
        longitude
      });
    }, error => alert(error.message), {
      timeout: 20000, maximumAge: 1000
    });
    
  }, [])
  return currentPosition.latitude ? (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF', }}
      initialRegion={currentPosition}
      showsUserLocation
    />
  ) : <ActivityIndicator style={{ flex: 1 }} animating size='large' />
};


//make this component available to the app
export default App;
