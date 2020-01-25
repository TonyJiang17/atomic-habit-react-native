import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {Context as AuthContext} from '../context/AuthContext';
import Spacer from '../components/Spacer';
import {SafeAreaView} from 'react-navigation';
import {FontAwesome } from '@expo/vector-icons';
import {AsyncStorage} from 'react-native';



const AccountScreen = () => {
    const {signout} = useContext(AuthContext);

    // clearAsyncStorage = async() => {
    //     AsyncStorage.clear();
    // }

    return (
        <SafeAreaView style = {styles.container} forceInset={{top: 'always'}}>
            {/* <Button onPress={clearAsyncStorage}>
                <Text>Clear Async Storage</Text>
            </Button> */}
            <Text style = {{fontSize:40, marginBottom: 20, marginLeft: 15}} >AccountScreen</Text>
            <Spacer>
                <Button title = "Sign out" onPress={signout}/>
            </Spacer>
        </SafeAreaView>
    );
}

AccountScreen.navigationOptions = {
    title: 'Account',
    tabBarIcon: <FontAwesome name = 'gear' size = {20}/>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 450
    }
});

export default AccountScreen;