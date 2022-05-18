import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { EditTask } from '../pages/Home';

import trashIcon from '../assets/icons/trash/trash.png';
import penIcon from '../assets/icons/trash/pen.png';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps {
  index: number;
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({ taskId, taskNewTitle }: EditTask) => void;
}

export function TaskItem({ index, task, toggleTaskDone, removeTask, editTask }: TasksListProps) {
  const [isTaskEditing, setIsTaskEditing] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);

  const textInputRef = useRef<TextInput>(null);

  const handleStartEditing = () => setIsTaskEditing(true);
  const handleCancelEditing = () => { setTaskTitle(task.title); setIsTaskEditing(false); };

  const handleSubmitEditing = () => {
    editTask({ 
      taskId: task.id, 
      taskNewTitle: taskTitle,
    });

    setIsTaskEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isTaskEditing) { 
        textInputRef.current.focus(); 
      }
      else { 
        textInputRef.current.blur(); 
      }
    }
  }, [isTaskEditing]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          //TODO - use onPress (toggle task) prop
          onPress={() => toggleTaskDone(task.id)}
        >
          <View 
            testID={`marker-${index}`}
            //TODO - use style prop 
            style={!!task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput 
            ref={textInputRef}
            value={taskTitle}
            onChangeText={setTaskTitle}
            editable={isTaskEditing}
            onSubmitEditing={handleSubmitEditing}
            //TODO - use style prop
            style={!!task.done ? styles.taskTextDone : styles.taskText}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.options}>
        {
          !!isTaskEditing ? (
            <TouchableOpacity
              testID={`x-${index}`}
              style={{ paddingHorizontal: 10, }}
              onPress={handleCancelEditing}
            >
              <Icon 
                name="x"
                size={24}
                color="#666"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              testID={`edit-${index}`}
              style={{ paddingHorizontal: 10, }}
              onPress={handleStartEditing}
            >
              <Image source={penIcon} />
            </TouchableOpacity>
          )
        }

        <View style={styles.dividerButtons} />

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ opacity: !!isTaskEditing ? 0.2 : 1, paddingHorizontal: 10, }}
          disabled={isTaskEditing}
          onPress={() => removeTask(task.id)}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  dividerButtons: { 
    width: 1, 
    height: 24, 
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
  },
  options: {
    flexDirection: 'row',
  }
})