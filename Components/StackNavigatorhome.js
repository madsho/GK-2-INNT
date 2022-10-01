import { createStackNavigator } from "@react-navigation/stack";
import {StyleSheet} from "react-native";
import Map from "./Map";
import List from "./List";
import HomeScreen from "./HomeScreen";


const Stack = createStackNavigator();              

function Stacknavigator() {
    return(
       
        <Stack.Navigator>
            <Stack.Screen name ="Home" component={HomeScreen}/>
            <Stack.Screen name="Map" component = {Map}/>
            <Stack.Screen name="List" component = {List} />
        </Stack.Navigator>
       
    );
}

export default Stacknavigator;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});