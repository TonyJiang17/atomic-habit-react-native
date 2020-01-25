import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button, TouchableOpacity} from 'react-native';
import {Context} from '../context/HabitContext';
import HabitForm from '../components/HabitForm';


const EditScreen = ({navigation}) => {
    const {state, editHabit} = useContext(Context);
    const habit = state.find((habit) => habit.id === navigation.getParam('id'));

    return (
        <HabitForm 
            onSubmit={(title, description, cue, craving, response, reward) => {
                editHabit(habit.id, title, description, cue, craving, response, reward,
                    () => {navigation.pop(); //just make the app go back to the previous screen
                });
            }}
            initialValues = {{title: habit.title, 
                            description: habit.description,
                            cue: habit.cue,
                            craving: habit.craving,
                            response: habit.response,
                            reward: habit.reward   }}
        />
    );
}

export default EditScreen;