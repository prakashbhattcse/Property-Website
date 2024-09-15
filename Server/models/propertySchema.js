const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    propertyType: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String },
    bedrooms: { type: Number },    
    washrooms: { type: Number },   
    size: { type: Number },       
    availableDate: { type: Date, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;

