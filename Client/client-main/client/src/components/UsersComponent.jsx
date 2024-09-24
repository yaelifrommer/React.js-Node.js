import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UsersFormComponent from './UsersFormComponent';
import { Grid, Card, CardContent, CardActions, Button, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// The users component for presenting users list and manages them.
const UsersComponent = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [open, setOpen] = useState(false);
   
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try { // Get users from server.
            const response = await axios.get('http://localhost:4000/api/users');
            setUsers(response.data); // Keep list of users.
        } catch (error) {
            console.error('Error fetching users:', error); // An error connecting to server or getting users.
        }
    };

    const handleUserSubmit = async (user) => {
        if (editingUser) {
            // Update existing user
            await axios.put(`http://localhost:4000/api/users/${editingUser._id}`, user);
        } else {
            // Add new user
            await axios.post('http://localhost:4000/api/users', user);
        }
        fetchUsers();
    };
    // Delete user.
    const handleDelete = async (userId) => {
        await axios.delete(`http://localhost:4000/api/users/${userId}`);
        fetchUsers();
    };

    return (
        <div style={{ padding: '20px' }}>
            <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                Add New User
            </Button>
            <Grid container spacing={3} style={{ marginTop: '20px' }}>
                {users.map(user => (
                    <Grid item xs={12} sm={6} md={4} key={user._id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{user.name}</Typography>
                                <Typography color="textSecondary">{user.email}</Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton onClick={() => { setEditingUser(user); setOpen(true); }}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(user._id)} color="secondary">
                                    <DeleteIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <UsersFormComponent
                user={editingUser}
                open={open}
                handleClose={() => { setOpen(false); setEditingUser(null); }}
                handleUserSubmit={handleUserSubmit}
            />
        </div>
    );
};

export default UsersComponent;
