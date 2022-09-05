import React, {useState} from 'react';
import { SwipeListView } from "react-native-swipe-list-view";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    ListView,
    ListViewHidden,
    HiddenButton,
    SwipedTodoText,
    TodoText,
    TodoDate,
    colors
} from '../styles/appStyles.js';
import { FontAwesome5 } from '@expo/vector-icons';

const ListItems = ({todos, setTodos, handleEdit}) => {

    const [swipedRow, setSwipedRow] = useState(null);

    //deleting tasks and updating async storage
    const delTodo = async (rowMap, rowKey) => {
        const copy = [...todos];
        const index = todos.findIndex((todo) => todo.key===rowKey);
        copy.splice(index, 1);

        await AsyncStorage.setItem("storedTodos", JSON.stringify(copy)).then(() => {
            setTodos(copy);
        }).catch(error => console.log(error))
    }

    return (
        <>  
            {/* Check if the task list array is empty */}
            {todos.length == 0 && <TodoText>You have no todos today</TodoText>}
            {todos.length != 0 && (
                
            // display tasks in list view and have swipe functionality
            <SwipeListView
                data={todos}
                renderItem={(data) => {
                    const RowText = data.item.key == swipedRow ? SwipedTodoText : TodoText;
                    return (
                        <ListView
                            underlayColor={colors.primary}
                            onPress={() => {
                                handleEdit(data.item)
                            }}
                        >
                            <>
                                <RowText>{data.item.title}</RowText>
                                <TodoDate>{data.item.date}</TodoDate>
                            </>
                        </ListView>
                    )
                }}
                renderHiddenItem = {(data, rowMap) => {
                    return(
                        <ListViewHidden>
                            <HiddenButton
                                onPress = {()=> {
                                    delTodo(rowMap, data.item.key)
                                }}
                            >
                                <FontAwesome5 name="trash" size={25} color="white"/>
                            </HiddenButton>
                        </ListViewHidden>
                    )
                }}
                leftOpenValue={75}
                disableLeftSwipe={true}
                showsVerticalScrollIndicator={false}
                style={{
                    flex:1, paddingBottom:30, marginBottom:40
                }}
                onRowOpen={(rowKey) => {
                    setSwipedRow(rowKey);
                }}
                onRowClose={(rowKey) => {
                    setSwipedRow(null);
                }}
            /> 
            )}
        </>
    );
}

export default ListItems;