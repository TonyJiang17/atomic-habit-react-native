import React, {useContext, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Button, TouchableOpacity} from 'react-native';
import {Context} from '../context/HabitContext';
import {Context as AuthContext} from '../context/AuthContext';
import {Feather} from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';




const IndexScreen = ({navigation}) => {
    const {state, deleteHabit, getHabit} = useContext(Context); 
    const {state: {email, token}} = useContext(AuthContext);
    //console.log(token);

    useEffect(() => {
        //first time we land, run it once 
        getHabit();
        //anytime we return to the page, run it again
        const listener = navigation.addListener('didFocus', () => {
            getHabit();
        });

        //once component is completely removed 
        return () => {
            listener.remove() 
        }
    }, [])

    return (
        <View style={styles.container}>
            <FlatList 
                data={state} 
                keyExtractor = {(habit) => habit.title}
                renderItem= {({item}) => {
                    return (
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Show',{id:item.id})}
                    >
                        <View style={styles.row}>
                            <Text style ={styles.title}>{item.title}</Text>
                            <TouchableOpacity onPress={() => deleteHabit(item.id)}>
                                <Feather style = {styles.icon} name="trash" />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

//index screen creat navigation
IndexScreen.navigationOptions =({navigation}) => {

    return {
        headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('Create')}>
                <Feather name="plus" size={30}/>
        </TouchableOpacity>
        )
        ,
        headerLeft: (
           <TouchableOpacity onPress={() => navigation.navigate('Account')}>
            <Feather name="settings" size={30}/>
           </TouchableOpacity>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderColor: 'gray'
    },
    title: {
        fontSize: 18
    },
    icon: {
        fontSize: 24
    }

});

export default IndexScreen;