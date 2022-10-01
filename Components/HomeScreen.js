import React from 'react';
import {SafeAreaView, Text, Button, StyleSheet} from 'react-native';
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat";


const navController = (navigation, route) =>{
    navigation.navigate(route)
}

//Home screen 
function HomeScreen ({navigation}) {

    //logout button https://stackoverflow.com/questions/45564129/handling-logout-properly-with-react-native
    async function logout (){
        await firebase.auth().signOut();
    }

    return (
        <SafeAreaView style={styles.container} >
            <Text>Closest shops:</Text>
            <Button title="Map" onPress={() => navController(navigation, 'Map')} />
            <Button title="List" onPress={() => navController(navigation, 'List')} />
            <Button onPress={() => logout()} title="Log out" />
            
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

export default HomeScreen