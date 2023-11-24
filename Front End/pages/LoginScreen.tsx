import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';


const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const handleLogin = () => {
        // Esto es para autenticar con el backend si la cuenta está creada.
        // Por el momento se deja así hasta que se conecte con el backend.
        alert('Login successful!');
        navigation.navigate('Home');
    };

    const navigateToSignUp = () => {
        // Navegar a la pantalla SignUpScreen si no tiene una cuenta creada. 
        navigation.navigate('SignUp');
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
            />
            <Button title="Login" onPress={handleLogin} />
            <TouchableOpacity onPress={navigateToSignUp} style={styles.registerButton}>
                <Text style={styles.registerButtonText}>No account? Sign up</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        width: '100%',
        height: 40,
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginBottom: 10,
    },
    registerButton: {
        marginTop: 15,
    },
    registerButtonText: {
        color: '#0645AD', // Para identificar que es un enlace
    },
    
});

export default LoginScreen;
