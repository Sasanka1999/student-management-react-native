import { View, TextInput, StyleSheet, Text, KeyboardAvoidingView, Button, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function Register() {

    const Navigate = useNavigation();
    const [text, onChangeNumber] = useState('');

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <Text style={styles.header}>Register</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeNumber}
                        value={text}
                        placeholder="Full Name"
                        keyboardType="text"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeNumber}
                        value={text}
                        placeholder="User Name"
                        keyboardType="text"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeNumber}
                        value={text}
                        placeholder="Password"
                        keyboardType="text"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeNumber}
                        value={text}
                        placeholder="Conferm Password"
                        keyboardType="text"
                    />
                    <View style={styles.btnContainer}>
                        <Button style={styles.btn} title="Register" onPress={() => null} />
                    </View>
                    <View style={styles.btnContainer}>
                        <Button style={styles.btn} title="Login" onPress={() => Navigate.navigate('Login')} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: 'center',
    },
    header: {
        fontSize: 30,
        marginBottom: 48,
        color: 'red',
        textAlign: 'center',
        fontWeight: '900'
    },
    input: {
        height: 40,
        borderColor: '#000000',
        borderBottomWidth: 1,
        marginBottom: 36,
        borderWidth: 1,
        borderRadius: 10,
    },
    btnContainer: {
        backgroundColor: 'white',
        marginTop: 12,
    },
    btn: {
        borderRadius: 10,
    }
});