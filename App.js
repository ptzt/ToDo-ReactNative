import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Alert, TextInput, Vibration } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo } from '@expo/vector-icons';

import TaskList from './components/TaskList';
import WelcomeModal from './components/WelcomeModal';
import InfoModal from './components/InfoModal';

export default function App() {

  const [modalVisible, setModalVisible] = useState(false)
  const [newTask, setNewTask] = useState('')
  const inputRef = useRef(null)
  const [temporalTask, setTemporalTask] = useState([]);
  const [dailyTask, setDailyTask] = useState([]);
  const [welcomeModal, setWelcomeModal] = useState(true)
  const [verificationComplete, setVerificationComplete] = useState(false)
  const [infoModalVisible, setInfoModalVisible] = useState(false);



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

  useEffect(() => {
    const checkShowWelcome = async () => {
      try {
        const show = await AsyncStorage.getItem("showWelcomeModal")
        setWelcomeModal(show !== "false")
        setVerificationComplete(true)
      } catch (error) {
        console.error("Error al cargar la configuracion del modal de bienvenida", error)
      }
    }
    checkShowWelcome()
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
        // Alert.alert('Se agrego!')
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

  // Handles
  const handleCloseModal = () => {
    setModalVisible(false)
    Vibration.vibrate(150)
  }

  const handleCloseModalWelcome = () => {
    setWelcomeModal(false)
    Vibration.vibrate(150)
  }

  const handleDeleteTask = (index) => {
    const newDailyTask = [...dailyTask];
    newDailyTask.splice(index, 1);
    setDailyTask(newDailyTask);
    AsyncStorage.setItem('dailyTasks', JSON.stringify(newDailyTask));
  }

  const handleOpenInfoModal = () => {
    setInfoModalVisible(true);
    Vibration.vibrate(150)
  };

  const handleCloseInfoModal = () => {
    setInfoModalVisible(false);
    Vibration.vibrate(150)
  };

  const handleAddTaskModal = () => {
    setModalVisible(true);
    setTimeout(() => {
      inputRef.current.focus();
    }, 100);
    Vibration.vibrate(150)
  }

  //End Handle

  const clearCache = async () => {
    try {
      await AsyncStorage.removeItem("showWelcomeModal")
      console.log("cache borrado exitosamente")
    } catch (error) {
      console.error("error al borrar cache", error)
    }
  }

  if (!verificationComplete) {
    return null;
  }

  return (
    <View style={styles.container}>
      <WelcomeModal
        visible={welcomeModal}
        onClose={handleCloseModalWelcome}
      />


      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.text}>Agregar nuevo pendiente</Text>
            <TextInput
              autoFocus={true}
              value={newTask}
              onChangeText={text => setNewTask(text)}
              ref={inputRef}
              style={{ marginTop: 10 }}
            />
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <TouchableOpacity style={styles.button} onPress={() => { addTask('diaria') }}><Text>Agregar</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleCloseModal}><Text>Cancelar</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <TouchableOpacity onPress={handleOpenInfoModal} style={styles.leftText}>
          <Entypo name="info-with-circle" size={27} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRigth} onPress={handleAddTaskModal}><Text>Agregar tarea</Text></TouchableOpacity>

        {/* <TouchableOpacity style={styles.buttonRigth} onPress={clearCache}><Text>Cache</Text></TouchableOpacity> */}

      </View>
      <InfoModal visible={infoModalVisible} onClose={handleCloseInfoModal} />
      <TaskList
        title={"Lista de pendientes"}
        tasks={dailyTask}
        toggleTask={toggleTask}
        deleteTask={handleDeleteTask}
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
  },
  text: {
    color: 'black',
    fontSize: 19,
    margin: 'auto',
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

});
