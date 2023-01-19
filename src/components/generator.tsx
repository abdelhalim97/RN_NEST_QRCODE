import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import React, { useState, useContext } from 'react'
import RNQRGenerator from 'rn-qr-generator';
import { ButtonGradient, Gradient, InputGradient } from '../commons';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { API_URL } from '@env';
import { TokenContext } from '../contexts/token-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
const scannerImage = require('../assets/images/scanner2.png')

const Generator = () => {
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [uri, setUri] = useState('')
    const [base64State, setBase64State] = useState<string | undefined>('')
    const { token } = useContext(TokenContext)
    const v4 = uuidv4()
    const generate = () => {
        RNQRGenerator.generate({
            value: v4,
            height: 200, width: 200, correctionLevel: 'H', base64: true
        })
            .then(response => {
                const { uri, base64 } = response;
                setUri(uri);
                setBase64State(base64)
                console.log(base64State);
                createProduct(v4, base64)
            }).catch(error => console.log('Cannot create QR code', error));
    }
    const createProduct = async (id: string, base64param: string | undefined) => {
        try {
            const res = await fetch(API_URL + '/products/create', {
                method: 'POST',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify({ name, quantity, id, base64: base64param }),
            })
            if (res.status == 201) console.log('added')
        } catch (error) {
            console.error(error);
        }
    }
    const navigation = useNavigation<StackNavigationProp<any>>()
    return (
        <Gradient fromColor='#285CA3' toColor='#516AD3'>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginHorizontal: 15 }}>
                <View style={{ backgroundColor: '#FFF', width: 40, height: 40, borderRadius: 200, }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Scanner')} style={{ borderRadius: 200 }}>
                        <Image style={{ width: 40, height: 40 }} source={scannerImage} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ alignItems: 'center', paddingHorizontal: 25, width: '100%' }}>
                <InputGradient text='Name' onChangeText={text => setName(text)} autoFocus />
                <InputGradient text='Quantity' onChangeText={text => setQuantity(Number(text))} keyboardType='number-pad' />
                <ButtonGradient text='Generate QRCode' fnc={() => generate()} />
                {uri && <Image style={{ width: 200, height: 200 }} source={{ uri }} />}
            </View>
        </Gradient>
    )
}

export default Generator

const styles = StyleSheet.create({})