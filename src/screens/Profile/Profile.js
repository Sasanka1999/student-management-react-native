import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { removeData } from '../../common/utils/Storage';
import { useNavigation } from '@react-navigation/native';

export default function Profile() {
    const Navigate = useNavigation();


    const handleLogout = async () => {
        try {
            await removeData();  // Clear the stored data
            console.log('Logged out successfully');
            Navigate.navigate("Login");


        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const confirmLogout = () => {
        Alert.alert(
            'Confirm Logout', // Title
            'Are you sure you want to log out?', // Message
            [
                {
                    text: 'Cancel', // Cancel button
                    style: 'cancel',
                },
                {
                    text: 'Logout', // Logout button
                    onPress: handleLogout, // Call handleLogout when confirmed (fix: no quotes)
                    style: 'destructive',
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            {/* User Icon */}
            <Icon name="user-circle" size={100} color="#4CAF50" style={styles.icon} />

            {/* User Name */}
            <Text style={styles.userName}>sas</Text>

            {/* Logout Button */}
            <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    icon: {
        marginBottom: 20,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30,
    },
    logoutButton: {
        backgroundColor: '#ff5252',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
