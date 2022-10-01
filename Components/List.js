import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { CurrentRenderContext } from '@react-navigation/native';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

//Home screen 
function List () {

    //Usestate for all shops 
    const [shops, setShops] = useState({}); 
//function so only fetches when button is run 
 function update(){
    //API url with my personal API - nearby place with coordinates of Copenhagen a radius of 1km and type is set to supermaket 
    const URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=55.687241%2C12.561859&radius=1000&type=supermarket&key=AIzaSyBQeOKGnEHgTHLWsuYcWpCJnzMbMGU_hOI`;
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
    

    return (
        <SafeAreaView style={styles.container} >
            <Text>Closest shops:</Text>
            <Button title='Update' onPress={() => {update()}}></Button>
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
    },
});

export default List