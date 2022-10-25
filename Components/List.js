import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, Button, StyleSheet, ScrollView, TextInput } from 'react-native';
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { CurrentRenderContext } from '@react-navigation/native';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import {Accuracy} from "expo-location";

//Home screen 
function List () {

    //Usestate for all shops recieved from the google places api 
    const [shops, setShops] = useState({}); 
    //Usetate for the location. Coordinates are inserted else the map wouldn't load
    const [currentLocation, setCurrentLocation] = useState({latitude: 55.687241, longitude: 12.561859}); 
    //Usestate for the address defined by the user 
    const [defineAddres, setDefineAddress] = useState(""); 

//Get the current location. Exercise 8 /App.js lines 45-49 https://github.com/Innovationg-og-ny-teknologi-2021/8_maps_solution/blob/main/App.js
    const updateLocation = async () => {
        await Location.getCurrentPositionAsync({accuracy: Accuracy.Balanced}).then((item)=>{
        setCurrentLocation(item.coords)
        }
        ), update() // runs update function so all the closes shops is recieved 
      };
    

 function update(){
    //API url with my personal API - nearby place with coordinates of users coordinates a radius of 1km and type is set to supermaket 
    const URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${currentLocation.latitude}%2C${currentLocation.longitude}&radius=1000&type=supermarket&key=AIzaSyBQeOKGnEHgTHLWsuYcWpCJnzMbMGU_hOI`;
//Fetch as shown in google documentation 
    fetch(URL).then(data=> {
      return data.json() //The data ie all places fecthed are made returned
    }).then(jsonData => {
     console.log(jsonData.results) //logging all the data
     setShops(jsonData.results); //Setting the useState with the shops fetched so it can be used later 
    }).catch(error=> {
      console.log(error); 
    }) 
}

//Defining a address
const changeaddres = async () => {
    await Location.geocodeAsync(defineAddres).then((data) =>{ //Geocode converts the address to coordinates 
        let coordinates = data[0] //The data is an array and the coordinates are located in the first position
        setCurrentLocation(coordinates)//the location is set as the current location 
        
    }), update() //after this the new shops are recieved 
 };

    return (
        <SafeAreaView style={styles.container} >
            <Text>Closest shops:</Text>
            <Button title='Update shops' onPress={() => {update()}}></Button> 
            <Button style title="update location" onPress={updateLocation} />
            <TextInput
                placeholder="Enter address"
                value={defineAddres}
                onChangeText={(defineAddres) => setDefineAddress(defineAddres)}
                style={styles.inputField}/>
            <Button title='Change address' onPress={() => changeaddres()}/>
            <ScrollView>
            {
                Array.isArray(shops) 
                ? shops.map((shop, index) =>{
                  return(
                    <SafeAreaView key={index}>
                    <Text>{shop.name}</Text>
                    <Text>{shop.vicinity}</Text>
                    <Text>{}</Text>
                    </SafeAreaView>
                    )
                }) : null}
                </ScrollView>

               
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
    },inputField: {
      borderWidth: 1,
      margin: 10,
      padding: 10,
      
    }
});

export default List