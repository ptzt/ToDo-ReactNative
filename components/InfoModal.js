import React from "react";
import { Modal, Text, View, TouchableOpacity, StyleSheet } from "react-native";

const InfoModal = ({ visible, onClose }) => {
    return (
        <Modal visible={visible} transparent={true} onRequestClose={onClose}>
            <View style={styles.modalContainer}>
                <View style={styles.infoModalView}>
                    <Text style={styles.infoTitle}>Información</Text>
                    <Text style={styles.infoText}>
                        Aquí puedes agregar y administrar tus tareas pendientes.
                        {/* Agrega más información si es necesario */}
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
