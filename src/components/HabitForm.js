import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

const HabitForm = ({onSubmit, initialValues}) => {

    const [title, setTitle] = useState(initialValues.title);
    const [description, setDescription] = useState(initialValues.description);
    const [cue, setCue] = useState(initialValues.cue);
    const [craving, setCraving] = useState(initialValues.craving);
    const [response, setResponse] = useState(initialValues.response);
    const [reward, setReward] = useState(initialValues.reward);
    const [image, setImage] = useState(null);

    useEffect(() => {
        getPermissionAsync();
    },[]);

    const getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    const _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result);
          console.log(result);
        }
      };

    const createFormData = () => {
        let formdata = new FormData();
        formdata.append("habit-title", title);
        formdata.append("habit-description", description);
        formdata.append("habit-cue", cue);
        formdata.append("habit-craving", craving);
        formdata.append("habit-response", response);
        formdata.append("habit-reward", reward);
        formdata.append("habit-image", {uri: image.uri, name: 'image.jpg', type: 'image/jpeg'});

        return formdata;
    };

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
              title="Pick an image from camera roll"
              onPress={_pickImage}
            />
            {image &&
              <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}

            <Button 
                title="Save Habit"
                // onPress = {() => {onSubmit(title, description, cue, craving, response, reward)}}
                onPress = {() => {onSubmit(createFormData())}}
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