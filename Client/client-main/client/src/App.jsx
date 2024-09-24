import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import TodosComponent from './components/TodosComponent';
import PostsComponent from './components/PostsComponent'; 
import PhotosComponent from './components/PhotosComponent'; 
import UsersComponent from './components/UsersComponent'; 

// The app page - presenting the navbar and home page.
function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Todo" element={<TodosComponent />} />
                <Route path="/Post" element={<PostsComponent />} />
                <Route path="/Photo" element={<PhotosComponent />} />
                <Route path="/User" element={<UsersComponent />} />
            </Routes>
        </Router>
    );
}

export default App;
