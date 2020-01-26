import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import {Provider} from './src/context/HabitContext';
import IndexScreen from './src/screens/IndexScreen.js';
import ShowScreen from './src/screens/ShowScreen';
import CreateScreen from './src/screens/CreateScreen';
import EditScreen from './src/screens/EditScreen';
import AccountScreen from './src/screens/AccountScreen';
import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import {Provider as AuthProvider} from './src/context/AuthContext'; 
import {setNavigator} from './src/navigationRef';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import PhotoScreen from './src/screens/PhotoScreen';

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signin: SigninScreen,
    Signup: SignupScreen
  }),
  mainFlow: createStackNavigator({
    Index: IndexScreen,
    Show: ShowScreen,
    Create: CreateScreen,
    Edit: EditScreen,
    Account: AccountScreen,
    Photo: PhotoScreen
  },{
    defaultNavigationOptions: {
      title: 'Habits'
    }
  })
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <Provider>
        <App ref = {(navigator) => {setNavigator(navigator)}}/>
      </Provider>
    </AuthProvider>
  );
};