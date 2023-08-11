import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Alert, TextInput, FlatList, ScrollView, Vibration } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Task from './components/Task';
import TaskList from './components/TaskList';

export default function App() {

  const [modalVisible, setModalVisible] = useState(false)
  const [newTask, setNewTask] = useState('')
  const inputRef = useRef(null)
  const [temporalTask, setTemporalTask] = useState([]);
  const [dailyTask, setDailyTask] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const temporalTasks = await AsyncStorage.getItem('temporalTasks')
        const dailyTasks = await AsyncStorage.getItem('dailyTasks')

        if (temporalTasks) {
          setTemporalTask(JSON.parse(temporalTasks))
        }

        if (dailyTasks) {
          setDailyTask(JSON.parse(dailyTasks))
        }

      } catch (error) {
        console.error('Error al cargar las tareas:', error)
      }
    }
    fetchTasks()
  }, [])



  const addTask = async (type) => {
    if (newTask !== '') {
      const newTaskObj = { text: newTask, completed: false, type: type }

      try {
        if (type === 'temporal') {
          setTemporalTask([...temporalTask, newTaskObj])
          await AsyncStorage.setItem('temporalTasks', JSON.stringify([...temporalTask, newTaskObj]))
        } else if (type === 'diaria') {
          setDailyTask([...dailyTask, newTaskObj])
          await AsyncStorage.setItem('dailyTasks', JSON.stringify([...temporalTask, newTaskObj]))
        }
        setNewTask('')
        setModalVisible(false)
        Alert.alert('Se agrego!')
      } catch (error) {
        console.error('Error al agregar la tarea:', error)
      }
    } else {
      Alert.alert('La tarea no puede estar vacia!')

    }
    Vibration.vibrate(150)
  }

  const toggleTask = async (index, type) => {
    if (type === 'temporal') {
      const newTempTask = temporalTask.filter((_, i) => i !== index)
      setTemporalTask(newTempTask)

      try {
        await AsyncStorage.setItem('temporalTasks', JSON.stringify(newTempTask))
      } catch (error) {
        console.error('Error al actualizar las tareas temporales:', error)
      }

    } else if (type === 'diaria') {
      const newDailyTask = dailyTask.map((task, i) => {
        if (i === index) {
          return {
            ...task,
            completed: !task.completed
          }
        }
        return task
      })
      setDailyTask(newDailyTask)

      try {
        await AsyncStorage.setItem('dailyTasks', JSON.stringify(newDailyTask))
      } catch (error) {
        console.error('Error al actualizar las tareas diarias:', error)
      }
    }
  }

  handleCloseModal = () => {
    setModalVisible(false)
    Vibration.vibrate(150)
  }

  const ResetDailyTask = async () => {
    try {
      const newDailyTask = dailyTask.map((task) => ({
        ...task,
        completed: false
      }))

      await AsyncStorage.setItem('dailyTasks', JSON.stringify(newDailyTask))
      setDailyTask(newDailyTask)

      Alert.alert('Tareas diarias reinicidas exitosamente')
    } catch (error) {
      console.error('Error al reiniciar las tareas diarias', error)
    }
  }


  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TextInput
              placeholder='Agregar nueva tarea'
              value={newTask}
              onChangeText={text => setNewTask(text)}
              ref={inputRef}
            />
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <TouchableOpacity style={styles.button} onPress={() => { addTask('temporal') }}><Text>Tarea temporal</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => { addTask('diaria') }}><Text>Tarea diaria</Text></TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleCloseModal}><Text>Cancelar</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.header}>
        <Text style={styles.leftText}>To-Do</Text>
        <TouchableOpacity style={styles.buttonRigth} onPress={() => {
          setModalVisible(true);
          setTimeout(() => {
            inputRef.current.focus(); // Enfocar el TextInput
          }, 100); // Ajusta el tiempo si es necesario
        }}><Text>Agregar tarea</Text></TouchableOpacity>
      </View>
      {/* <Text style={styles.leftText}>Tareas temporales</Text>
      <ScrollView style={styles.list}>
        {temporalTask.length === 0 ? (
          <Text style={styles.textList}>No hay tareas pendientes</Text>
        ) : (
          temporalTask.map((item, index) => (
            <Task
              key={index.toString()}
              task={item.text.trim()}
              completed={item.completed}
              onToggle={() => toggleTask(index, 'temporal')}
            />
          ))
        )}
      </ScrollView> */}

      {/* <View style={styles.header}>
        <Text style={styles.leftText}>Tareas diarias</Text>
        <TouchableOpacity style={styles.buttonRigth} onPress={ResetDailyTask}><Text>Reiniciar diarias</Text></TouchableOpacity>


      </View>

      <ScrollView style={styles.list}
        keyboardShouldPersistTaps="handled"
      >
        {dailyTask.length === 0 ? (
          <Text style={styles.textList}>No hay tareas diarias</Text>
        ) : (
          dailyTask.map((item, index) => (
            <TouchableOpacity>
              <Task
                key={index.toString()}
                task={item.text.trim()}
                completed={item.completed}
                onToggle={() => toggleTask(index, 'diaria')}
              />
            </TouchableOpacity>

          ))
        )}
      </ScrollView> */}

      <TaskList
        title={"Tareas pendientes"}
        tasks={dailyTask}
        toggleTask={toggleTask}
        resetTask={ResetDailyTask}
        type="diaria"
      />
      <StatusBar style='dark' />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
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
    color: 'black',
    fontSize: 21,
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
  list: { marginLeft: 20, height: '100%', width: '100%' },
  textList: {
    fontSize: 20,
    color: 'black',
    marginTop: 20,
    opacity: 0.3,
    fontWeight: 'bold'
  },
  modalView: {
    backgroundColor: '#FAF9F6',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    width: '80%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#FAF9F6',
    margin: 6,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  checkbox: {
    flexDirection: 'row',
    marginRight: 4,
    marginLeft: 4,
    padding: 8
  }
});
