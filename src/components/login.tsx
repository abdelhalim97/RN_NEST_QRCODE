import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { InputGradient, Gradient, ButtonGradient } from '../commons'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack';
import { API_URL } from "@env"
import { TokenContext } from '../contexts/token-context';

const image = require('../assets/images/laptop.jpg')

const Login = () => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const { token, setToken, setRole } = useContext(TokenContext)
    const loginPost = async () => {
        try {
            const res = await fetch(API_URL + '/users/signin', {
                method: 'POST',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password: pass }),
            })
            const json = await res.json();
            if (res.status == 201) {
                setToken(json.token)
                setRole(json.role)
                navigation.navigate('Generator')
            }
        } catch (error) {
            console.error(error);
        }
    }
    const navigation = useNavigation<StackNavigationProp<any>>()
    return (
        <Gradient fromColor='#285CA3' toColor='#516AD3'>
            <Image source={image} style={styles.halfCircle} />
            <View style={{ alignItems: 'center', paddingHorizontal: 25, width: '100%' }}>
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.paragraph}>Login to your account</Text>
                <InputGradient text='Email' onChangeText={text => setEmail(text)} keyboardType='email-address' autoFocus />
                <InputGradient text='Password' onChangeText={text => setPass(text)} secureTextEntry />
                <ButtonGradient text='Login' fnc={() => loginPost()} />
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Text style={styles.paragraph}>Don't have an account?{' '}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                        <Text style={{ fontSize: 20, color: '#fff' }}>signup</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Gradient>
    )
}

export default Login
const styles = StyleSheet.create({
    title: { fontSize: 40, color: '#fff', textAlign: 'center' },
    paragraph: { fontSize: 20, color: '#fff', textAlign: 'center' },
    halfCircle: {
        borderBottomLeftRadius: 1000, height: "33%", borderBottomRightRadius: 1000, width: '100%'
    },
    imageContainer: {
        alignItems: 'center',
        backgroundColor: 'yellow'
    },
});