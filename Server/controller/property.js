const Property = require("../models/propertySchema"); // Adjust path as needed
const mongoose = require("mongoose");

const createProperty = async (req, res) => {
  try {
    const {
      title,
      location,
      price,
      propertyType,
      description,
      imageUrl,
      bedrooms,
      washrooms,
      size,
      availableDate,
    } = req.body;
    const newProperty = new Property({
      title,
      location,
      price,
      propertyType,
      description,
      imageUrl,
      bedrooms,
      washrooms,
      size,
      availableDate,
      owner: req.userId,
    });
    await newProperty.save();
    res
      .status(201)
      .json({
        message: "Property created successfully",
        property: newProperty,
      });
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find(); // Fetch all properties
    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get property by ID
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(property);
  } catch (error) {
    console.error("Error fetching property by ID:", error); // Added for debugging
    res.status(500).json({ message: "Server error", error });
  }
};

// Update property
// const updateProperty = async (req, res) => {
//     try {
//         const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedProperty) {
//             return res.status(404).json({ message: 'Property not found' });
//         }
//         res.status(200).json({ message: 'Property updated', property: updatedProperty });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// };

// Delete property
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json({ message: "Property deleted" });
  } catch (error) {
    console.error("Error deleting property:", error); // Added for debugging
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  createProperty,
  getAllProperties,
  getPropertyById,
  deleteProperty,
};
