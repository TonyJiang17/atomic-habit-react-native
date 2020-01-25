import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import Spacer from './Spacer';
//in order to use navigation function 
import {withNavigation} from 'react-navigation';

const NavLink = ({navigation, text, routename}) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate(routename)}>
            <Spacer>
                <Text style={styles.link}>
                    {text}
                </Text>
            </Spacer>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    link: {
        color: 'blue',
        marginLeft: 15
    }
});

export default withNavigation(NavLink);