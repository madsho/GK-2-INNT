import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, Button, StyleSheet } from 'react-native';
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import {Accuracy} from "expo-location";



//Home screen 
function Map () {
//https://www.youtube.com/watch?v=AzjWv1X-uyg&ab_channel=TheFlutterFactory

  const [currentLocation, setCurrentLocation] = useState({latitude: 55.687241, longitude: 12.561859});  //Standard region so the maps opens
  //const [region, setRegion] = useState(null)
  //const [marker, setMarker] = useState({longitude: 0, latitude: 0});
  const [shops, setShops] = useState({}); 

  //Use effect https://docs.expo.dev/versions/latest/sdk/location/
  /*useEffect(() => {
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
  }, []);*/


  //øvelse 8 maps sætter usestate med brugerens lokation
  const updateLocation = async () => {
    await Location.getCurrentPositionAsync({accuracy: Accuracy.Balanced}).then((item)=>{
      setCurrentLocation(item.coords) 
    } );
  };


  async function update(){ //URL google api ændre alt efter personens loaktion 
  const URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${currentLocation.latitude}%2C${currentLocation.longitude}&radius=1000&type=supermarket&key=AIzaSyBQeOKGnEHgTHLWsuYcWpCJnzMbMGU_hOI`;

  fetch(URL).then(data=> {
    return data.json()
  }).then(jsonData => {
   console.log(jsonData.results)
   setShops(jsonData.results);
  }).catch(error=> {
    console.log(error);
  }) 
  
}

console.log(shops[0].geometry);

 function placeMarkers(){

  //Try to makes markers on the map
  return(
    <SafeAreaView>
   
      </SafeAreaView>
  )
 
}

    return (
      <SafeAreaView>
        <Button title='Update shops' onPress={() => {update()}}></Button>
        <Button style title="update location" onPress={updateLocation} />

        <MapView
              style ={styles.map}
              provider={PROVIDER_GOOGLE}
              showsUserLocation={true}
              region = {{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05
              }}>
               {Array.isArray(shops) 
      ? shops.map((shop, index) =>{
        return(
        <Marker key={index} coordinate={{latitude: shop.geometry.location.lat, longitude: shop.geometry.location.lng}}></Marker>
        
        )
      }) : null}
              </MapView>      
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

