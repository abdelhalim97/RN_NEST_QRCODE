import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState, useContext } from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { ButtonGradient } from '../commons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { TokenContext } from '../contexts/token-context';
const plusImage = require('../assets/images/plus.png')
const Scanner = () => {
    const [URL, setURL] = useState('')
    const navigation = useNavigation<StackNavigationProp<any>>()
    const onSuccess = (e: any) => {
        setURL(e.data)
    };
    const passToBuy = () => {
        navigation.navigate('Shop', { URL })
    }
    const passToAdd = () => {
        navigation.navigate('Add', { URL })
    }
    const { role } = useContext(TokenContext)
    return (
        <QRCodeScanner
            onRead={onSuccess}
            flashMode={RNCamera.Constants.FlashMode.auto}
            showMarker reactivate
            topViewStyle={{ zIndex: 999 }}
            topContent={
                URL !== '' ?
                    role === 'admin' && <ButtonGradient text='Add Quantity' fnc={() => passToAdd()} />
                    : <></>}
            bottomContent={
                URL !== '' ? <>
                    <ButtonGradient text='Buy Product' fnc={() => passToBuy()} />
                </> : <></>
            }
        />
    )
}
// {"bounds": {"height": 960, "origin": [[Object], [Object], [Object], [Object]], "width": 1280}, "data": "https://www.youtube.com/watch?v=Uw626lSuwW4&ab_channel=ReticentShadow", "rawData": "44568747470733a2f2f7777772e796f75747562652e636f6d2f77617463683f763d55773632366c53757757342661625f6368616e6e656c3d5265746963656e74536861646f770ec11ec11ec11ec11ec", "target": 189, "type": "QR_CODE"}    
export default Scanner

const styles = StyleSheet.create({})