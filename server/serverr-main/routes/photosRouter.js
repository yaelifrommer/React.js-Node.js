const express = require('express');
const router = express.Router();
const multer = require('multer'); // A module for photos.
const path = require('path');
const Photo = require('../models/Photo');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // The photos folder.
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
// The way the server relates to photos comming from the enternet.
const upload = multer({ storage: storage });

// Create a new photo 
router.post('/', upload.single('photo'), async (req, res) => {
  const photo = new Photo({
    title: req.body.title || 'Untitled',
    url: req.file.path
  });
  try {
    const newPhoto = await photo.save();
    res.status(201).json(newPhoto); // If managed.
  } catch (error) {
    res.status(400).json({ message: error.message }); // If failed.
  }
});

// Read all photos
router.get('/', async (req, res) => {
  try {
    const photos = await Photo.find();
    res.json(photos);
  } catch (err) {
    res.status(500).json({ message: err.message }); // Failed loading photos.
  }
});

// Delete a photo
router.delete('/:id', getPhoto, async (req, res) => {
    try {
        const photo = await Photo.findByIdAndDelete(req.params.id); // Find the searched photo.
        if (!photo) res.status(404).json({ message: 'Photo not found' }); // Erase unknown photo.
        res.json({ message: 'Photo deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Middleware to get post object by ID
async function getPhoto(req, res, next) {
    let photo;
    try {
        photo = await Photo.findById(req.params.id);
        if (photo == null) {
            return res.status(404).json({ message: 'Cannot find photo' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.photo = photo;
    next();
}

module.exports = router;
