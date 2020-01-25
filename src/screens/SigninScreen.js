import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Button, Text} from 'react-native';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import {Context as AuthContext} from '../context/AuthContext';
import {NavigationEvents} from 'react-navigation';
import {Feather} from '@expo/vector-icons';
import {AsyncStorage} from 'react-native';




const SigninScreen = () => {
    const {state, signin, clearErrorMessage} = useContext(AuthContext);

    // clearAsyncStorage = async() => {
    //     AsyncStorage.clear();
    // }

    return (
        <View style = {styles.container}>
            <NavigationEvents 
                onWillBlur = {clearErrorMessage}
            /> 
            {/* <Button 
                onPress={clearAsyncStorage}
                title = 'clear storage'
            /> */}
            <AuthForm 
                headerText = 'Sign in to your account'
                errorMessage = {state.errorMessage}
                onSubmit = {signin}
                submitButtonText = 'Sign in '
            />
            <NavLink 
                text = "Don't have an account? Sign up instead"
                routename = 'Signup'
            />
        </View>
    );
}

SigninScreen.navigationOptions = () => {
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

export default SigninScreen;