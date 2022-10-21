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

    //Usestate for all shops 
    const [shops, setShops] = useState({}); 
    const [currentLocation, setCurrentLocation] = useState({latitude: 55.687241, longitude: 12.561859}); 
    const [defineAddres, setDefineAddress] = useState(""); 


    const updateLocation = async () => {
        await Location.getCurrentPositionAsync({accuracy: Accuracy.Balanced}).then((item)=>{
        setCurrentLocation(item.coords)
        }
        ), update()
      };
    
//function so only fetches when button is run 
 function update(){
    //API url with my personal API - nearby place with coordinates of Copenhagen a radius of 1km and type is set to supermaket 
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


const changeaddres = async () => {
    await Location.geocodeAsync(defineAddres).then((data) =>{
        let coordinates = data[0]
        setCurrentLocation(coordinates)
        
    }), update()
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