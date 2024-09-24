import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, DialogTitle, TextField, Button, DialogActions } from '@mui/material';
// The Todo component for dealing with todos - adding erasing updating and completing.
const TodoFormComponent = ({ todo, open, handleClose, addOrUpdateTodo }) => {
    const [todoData, setTodoData] = useState({ task: '', isCompleted: false });
    
    useEffect(() => {
        if (todo) {
            setTodoData(todo);
        } else {
            setTodoData({ task: '', isCompleted: false });
        }
    }, [todo]);
    // For updating a ToDo.
    const handleChange = (e) => {
        setTodoData({ ...todoData, [e.target.name]: e.target.value });
    };
    // Sending a new or updated todo to the server.
    const handleSubmit = async (e) => {
        e.preventDefault();
        const baseUrl = 'http://localhost:4000/api/todos';
        try {
            let response;
            if (todo) {
                response = await axios.put(`${baseUrl}/${todo._id}`, todoData); // Updating.
            } else {
                response = await axios.post(baseUrl, todoData); // Adding
                response = await axios.put(`${baseUrl}/${response.data._id}`, todoData); // Updating.
            }
            addOrUpdateTodo(response.data);
            handleClose(); // Close dialog.
        } catch (error) {
            console.error('Error submitting todo:', error);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{todo ? 'Edit Todo' : 'Add New Todo'}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField
                        name="task"
                        label="Task"
                        value={todoData.task}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            {todo ? 'Update' : 'Add'}
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default TodoFormComponent;
