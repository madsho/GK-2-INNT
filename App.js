import {initializeApp } from 'firebase/app'
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './Components/HomeScreen';
import firebase from "firebase/compat";
import Stacknavigatorlogin from './Components/StackNavigatorlogin';
import TabNavigatorHome from './Components/Tabnavigator';
import { NavigationContainer } from '@react-navigation/native';
import React, {useEffect, useState} from 'react';

//Firebase comfig
const firebaseConfig = {
  apiKey: "AIzaSyAKQQac9QjOJiIspT2QFxln7ZcEr59Q2TQ",
  authDomain: "ovelse4-50a78.firebaseapp.com",
  databaseURL: "https://ovelse4-50a78-default-rtdb.firebaseio.com",
  projectId: "ovelse4-50a78",
  storageBucket: "ovelse4-50a78.appspot.com",
  messagingSenderId: "652792397560",
  appId: "1:652792397560:web:3fd46c80fde8951afb850d"
};

//Monitors if the user is active - set to false as default https://johnwcassidy.medium.com/firebase-authentication-hooks-and-context-d0e47395f402
export default function App() {
  const [user, setUser] = useState({ loggedIn: false });

  //listen to auth changes https://johnwcassidy.medium.com/firebase-authentication-hooks-and-context-d0e47395f402
  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

//Connecting setUser hook as a callback to the onAuthStateChange fucntion https://johnwcassidy.medium.com/firebase-authentication-hooks-and-context-d0e47395f402
  function onAuthStateChange(callback) {
    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        callback({loggedIn: true, user: user});
      } else {
        callback({loggedIn: false});
      }
    });
  }
  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    }

const LoginPage = () => {   
  return (
    <NavigationContainer>
      <Stacknavigatorlogin/>
      </NavigationContainer>    
      
  );
}
//

const Homepage = () => {   
  return (
      <NavigationContainer>
      <TabNavigatorHome/>
      </NavigationContainer>
  );
}
  return user.loggedIn ? <Homepage /> : <LoginPage/> ;

};