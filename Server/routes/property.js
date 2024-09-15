const express = require('express');
const { createProperty, getAllProperties, getPropertyById, deleteProperty } = require('../controller/property');
const { verifyToken } = require('../middlewares/verifyToken');
const router = express.Router();


router.get('/list-properties', getAllProperties);


router.get('/property/:id', getPropertyById);


router.post('/property', verifyToken, createProperty); 
router.delete('/property/:id', verifyToken, deleteProperty);

module.exports = router;
