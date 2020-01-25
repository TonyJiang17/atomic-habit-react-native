import axios from 'axios';
import {AsyncStorage} from 'react-native';


const instance = axios.create({
    baseURL: 'http://ea0edc85.ngrok.io/api/v1'
});

//automatic authentication
instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        const email = await AsyncStorage.getItem('email');
        if (token && email){
            config.headers = {
                "Content-Type": "application/json",
                "X-User-Email": `${email}`,
                "X-User-Token": `${token}`
            }
        }
        return config;
    },
    //error case 
    (err) => {
        return Promise.reject(err);
    }
);

export default instance;