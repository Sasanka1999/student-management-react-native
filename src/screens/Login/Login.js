import { View, TextInput, StyleSheet, Text, KeyboardAvoidingView, Button, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import instance from "../../service/axiosOrder";
import { saveData } from "../../common/utils/Storage";


export default function Login() {

    const Navigate = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const loginAction = async () => {
        try {
          const response = await instance.post("/login", {
            email: email,
            password: password,
          });

          const userData = {
            token: response.data.token,
            email: email,
          };
    
          await saveData(userData)
    
          Navigate.navigate("BottomNav");
        } catch (error) {
        }
      };


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <Text style={styles.header}>Login</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(val)=>setEmail(val)}
                        placeholder="User Email"
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(val)=>setPassword(val)}
                        placeholder="Password"
                        keyboardType="password"
                    />
                    <View style={styles.btnContainer}>
                        <Button title="Login" onPress={() => {loginAction()}} />
                    </View>
                    <View style={styles.btnContainer}>
                        <Button title="Register" onPress={() => Navigate.navigate('Register')} />
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
        color:'red',
        textAlign: 'center',
        fontWeight: '900'
    },
    input: {
        height: 40,
        borderColor: '#000000',
        borderBottomWidth: 1,
        marginBottom: 36,
        borderWidth: 1,
        borderRadius:10,
        color: 'black',
    },
    btnContainer: {
        backgroundColor: 'white',
        marginTop: 12,
    },
});