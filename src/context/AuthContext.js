import createDataContext from './createDataContext';
import habitRails from '../api/habitRails';
import { AsyncStorage } from 'react-native';
import {navigate } from '../navigationRef';


const authReducer = (state,action) => {
    switch (action.type){
        case 'add_error':
            return {...state, errorMessage: action.payload};
        case 'signin':
            return {email: action.payload.email, token: action.payload.authentication_token, errorMessage: ''};
        case 'clear_error_message':
            return {...state, errorMessage: ''};
        case 'signout':
            return {email: null, token: null, errorMessage: ''}
        default:
            return state;
    }
};

const signup = dispatch => async ({email, password}) => {
    try {
        const response = await habitRails.post('/signup', {"user": {email, password}});
        //console.log(response.data);
        dispatch({type: 'signin', payload: response.data});
        await AsyncStorage.setItem('token', response.data.authentication_token);
        await AsyncStorage.setItem('email', response.data.email);
        navigate('Index');
    }catch (e){
        dispatch({type: 'add_error', payload: 'Something went wrong with sign up'});
    }
};

const signin = dispatch => async ({email, password}) => {
    try {
        const response = await habitRails.post('/sessions', {"user": {email, password}});
        const token = response.data.token;
        // console.log(response.data);
        dispatch({type: 'signin', payload: response.data});
        await AsyncStorage.setItem('token', response.data.authentication_token);
        await AsyncStorage.setItem('email', response.data.email);
        navigate('Index');
    }catch(e){
        dispatch({type: 'add_error', payload: 'Something went wrong with sign in'});
    }
};

const signout = dispatch => async () => {
    try {
        //await habitRails.delete(`/sessions/${id}`);
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('email');
        dispatch({type: 'signout'});
        navigate('Signin');
    }catch(e){
        dispatch({type: 'add_error', payload: 'Something went wrong with sign out'});
    }
};

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    const email = await AsyncStorage.getItem('email');
    if (token && email){
        dispatch({type: 'signin', payload: {email,token}});
        navigate('Index');
    }else{
        navigate('loginFlow');
    }
};

const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'clear_error_message'});
};


export const {Provider, Context} = createDataContext(
    authReducer,
    {signin, signout, signup, clearErrorMessage, tryLocalSignin},
    {email: null, token: null, errorMessage: ''}
);