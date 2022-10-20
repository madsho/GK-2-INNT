import { NavigationContainer  } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {StyleSheet} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

//Pages 
import Map from "./Map";
import List from "./List";
import HomeScreen from "./HomeScreen";

//Create Tab navigator 

const Tab = createBottomTabNavigator();      

//Icons: https://www.npmjs.com/package/react-native-ionicons

function Tabnavigator() {
    return(
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarActiveTintColor: "blue",
                tabBarInactiveTintColor: "gray",
                tabBarIcon: ({ color, size }) => {
                  if (route.name === 'Home') {
                    return (
                        <Ionicons
                            name={'home-outline'}
                            size={size}
                            color={color}
                        />
                    );
                  } else if (route.name === 'Map') {
                    return (
                        <Ionicons
                            name='md-map-outline'
                            size={size}
                            color={color}
                        />
                    );
                  }
                  else{
                    return (
                        <Ionicons
                            name='md-list-outline'
                            size={size}
                            color={color}
                        />
                    );
                  }
                },
              })}>
                <Tab.Screen name ="Home" children = {() => <HomeScreen/>}/>
                <Tab.Screen name ="Map" children = {() => <Map/>}/>
                <Tab.Screen name ="List" children = {() => <List/>}/>
            </Tab.Navigator>
    );
}


export default Tabnavigator;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});