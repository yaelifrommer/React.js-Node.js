import React from 'react';
import { Typography, Container } from '@mui/material';
// The Home page.
function Home() {
    return (
        <Container style={{ marginTop: '20px' }}>
            <Typography variant="h4" style={{ color: '#ff5722' }}>
                Welcome to our site.
            </Typography>
            <Typography style={{ color: '#4caf50' }}>
                A comprehensive app offering task management, post and photo publishing, and user administration, all in a single, user-friendly platform.
            </Typography>
            <Typography style={{ color: '#2196f3' }}>
                Navigate through the tabs to access different functionalities.
            </Typography>
        </Container>
    );
}

export default Home;
