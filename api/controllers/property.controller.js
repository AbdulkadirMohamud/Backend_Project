import propertyModel from "../models/property.model.js";
import userModel from "../models/user.model.js";
// Get Properties and search filter - GET
export const getProperties = async (req, res) => {
  try {
    const search = req.query;
    const properties = await propertyModel
      .find(search)
      .sort({ createdAt: -1 })
      .populate("owner", "name email avatar");
    if (properties.length === 0) {
      return res
        .status(404)
        .json({ status: 404, message: "Properties not found" });
    }
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
// create property - POST
export const createProperty = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const role = req.user.role;
    // Check if the user is the owner
    if (role === "owner") {
      const owner = await userModel.findById({ _id: ownerId });
      if (!owner) {
        return res
          .status(404)
          .json({ status: 404, message: "The owner not found" });
      }
      const newProperty = new propertyModel({
        ...req.body,
        owner: ownerId,
      });
      if (!newProperty) {
        return res
          .status(400)
          .json({ status: 400, message: "Property was not created!" });
      }
      await newProperty.save();
      res
        .status(200)
        .json({ status: 200, message: "Property created successfully" });
    } else {
      res.status(403).json({
        status: 403,
        message: "You don't have permission",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
// Property Images Update - PUT
export const updateImages = async (req, res) => {
  try {
    const id = req.params.id
    const ownerId = req.user.id;
    const role = req.user.role
    if(role === 'renter') {
      res.status(403).json({
        status: 403,
        message: "You don't have permission",
      });
    }
    const owner = await userModel.findById({ _id: ownerId });
    if (!owner) {
      return res
        .status(404)
        .json({ status: 404, message: "The owner not found" });
    }
    const property = await propertyModel.findById(id);
    if (!property) {
      return res.status(404).json({
        status: 404,
        message: "The Property not found",
      });
    }
    if (property.owner.toString() !== ownerId) {
      return res.status(403).json({
        status: 403,
        message: "You do not own this property!",
      });
    }
    const updatedPropertyImages = await propertyModel.findByIdAndUpdate(
      { _id: id },
      { images: req.body},
      { new: true }
    );
    if (!updatedPropertyImages) {
      return res
        .status(400)
        .json({ status: 400, message: "Property images was not updated!" });
    }
    res
      .status(200)
      .json({ status: 200, message: "Property updated images successfully" });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
// Update Property - PUT
export const updateProperty = async (req, res) => {
  try {
    const id = req.params.id;
    const role = req.user.role;
    // Check if the user is the owner
    if (role === "owner") {
      const ownerId = req.user.id;
      const owner = await userModel.findById({ _id: ownerId });
      if (!owner) {
        return res
          .status(404)
          .json({ status: 404, message: "The owner not found" });
      }
      const property = await propertyModel.findById(id);
      if (!property) {
        return res.status(404).json({
          status: 404,
          message: "The Property not found",
        });
      }
      if (property.owner.toString() !== ownerId) {
        return res.status(403).json({
          status: 403,
          message: "You do not own this property!",
        });
      }
      const updatedProperty = await propertyModel.findByIdAndUpdate(
        { _id: id },
        { $set: req.body },
        { new: true }
      );
      if (!updatedProperty) {
        return res
          .status(400)
          .json({ status: 400, message: "Property was not updated!" });
      }
      res
        .status(200)
        .json({ status: 200, message: "Property updated successfully" });
    } else {
      res.status(403).json({
        status: 403,
        message: "You don't have permission",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
// Property Delete - DELETE
export const deleteProperty = async (req, res) => {
  try {
    const id = req.params.id;
    const role = req.user.role;
    // Check if the user is the owner
    if (role === "owner") {
      const ownerId = req.user.id;
      // Check if the owner exists
      const owner = await userModel.findById({ _id: ownerId });
      if (!owner) {
        return res
          .status(404)
          .json({ status: 404, message: "The owner not found" });
      }
      const property = await propertyModel.findById(id);
      if (!property) {
        return res.status(404).json({
          status: 404,
          message: "The Property not found",
        });
      }
      if (property.owner.toString() !== ownerId) {
        return res.status(403).json({
          status: 403,
          message: "You do not own this property!",
        });
      }
      const deletedProperty = await propertyModel.findByIdAndDelete(id);
      if (!deletedProperty) {
        return res
          .status(400)
          .json({ status: 400, message: "Property was not deleted" });
      }
      res
        .status(200)
        .json({ status: 200, message: "Property deleted successfully" });
    } else {
      // Permission denied for non-owners
      res.status(403).json({
        status: 403,
        message: "You don't have permission",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};







