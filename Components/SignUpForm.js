import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { SafeAreaView, Text, StyleSheet, TextInput, Button} from 'react-native';
import firebase from "firebase/compat";
import { initializeApp } from "firebase/app";

//Stack Navigatior to signup page
const navController = (navigation, route) =>{
    navigation.navigate(route)
}

function SignUpForm ({navigation}) {

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [errorMessage, setErrorMessage] = useState(null)

const signup = async() => {
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password).then((data)=>{
        });
    } catch (error){
        setErrorMessage(error.message)
    }
}

    return (
        <SafeAreaView>
            <Text style={styles.header}>Sign up</Text>
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
                secureTextEntry
                />
                {errorMessage && (
                <Text style={styles.error}>Error: {errorMessage}</Text>
            )}
            <Button onPress={() => signup()} title="Create user" />
            <Button title="Click here if you already have an account" onPress={() => navController(navigation, 'Login')} />
        </SafeAreaView>
    );
}

export default SignUpForm

const styles = StyleSheet.create({
        inputField: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
    },error: {
        color: 'red',
    },header: {
        fontSize: 40,
    },
  });
  