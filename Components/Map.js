import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, Button, StyleSheet } from 'react-native';
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';



//Home screen 
function Map () {
//https://www.youtube.com/watch?v=AzjWv1X-uyg&ab_channel=TheFlutterFactory
//Used to set the region of the app. Where the app opens up 
const copenhagen = {
    latitude: 55.687241,
    longitude: 12.561859,
    latitudeDelta: 1.0,
    longitudeDelta: 1.0
  };

  //const [currentLocation, setCurrentLocation] = useState({longitude: 37.78825, latitude: -122.4324});  
  //const [region, setRegion] = useState(null)
  //const [marker, setMarker] = useState({longitude: 0, latitude: 0});
  const [shops, setShops] = useState({}); 

  //Use effect https://docs.expo.dev/versions/latest/sdk/location/
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 1.0,
        longitudeDelta: 1.0
    }
      //setCurrentLocation(location);
      //console.log(location);
      //setRegion(region);
    })();
  }, []);


  async function update(){
  const URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=55.687241%2C12.561859&radius=1000&type=supermarket&key=AIzaSyBQeOKGnEHgTHLWsuYcWpCJnzMbMGU_hOI`;

  fetch(URL).then(data=> {
    return data.json()
  }).then(jsonData => {
   console.log(jsonData.results)
   setShops(jsonData.results);
  }).catch(error=> {
    console.log(error);
  }) 
  
}

 function placeMarkers(){

  //Try to makes markers on the map
  return(
    <SafeAreaView>
    {Array.isArray(shops) 
      ? shops.map((shop, index) =>{
        return(
        <Marker key={index} coordinate={{latitude: shop.geometry.location.lat, longitude: shop.geometry.location.lng}}></Marker>
        
        )
      }) : null}
      </SafeAreaView>
  )
}

    return (
      <SafeAreaView>
        <Button title='Update' onPress={() => {update()}}></Button>

        <MapView
              style ={styles.map}
              provider={PROVIDER_GOOGLE}
              showsUserLocation={true}
              region = {copenhagen}
              >{placeMarkers()}</MapView>      
      </SafeAreaView>
    );
    

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: '5%',
        backgroundColor: '#ecf0f1',
        padding: 8,
    },map:{
        height: '100%'
    }
});

export default Map

