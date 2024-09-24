import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Button, DialogActions } from '@mui/material';

const UsersFormComponent = ({ user, open, handleClose, handleUserSubmit }) => {
    // The users component for dealing with data.
    const [userData, setUserData] = useState({ name: '', email: '' });

    useEffect(() => { // Runs after rendring and refreshes the users display.
        if (user) {
            setUserData(user);
        } else {
            setUserData({ name: '', email: '' });
        }
    }, [user]);

    const handleChange = (e) => { // Updating user with new values.
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => { // Send to server.
        handleUserSubmit(userData);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{user ? 'Edit User' : 'Add New User'}</DialogTitle>
            <DialogContent>
                <TextField
                    name="name"
                    label="Name"
                    value={userData.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="email"
                    label="Email"
                    value={userData.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UsersFormComponent;
