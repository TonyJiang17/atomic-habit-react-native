import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Text, Button, Input} from 'react-native-elements';
import Spacer from './Spacer';

const AuthForm = ({headerText, errorMessage, onSubmit, submitButtonText}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <Spacer>
                <Text h3>{headerText}</Text>
            </Spacer>
            <Spacer>
                <Input 
                    label = "email"
                    value = {email}
                    onChangeText = {setEmail}
                    autoCapitalize = "none"
                    autoCorrect = {false}
                />
            </Spacer>
            <Spacer>
                <Input 
                    secureTextEntry={true}
                    label = "password"
                    value = {password}
                    onChangeText = {setPassword}
                    autoCapitalize = "none"
                    autoCorrect = {false}
                />
            </Spacer>
            {errorMessage 
                ? <Text style = {styles.errorMessage}>{errorMessage}</Text>
                : null}
            <Spacer>
                <Button title={submitButtonText} onPress={() => onSubmit({email,password})} />
            </Spacer>
        </>
    );
}

const styles = StyleSheet.create({
    errorMessage: {
        marginLeft: 15,
        marginTop:15,
        fontSize:16,
        color: 'red'
    }
});

export default AuthForm;