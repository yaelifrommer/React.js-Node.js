import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoFormComponent from './TodoFormComponent';
import { List, ListItem, ListItemText, Checkbox, IconButton, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// For presenting ToDos list and managing them.
function TodosComponent() {
    const [todos, setTodos] = useState([]);
    const [editingTodo, setEditingTodo] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchTodos();
    }, []);
    // Get todos.
    const fetchTodos = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/todos');
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };
    // Deleting a Todo.
    const handleDelete = async (todoId) => {
        try {
            await axios.delete(`http://localhost:4000/api/todos/${todoId}`);
            fetchTodos();
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };
    // Change ToDos status - complited/not complited.
    const handleCompletionChange = async (todoId, isCompleted) => {
        try {
            await axios.put(`http://localhost:4000/api/todos/${todoId}`, { isCompleted });
            fetchTodos();
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };
    // Add or update a new or existing ToDo.
    const handleAddOrUpdateTodo = (todo) => {
        const updatedTodos = todos.map(t => (t._id === todo._id ? todo : t));
        if (!updatedTodos.includes(todo)) {
            updatedTodos.push(todo);
        }
        setTodos(updatedTodos);
    };
    // Open and close dialog.
    const handleOpen = () => {
        setEditingTodo(null);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Paper style={{ margin: 16, padding: 16, backgroundColor: '#e3f2fd' }}>
            <IconButton onClick={handleOpen} color="primary">
                <AddCircleOutlineIcon /> Add New Todo
            </IconButton>
            <TodoFormComponent
                todo={editingTodo}
                open={open}
                handleClose={handleClose}
                addOrUpdateTodo={handleAddOrUpdateTodo}
            />
            <List>
                {todos.map(todo => (
                    <ListItem key={todo._id} style={{ backgroundColor: '#fffde7', margin: '10px', borderRadius: '4px' }}>
                        <Checkbox
                            checked={todo.isCompleted}
                            onChange={(e) => handleCompletionChange(todo._id, e.target.checked)}
                        />
                        <ListItemText primary={todo.task} secondary={`Created at: ${new Date(todo.createdAt).toLocaleString()}`} />
                        <IconButton onClick={() => { setEditingTodo(todo); setOpen(true); }} color="primary">
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(todo._id)} color="secondary">
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}

export default TodosComponent;
