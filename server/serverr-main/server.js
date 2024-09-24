const express = require('express'); // The module for creating the server.
const mongoose = require('mongoose'); // Working with MongoDB.
const cors = require('cors'); // Allowing requests from other domains.
// Routers for routs in the server.
const usersRouter = require('./routes/usersRouter'); 
const postsRouter = require('./routes/postsRouter');
const todosRouter = require('./routes/todosRouter');
const photosRouter = require('./routes/photosRouter');
const app = express();
const port = process.env.PORT || 4000; // The servers port.
app.use('/uploads', express.static('uploads')); // The sent photos.
app.use(cors());
app.use(express.json());

// Middleware to log on receiving any request
app.use((req, res, next) => {
    console.log("got a message!!");
    next();
});

// Define routes for each entity
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);
app.use('/api/todos', todosRouter);
app.use('/api/photos', photosRouter);

// Connect to MongoDB
mongoose.connect('mongodb://localhost/DB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
