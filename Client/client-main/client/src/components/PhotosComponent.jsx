import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PhotosFormComponent from './PhotosFormComponent';
import { Grid, IconButton, Paper, Card, CardMedia, CardActions, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
// The photo component for presenting the list of Photos and managing them.
const PhotosComponent = () => {
    const [photos, setPhotos] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchPhotos();
    }, []);
    // Get all Photos from server.
    const fetchPhotos = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/photos');
            setPhotos(response.data);
        } catch (error) {
            console.error('Error fetching photos:', error);
        }
    };
    // Send new Photo.
    const handlePhotoSubmit = async (formData) => {
        try {
            await axios.post('http://localhost:4000/api/photos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            fetchPhotos();
        } catch (error) {
            console.error('Error submitting photo:', error);
        }
    };
    // Erase a Photo.
    const handleDelete = async (photoId) => {
        try {
            await axios.delete(`http://localhost:4000/api/photos/${photoId}`);
            setPhotos(photos.filter(photo => photo._id !== photoId)); 
        } catch (error) {
            console.error('Error deleting photo:', error);
        }
    };

    return (
        <Paper style={{ margin: 16, padding: 16 }}>
            <Button onClick={() => setOpen(true)} color="primary">Add New Photo</Button>
            <PhotosFormComponent open={open} handleClose={() => setOpen(false)} handlePhotoSubmit={handlePhotoSubmit} />
            <Grid container spacing={2}>
                {photos.map((photo) => (
                    <Grid item xs={12} sm={6} md={4} key={photo._id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={`http://localhost:4000/${photo.url}`}
                                alt={photo.title}
                            />
                            <CardActions>
                                <IconButton onClick={() => handleDelete(photo._id)} color="secondary">
                                    <DeleteIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};

export default PhotosComponent;
