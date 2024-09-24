import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostFormComponent from './PostFormComponent';
import { List, ListItem, ListItemText, IconButton, Paper, Button, Collapse, Skeleton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
// The post component for presenting the list of Posts and managing them.
function PostsComponent() {
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);
    const [open, setOpen] = useState(false);
    const [expandedPostId, setExpandedPostId] = useState(null);
    const [likedPosts, setLikedPosts] = useState(new Set());

    useEffect(() => {
        fetchPosts();
    }, []);
    // Getting the posts from server.
    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/posts');
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };
    // Deleting a post.
    const handleDelete = async (postId) => {
        try {
            await axios.delete(`http://localhost:4000/api/posts/${postId}`);
            fetchPosts();
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };
    // Open the dialog.
    const handleOpen = () => {
        setEditingPost(null);
        setOpen(true);
    };
    // Close the dialog.
    const handleClose = () => {
        setOpen(false);
        fetchPosts();
    };
    // The heart of liking the post.
    const handleToggleLike = (postId) => {
        const newLikedPosts = new Set(likedPosts);
        if (newLikedPosts.has(postId)) {
            newLikedPosts.delete(postId);
        } else {
            newLikedPosts.add(postId);
        }
        setLikedPosts(newLikedPosts);
    };
    // For squizing the long content.
    const handleToggleContent = (postId) => {
        setExpandedPostId(expandedPostId === postId ? null : postId);
    };
    // creates a visual placeholder for posts while data is loading
    //, using a list of skeleton components to simulate the layout of the posts.
    const renderPostSkeletons = () => {
        return [...Array(5)].map((_, index) => (
            <ListItem key={index} style={{ padding: 10, margin: 10, border: '1px solid #ddd', borderRadius: 4 }}>
                <Skeleton variant="rectangular" width={210} height={118} />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
            </ListItem>
        ));
    };

    return (
        <Paper style={{ margin: 16, padding: 16 }}>
            <IconButton onClick={handleOpen} color="primary">
                <AddCircleOutlineIcon /> Add New Post
            </IconButton>
            <PostFormComponent
                post={editingPost}
                open={open}
                handleClose={handleClose}
                savePost={fetchPosts}
            />
            <List>
                {posts.length > 0 ? posts.map(post => (
                    <ListItem key={post._id} style={{ padding: 10, margin: 10, border: '1px solid #ddd', borderRadius: 4 }}>
                        <ListItemText
                            primary={post.content.length > 50 && expandedPostId !== post._id
                                ? `${post.content.substring(0, 50)}...`
                                : post.content}
                            secondary={expandedPostId === post._id ? post.content : null}
                            onClick={() => handleToggleContent(post._id)}
                        />
                        {post.content.length > 50 && (
                            <Button onClick={() => handleToggleContent(post._id)}>
                                {expandedPostId === post._id ? 'Less' : 'More'}
                            </Button>
                        )}
                        <IconButton onClick={() => handleToggleLike(post._id)} color={likedPosts.has(post._id) ? "error" : "default"}>
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton onClick={() => { setEditingPost(post); setOpen(true); }} color="primary">
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(post._id)} color="secondary">
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                )) : renderPostSkeletons()}
            </List>
        </Paper>
    );

}

export default PostsComponent;

