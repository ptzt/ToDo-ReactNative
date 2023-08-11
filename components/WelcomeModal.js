import React from "react"
import { Modal, Text, View, TouchableOpacity, StyleSheet } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"


const WelcomeModal = ({ visible, onClose }) => {

    const handleCloseModal = () => {
        onClose()
        AsyncStorage.setItem("showWelcomeModal", "false")
    }

    if (!visible) {
        return null;
    }


    return (
        <Modal visible={visible} transparent={true} onRequestClose={handleCloseModal}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <Text style={styles.title}>Bienvenido a la aplicacion!</Text>
                    <Text style={styles.description}>Muchas gracias por usar esta App, como es bien sabido sigue en desarrollo asi que si encuentras algun bug o quieres hacer una sugerencia no dudes en contactarte conmigo!</Text>
                    <TouchableOpacity onPress={handleCloseModal} style={styles.button}>
                        <Text>Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal >
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    title: {
        fontSize: 23,
        fontWeight: "bold"
    },
    description: {
        fontSize: 17,
        margin: 20
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        width: '80%'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 5,
        backgroundColor: 'white',
        marginTop: 20
    }
})

export default WelcomeModal