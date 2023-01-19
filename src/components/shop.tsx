import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { useRoute } from '@react-navigation/native';
import { API_URL } from '@env';
import { ButtonGradient, Gradient, InputGradient } from '../commons';
import { TokenContext } from '../contexts/token-context';

const Shop = () => {
    const route = useRoute();
    const id = route?.params?.URL
    const [product, setProduct] = useState({ name: '', base64: '', id: '', quantity: '' })
    const [quantity, setQuantity] = useState(1)
    const { token, setToken } = useContext(TokenContext)
    const productGet = async () => {
        try {
            const res = await fetch(API_URL + '/products/' + id, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                },
            })
            const json = await res.json();
            setProduct(json)
            if (res.status == 201) {
            }
        } catch (error) {
            console.error(error);
        }
    }
    const buyProduct = async () => {
        try {
            const res = await fetch(API_URL + '/products/' + id + '/buy', {
                method: 'POST',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify({ quantity }),
            })
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        productGet()
    }, [buyProduct])
    return (
        <Gradient fromColor='#285CA3' toColor='#516AD3'>
            <View style={{ alignItems: 'center', paddingHorizontal: 25, width: '100%' }}>
                <Text style={styles.text}>{product?.name}</Text>
                <Text style={styles.text}>{product?.quantity}</Text>
                <InputGradient text='Quantity' onChangeText={text => setQuantity(Number(text))} keyboardType='number-pad' />
                <ButtonGradient text='Buy product' fnc={() => buyProduct()} />
            </View>
        </Gradient>
    )
}

export default Shop

const styles = StyleSheet.create({
    text: {
        fontSize: 23, backgroundColor: '#FFF', color: "#000", borderRadius: 25, width: '50%', textAlign: 'center',
        marginTop: 20
    }
})