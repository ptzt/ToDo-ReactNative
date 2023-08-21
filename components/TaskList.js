import React from "react"
import { ScrollView, TouchableOpacity, Text, View, StyleSheet, Alert, Vibration } from "react-native"
import Task from "./Task"


const TaskList = ({ title, tasks, toggleTask, deleteTask }) => {

    const confirmDeleteTask = (index) => {
        Vibration.vibrate(150)
        Alert.alert(
            'Eliminar tarea',
            '¿Estás seguro de que deseas eliminar esta tarea?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Eliminar', onPress: () => deleteTask(index) }
            ]
        );
    };

    return (
        <ScrollView style={styles.list}>
            <View style={styles.header}>
                <Text style={styles.leftText}>{title}</Text>
            </View>

            {tasks.length === 0 ? (
                <Text style={styles.textList}>No hay tareas pendientes</Text>
            ) : (
                tasks.map((item, index) => (
                    <TouchableOpacity key={index} onLongPress={() => confirmDeleteTask(index)}>
                        <Task
                            key={index.toString()}
                            task={item.text.trim()}
                            completed={item.completed}
                            onToggle={() => toggleTask(index)}
                        />
                    </TouchableOpacity>
                ))
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,

    },
    leftText: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
        margin: 'auto'
    },
    list: {
        marginLeft: 20,
        height: '100%',
        width: '100%'
    },
    textList: {
        fontSize: 20,
        color: '#393e46',
        marginTop: 20,
        opacity: 0.3,
        fontWeight: 'bold'
    },

})


export default TaskList