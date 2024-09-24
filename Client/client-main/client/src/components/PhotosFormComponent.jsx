import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Button, DialogActions } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
//The photos component for adding and erasing Photos.
const PhotosFormComponent = ({ open, handleClose, handlePhotoSubmit }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    // Chooses a Photo.
    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };
    // Add a new Photo.
    const handleSubmit = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('photo', selectedFile);
            handlePhotoSubmit(formData);
            handleClose();
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add New Photo</DialogTitle>
            <DialogContent>
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    type="file"
                    onChange={handleFileChange}
                />
                <label htmlFor="raised-button-file">
                    <Button variant="raised" component="span">
                        <AddAPhotoIcon /> Upload
                    </Button>
                </label>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">Cancel</Button>
                <Button onClick={handleSubmit} color="primary" disabled={!selectedFile}>Add</Button>
            </DialogActions>
        </Dialog>
    );
};

export default PhotosFormComponent;
