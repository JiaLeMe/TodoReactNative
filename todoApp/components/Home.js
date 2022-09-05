import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from './Header';
import ListItems from './ListItems';
import InputModal from './InputModal';

const Home = ({todos, setTodos}) => {

    
    //Clear all tasks and update async storage
    const clearTasks = async () => {
        await AsyncStorage.setItem("storedTodos", JSON.stringify([])).then(() => {
            setTodos([]);
        }).catch(error => console.log(error))
    }

    const [modalVisible, setModalVisible] = useState(false);
    const [todoInputValue, setTodoInputValue] = useState();

    //Add tasks and update async storage
    const handleAddTodo = async (todo) => {
        const newTodos = [...todos, todo];
        await AsyncStorage.setItem("storedTodos", JSON.stringify(newTodos)).then(() => {
            setTodos(newTodos);
            setModalVisible(false);
        }).catch(error => console.log(error))
    }

    const [todoEdit, setTodoEdit] = useState(null);

    //Edit tasks
    const handleEdit = (item) => {
        setTodoEdit(item);
        setModalVisible(true);
        setTodoInputValue(item.title);
    }

    const handleEditTodo = async (editedTodo) => {
        const newTodo = [...todos];
        const todoIndex=todos.findIndex((todo) => todo.key === editedTodo.key);
        newTodo.splice(todoIndex, 1, editedTodo);
        
        //update aysnc storage on the new changes
        await AsyncStorage.setItem("storedTodos", JSON.stringify(newTodo)).then(() => {
            setTodos(newTodo);
            setTodoEdit(null);
            setModalVisible(false);
        }).catch(error => console.log(error))
    }

    return (
        <>
            <Header clearTasks={clearTasks}/>
            <ListItems
                todos = {todos}
                setTodos = {setTodos}
                handleEdit = {handleEdit}
            />
            <InputModal 
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                todoInputValue={todoInputValue}
                setTodoInputValue={setTodoInputValue}
                handleAddTodo={handleAddTodo}
                todoEdit={todoEdit}
                setTodoEdit={setTodoEdit}
                handleEditTodo={handleEditTodo}
                todos={todos}
            />
        </>
    );
}

export default Home;