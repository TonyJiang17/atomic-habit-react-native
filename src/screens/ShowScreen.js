import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Context} from '../context/HabitContext';
import {Context as AuthContext} from '../context/AuthContext';
import {FontAwesome} from '@expo/vector-icons'
import {NavigationEvents} from 'react-navigation';


const ShowScreen = ({navigation}) => {
    const {state} = useContext(Context);

    const habit = state.find((habit) => habit.id === navigation.getParam('id'));
    return (
        <View>
            <Text>{habit.title}</Text>
            <Text>{habit.description}</Text>
            <Text>Habit Loop</Text>
            <Text>{habit.cue}</Text>
            <Text>{habit.craving}</Text>
            <Text>{habit.response}</Text>
            <Text>{habit.reward}</Text>
        </View>
    );
}

//index screen creat navigation
ShowScreen.navigationOptions =({navigation}) => {
    
    return {
        headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('Edit',{id:navigation.getParam('id')})}>
                <FontAwesome name="pencil-square-o" size={30}/>
        </TouchableOpacity>
        )
    };
}

const styles = StyleSheet.create({

});

export default ShowScreen;