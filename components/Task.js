import { View, Text, StyleSheet } from "react-native"
import CheckBox from 'expo-checkbox'

const Task = ({ task, completed, onToggle }) => {
    return (
        <View style={styles.taskContainer}>
            <CheckBox value={completed} onValueChange={onToggle} />
            <Text style={[styles.text, completed && styles.completedTask]}><Text>{task}</Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'black',
        padding: 5,
        fontSize: 17,
    },
    taskContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%'
    },
    completedTask: {
        textDecorationLine: 'line-through',
        color: 'black'
    }
})

export default Task