import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-elements';
import {Context as AuthContext} from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import {NavigationEvents} from 'react-navigation';
import {Feather} from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';



const SignupScreen= ({navigation}) => {
    const {state, signup, clearErrorMessage} = useContext(AuthContext);

    // const test = () => {
    //     const stuff = await AsyncStorage.getItem('token');
    //     console.log(stuff);
    // };

    // useEffect(() => {
    //     tryLocalSignin();
    // },[]);



    return <View style={styles.container}>
        <NavigationEvents    
            onWillBlur = {clearErrorMessage}
        /> 
        <AuthForm 
            headerText = "Sign up for Atomic Habit"
            errorMessage = {state.errorMessage}
            submitButtonText = "Sign up"
            onSubmit = {signup}
        />
        <NavLink 
            routename="Signin"
            text="Already have an account? Sign in instead!"
        />
    </View>;
}

// SignupScreen.navigationOptions = ({navigation}) => {
//     return {
//         headerLeft: (
//             <TouchableOpacity onPress={() => navigation.navigate('Index')}>
//                     <Feather name="list" size={30}/>
//             </TouchableOpacity>
//         )
//     };
// };

SignupScreen.navigationOptions = () => {
    return {
        header: null
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 225
    }
});

export default SignupScreen;