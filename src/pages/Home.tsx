import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export interface EditTask {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskAlreadyExists = tasks.find(t => t.title === newTaskTitle);

    if (taskAlreadyExists) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome');
      return;
    }

    //TODO - add new task
    const data: Task = {
      id: Number(new Date().getTime()),
      title: newTaskTitle,
      done: false,
    };

    setTasks(oldTasks => [...oldTasks, data]);

    return;
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const oldTasks = tasks.map(t => ({ ...t }));
    let task = oldTasks.find(t => t.id === id);
    if (task) task.done = !task?.done;

    setTasks([...oldTasks]);
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    const updatedTasks = tasks.filter(t => t.id !== id);

    Alert.alert(
      'Remover Item', 
      'Tem certeza que deseja remover esse item?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => setTasks([...updatedTasks]),
          style: 'default'
        }
      ]
      );
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTask) {
    const oldTasks = tasks.map(t => ({ ...t }));
    let task = oldTasks.find(t => t.id === taskId);
    if (task) task.title = taskNewTitle;

    setTasks([...oldTasks]);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})