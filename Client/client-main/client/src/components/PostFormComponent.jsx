import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, DialogTitle, TextField, Button, DialogActions } from '@mui/material';

const PostFormComponent = ({ post, open, handleClose, savePost }) => {
    const [postData, setPostData] = useState({ content: '' });

    useEffect(() => {
        if (post) {
            setPostData({ content: post.content });
        } else {
            setPostData({ content: '' });
        }
    }, [post]);
    // Change the posts data to the sent data.
    const handleChange = (e) => {
        setPostData({ ...postData, [e.target.name]: e.target.value });
    };
    // Send a new Post to the server.
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (post) {
                await axios.put(`http://localhost:4000/api/posts/${post._id}`, postData);
            } else {
                await axios.post('http://localhost:4000/api/posts', postData);
            }
            savePost();
            handleClose();
        } catch (error) {
            console.error('Error submitting post:', error);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{post ? 'Edit Post' : 'Add New Post'}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField
                        name="content"
                        label="Content"
                        value={postData.content}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            {post ? 'Update' : 'Add'}
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default PostFormComponent;


