const bcrypt = require('bcryptjs');
const User = require("../../models/UserRegister");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signup = async (userData) => {
  const {  email, phone, password } = userData;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('Email already exists');
    }
    // const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({      
      email,
      phone,
      password: hashedPassword
    });
    const result = await newUser.save();
    return result;
  } catch (error) {
    console.error("Failed to add user:", error.message);
    throw new Error(error.message || "Failed to add user");
  }
};

exports.login = async (userData) => {
  const { email,address, phon } = userData;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Auth failed');
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error('Auth failed');
    }
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email
      },
      process.env.JWT_KEY,
      {
        expiresIn: '1h'
      }
    );
    return {
      message: 'Auth successful',
      token
    };
  } catch (error) {
    console.error('Auth failed:', error.message);
    throw new Error(error.message || 'Auth failed');
  }
};

exports.deleteUser = async (userId) => {
  try {
    const deletedUser = await User.findOneAndDelete({ email: email });
    if (!deletedUser) {
      throw new Error("User not found");
    }
    return deletedUser;
  } catch (error) {
    console.error("Failed to delete user:", error.message);
    throw new Error(error.message || "Failed to delete user");
  }
};

exports.getAllUsers = async () => {
  try {
    return await User.find();
  } catch (error) {
    console.error("Failed to get users:", error.message);
    throw new Error(error.message || "Failed to get users");
  }
};

exports.updateUser = async (email, updateData) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      updateData,
      { new: true }
    );
    if (!updatedUser) {
      throw new Error("User not found");
    }
    return updatedUser;
  } catch (error) {
    console.error("Failed to update user:", error.message);
    throw new Error(error.message || "Failed to update user");
  }
};

exports.getUserByName = async (displayName) => {
  try {
    const user = await User.findOne({ displayName });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error("Failed to get user:", error.message);
    throw new Error(error.message || "Failed to get user");
  }
};