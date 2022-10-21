import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { SafeAreaView, Text, StyleSheet, TextInput, Button, View} from 'react-native';
import firebase from "firebase/compat";
import { initializeApp } from "firebase/app";

//Stack Navigatior to signup page
const navController = (navigation, route) =>{
    navigation.navigate(route)
}

function SignUpForm ({navigation}) {

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [confirmpassword, setconfirmpassword] = useState('')
const [errorMessage, setErrorMessage] = useState(null)
const [confirmPwError, setconfirmPwError] = useState('')

const signup = async() => {
    try {
        //Function that only runs if Password and confirm password is equal
        if(confirmpassword == password){
        await firebase.auth().createUserWithEmailAndPassword(email, password).then((data)=>{
        });
    }else{
        setconfirmPwError("Passwords do not match")
    }
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
            <TextInput
                style = {styles.inputField}
                placeholder="confirm password"
                value={confirmpassword}
                onChangeText={(confirmpassword) => setconfirmpassword(confirmpassword)}
                secureTextEntry
                />
    
                {errorMessage && (
                <Text style={styles.error}>Error: {errorMessage}</Text>
            )}
            <Text tyle={styles.error}>{confirmPwError}</Text>
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
  