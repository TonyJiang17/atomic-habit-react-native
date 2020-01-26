import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import {Context} from '../context/HabitContext';
import HabitForm from '../components/HabitForm';


const CreateScreen = ({navigation}) => {
  
    const {addHabit} = useContext(Context);
    return (
        //using BlogPostForm to render our form 
        // <HabitForm onSubmit = {(title, description, cue, craving, response, reward) => {
        //     addHabit(title, description, cue, craving, response, reward, () => navigation.navigate('Index'));
        // }}/>

        <HabitForm onSubmit = {(formdata) => {
            addHabit(formdata, () => navigation.navigate('Index'));
        }}/>

    );
}

export default CreateScreen;