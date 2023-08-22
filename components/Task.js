import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native"
import CheckBox from 'expo-checkbox'
import { Vibration } from "react-native"

const Task = ({ task, completed, onToggle, onDeleteTask }) => {
    return (
        <View style={styles.taskContainer}>
            <View style={styles.taskInfo}>
                <CheckBox value={completed} onValueChange={newValue => { Vibration.vibrate(100), onToggle(newValue) }} />
                <TouchableOpacity onLongPress={() => Alert.alert('Modal ')}>

                    <Text style={[styles.text, completed && styles.completedTask]}><Text>{task}</Text></Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={onDeleteTask}>
                <Text style={styles.deleteText}>X</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#222831',
        padding: 5,
        fontSize: 18,
        fontWeight: "500"
    },
    taskContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        marginBottom: 10,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.3,
    },
    completedTask: {
        textDecorationLine: 'line-through',
        color: '#222831'
    },
    deleteButton: {
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    deleteText: {
        color: '#222831',
        fontWeight: 'bold',
        fontSize: 16,
    },
    taskInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})

export default Task