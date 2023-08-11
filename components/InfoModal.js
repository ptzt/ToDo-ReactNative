import React from "react";
import { Modal, Text, View, TouchableOpacity, StyleSheet, Linking } from "react-native";

const InfoModal = ({ visible, onClose }) => {
    return (
        <Modal visible={visible} transparent={true} onRequestClose={onClose}>
            <View style={styles.modalContainer}>
                <View style={styles.infoModalView}>
                    <Text style={styles.infoTitle}>Información</Text>
                    <Text style={styles.infoText}>
                        Para borrar una tarea ya finalizada o no, basta con mantenerla presionada!
                        {"\n"}
                        {"\n"}
                        Esta es una App en desarrollo asi que cualquier error que encuentres o sugerencia puedes mandarme un mensaje a mi <Text style={{ color: 'blue' }} onPress={() => Linking.openURL('https://twitter.com/ptztdev')}>Twitter.</Text>
                    </Text>
                    <TouchableOpacity onPress={onClose} style={styles.button}>
                        <Text>Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    infoModalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        width: "80%",
    },
    infoTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    infoText: {
        fontSize: 16,
        marginBottom: 20,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: "#FAF9F6",
    },
});

export default InfoModal;
