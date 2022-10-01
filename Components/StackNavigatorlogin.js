import { createStackNavigator } from "@react-navigation/stack";
import {StyleSheet} from "react-native";
import SignUpForm from "./SignUpForm";
import Loginform from "./LoginForm";

const Stack = createStackNavigator();              

function Stacknavigator() {
    return(
       
        <Stack.Navigator>
            <Stack.Screen name="Sing up" component = {SignUpForm}/>
            <Stack.Screen name="Login" component = {Loginform} />
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