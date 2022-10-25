import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { SafeAreaView, Text, StyleSheet, TextInput, Button} from 'react-native';
import firebase from "firebase/compat";
import { initializeApp } from "firebase/app";

function Loginform () {


const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [errorMessage, setErrorMessage] = useState(null)

//https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#signinwithemailandpassword
async function login () {
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (error){
        setErrorMessage(error.message)
    }
}

    return (
        <SafeAreaView>
            <Text style={styles.header}>Login</Text>
            <TextInput
                placeholder="email"
                value={email}
                onChangeText={(email) => setEmail(email)}
                style={styles.inputField}/>
            <TextInput
                style = {styles.inputField}
                placeholder="password"
                value={password} 
                onChangeText={(password) => setPassword(password)}
                secureTextEntry //Password - can't see what writing 
                />
            
                {errorMessage && (
                <Text style={styles.error}>Error: {errorMessage}</Text> //error message 
            )}
            <Button title='Login' onPress={() => login()}/>
        </SafeAreaView>
    );
}

export default Loginform

const styles = StyleSheet.create({
        inputField: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
    },error: {
        color: 'red',
    },header: {
        fontSize: 40,
    }
  });
