import React, {useReducer} from 'react';
import createDataContext from './createDataContext';
import habitRails from '../api/habitRails';
import {navigate } from '../navigationRef';




const habitReducer = (state, action) => {
    switch (action.type) {
        case 'get_habit':
            return action.payload;
        case 'edit_habit':
            return state.map((habit) => {
                if (habit.id === action.payload.id){
                    return action.payload;
                } else{
                    return habit;
                }
            });
        case 'delete_habit':
            return state.filter((habit) => habit.id !== action.payload);
        default:
            return state;
    }
};

const addHabit = (dispatch) => {
    return async (title, description, cue, craving, response, reward, callback) => {
        await habitRails.post('/habits', {title, description, cue, craving, response, reward});
        if (callback){
            callback();
        }
    };
};

const editHabit = (dispatch) => {
    return async (habit_id, title, description, cue, craving, response, reward, callback) => {
        await habitRails.put(`/habits/${habit_id}`, {title, description, cue, craving, response, reward});
        dispatch({type: 'edit_habit', payload: {title, description, cue, craving, response, reward}});
        if (callback){
            callback();
        }
    }
};

const deleteHabit = (dispatch) => {
    return async (id) => {
        await habitRails.delete(`/habits/${id}`);
        dispatch({type: 'delete_habit', payload: id}); 
    };
};

const getHabit = (dispatch) => {
    return async () => {
        const response_api = await habitRails.get('/habits');
        dispatch({type: 'get_habit', payload: response_api.data});
    };
};

export const{Context, Provider} = createDataContext(habitReducer, 
    {addHabit, editHabit, deleteHabit, getHabit},
    []);

