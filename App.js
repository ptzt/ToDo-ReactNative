import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Alert, TextInput, FlatList } from 'react-native';
import { useState, useRef } from 'react';

import Task from './components/Task';


export default function App() {

  const [modalVisible, setModalVisible] = useState(false)
  const [tasks, setTasks] = useState([{ text: 'Hacer la compra', completed: false }, { text: 'Pasear al perro', completed: false }])
  // const [tasks, setTasks] = useState('')
  const [newTask, setNewTask] = useState('')
  const inputRef = useRef(null)


  const addTask = () => {
    if (newTask !== '') {
      const newTaskObj = { text: newTask, completed: false }
      setTasks([...tasks, newTaskObj])
      setNewTask('')
      setModalVisible(false)
      Alert.alert('Se agrego!')

    } else {
      Alert.alert('La tarea no puede estar vacia!')
    }
  }

  const toggleTask = (index) => {
    const newTask = tasks.map((task, i) => {
      if (i === index) {
        return {
          ...task,
          completed: !task.completed
        }
      }
      return task
    })
    setTasks(newTask)
  }



  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType='slide'
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TextInput
              placeholder='Agregar nueva tarea'
              value={newTask}
              onChangeText={text => setNewTask(text)}
              ref={inputRef}
            />
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={styles.button} onPress={addTask}><Text>Agregar</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}><Text>Cancelar</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.header}>
        <Text style={styles.leftText}>ToDo</Text>
        <TouchableOpacity style={styles.buttonRigth} onPress={() => {
          setModalVisible(true);
          setTimeout(() => {
            inputRef.current.focus(); // Enfocar el TextInput
          }, 100); // Ajusta el tiempo si es necesario
        }}><Text>Agregar tarea</Text></TouchableOpacity>
      </View>
      <FlatList
        style={styles.list}
        ListHeaderComponent={<Text style={styles.text}>Tareas pendientes</Text>}
        ListEmptyComponent={<Text style={styles.textList}>No hay tareas pendientes</Text>}
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (<Task task={item.text.trim()} completed={item.completed} onToggle={() => toggleTask(index)} />)}
      />
      <StatusBar style='light' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 10,

  },
  leftText: {
    color: 'white',
    fontSize: 20,
    margin: 'auto',
    marginLeft: 20
  },
  buttonRigth: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: 'white',
    alignSelf: 'flex-end',
    marginRight: 20
  },
  text: {
    fontSize: 20,
    color: 'white',
    marginTop: 10,
  },
  list: { marginLeft: 20 },
  textList: {
    fontSize: 20,
    color: 'white',
    marginTop: 20,
    opacity: 0.3,
    fontWeight: 'bold'
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    width: '80%'
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: 'white',
    margin: 6
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  }
});
