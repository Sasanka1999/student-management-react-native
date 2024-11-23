import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getData, removeData } from '../../common/utils/Storage'; 
import Icon from 'react-native-vector-icons/FontAwesome'; 

export default function Profile() {
    const [email, setEmail] = useState(null); 
    const Navigate = useNavigation();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getData(); 
                if (userData) {
                    setEmail(userData.email); 
                }
            } catch (error) {
                console.error("Error fetching user data", error);
            }
        };

        fetchUserData(); 
    }, []);

    const handleLogout = async () => {
        try {
            await removeData();  
            console.log('Logged out successfully');
            Navigate.navigate("Login");  
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const confirmLogout = () => {
        Alert.alert(
            'Confirm Logout',
            'Are you sure you want to log out?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Logout', onPress: handleLogout, style: 'destructive' },
            ]
        );
    };

    return (
        <View style={styles.container}>

            <View style={styles.profileIconContainer}>
                <Icon name="user-circle" size={100} color="#2f4f4f" style={styles.profileIcon} />
            </View>

            <Text style={styles.email}> {email ? email : 'Loading...'}</Text> 

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
        backgroundColor: '#2e8b57', 
        padding: 20,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    profileIconContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    profileIcon: {
        borderWidth: 2,
        borderColor: '#2f4f4f', 
        borderRadius: 100, 
        padding: 10,
    },
    email: {
        fontSize: 20,
        marginBottom: 40,
        fontWeight: '600', 
        color: '#2f4f4f',
    },
    logoutButton: {
        backgroundColor: '#ff6347', 
        paddingVertical: 12,  
        paddingHorizontal: 30, 
        borderRadius: 20, 
        marginTop: 20,
        elevation: 5, 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.2,
        shadowRadius: 4, 
    },
    logoutText: {
        color: '#2f4f4f', 
        fontSize: 18,
        fontWeight: '800', 
        textAlign: 'center', 
    },
});
