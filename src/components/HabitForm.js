import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button } from 'react-native';

const HabitForm = ({onSubmit, initialValues}) => {

    const [title, setTitle] = useState(initialValues.title);
    const [description, setDescription] = useState(initialValues.description);
    const [cue, setCue] = useState(initialValues.cue);
    const [craving, setCraving] = useState(initialValues.craving);
    const [response, setResponse] = useState(initialValues.response);
    const [reward, setReward] = useState(initialValues.reward);

    return (
        <View>
            <Text style = {styles.label} >Enter Title:</Text>
            <TextInput style = {styles.input} value ={title} onChangeText={(text) => setTitle(text)}/>
            <Text style = {styles.label} >Enter Description:</Text>
            <TextInput style = {styles.input} value ={description} onChangeText={(text) => setDescription(text)}/>
            <Text style = {styles.label} >Enter Cue:</Text>
            <TextInput style = {styles.input} value ={cue} onChangeText={(text) => setCue(text)}/>
            <Text style = {styles.label} >Enter Craving:</Text>
            <TextInput style = {styles.input} value ={craving} onChangeText={(text) => setCraving(text)}/>
            <Text style = {styles.label} >Enter Response:</Text>
            <TextInput style = {styles.input} value ={response} onChangeText={(text) => setResponse(text)}/>
            <Text style = {styles.label} >Enter Reward:</Text>
            <TextInput style = {styles.input} value ={reward} onChangeText={(text) => setReward(text)}/>
            <Button 
                title="Save Habit"
                onPress = {() => {onSubmit(title, description, cue, craving, response, reward)}}
                    //navigation.navigate('Index'); //one way of going back to the index page (bad cuz its too automatic, not waiting for the post to create)
            />
        </View>
    );
};

//default props
HabitForm.defaultProps ={
    initialValues: {
        title: '',
        description: '',
        cue: '',
        craving: '',
        response: '',
        reward: ''
    }
};

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        borderWidth:1,
        borderColor: 'black',
        marginBottom:15,
        padding:5,
        margin:5
    },
    label: {
        fontSize: 20,
        marginBottom: 5
    }
})

export default HabitForm;