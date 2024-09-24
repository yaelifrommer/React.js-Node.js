import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
// For naviigating through the pages.
function Navbar() {
    return (
        <AppBar position="static" style={{ backgroundColor: '#673ab7', width: '100%' }}> 
            <Toolbar>
                <Button color="inherit" component={Link} to="/" style={{ marginRight: '10px' }}>Home</Button>
                <Button color="inherit" component={Link} to="/Todo" style={{ marginRight: '10px' }}>Todos</Button>
                <Button color="inherit" component={Link} to="/Post" style={{ marginRight: '10px' }}>Posts</Button>
                <Button color="inherit" component={Link} to="/Photo" style={{ marginRight: '10px' }}>Photos</Button>
                <Button color="inherit" component={Link} to="/User" style={{ marginRight: '10px' }}>Users</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
