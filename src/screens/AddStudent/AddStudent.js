import { View, TextInput, StyleSheet, Text, KeyboardAvoidingView, Button, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import instance from "../../service/axiosOrder";
import { Card } from "react-native-paper";

export default function AddStudent() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");


    const saveStudent = async () => {
        if (name !== '' && age !== '' && address !== '' && contact !== '') {
            try {
                await instance.post('/student/save', {
                    student_name: name,
                    student_age: age,
                    student_address: address,
                    student_contact: contact,
                });

                setName('');
                setAge('');
                setAddress('');
                setContact('');

            } catch (error) {
                console.error('Error saving student:', error);
            }
        } else {
            Alert.alert("Kindly ensure all fields are completed.");
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <Card style={styles.card}>
                    <Text style={styles.header}>Add New Student</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Student Name"
                        value={name}
                        onChangeText={(val) => setName(val)}
                        
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Student Age"
                        value={age}
                        onChangeText={(val) => setAge(val)}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Student Address"
                        value={address}
                        onChangeText={(val) => setAddress(val)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Student Contact"
                        value={contact}
                        onChangeText={(val) => setContact(val)}
                        keyboardType="phone-pad"
                    />

                        <TouchableOpacity style={styles.customButton} onPress={saveStudent}>
                            <Text style={styles.buttonText}>Save Student</Text>
                        </TouchableOpacity>
                    </Card>
                    
                    
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#2e8b57'
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: 'center',
    },
    header: {
        fontSize: 30,
        marginBottom: 48,
        color: 'white',
        textAlign: 'center',
        fontWeight: '900'
    },
    input: {
        height: 40,
        borderColor: 'white',
        borderBottomWidth: 1,
        marginBottom: 36,
        borderWidth: 1,
        borderRadius: 10,
        color: 'white',
    },
    customButton: {
        backgroundColor: '#006400', 
        borderColor: 'white',
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white', 
        fontSize: 16,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor:'#228b22',
        padding: 20,
    }
});
