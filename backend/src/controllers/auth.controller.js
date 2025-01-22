import Group from "../models/group.model.js";
import User from "../models/user.model.js";

import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";

// Signup Function
export const signup = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    if (!userName || !email || !password) {
      return res.status(400).json({ message: "All fields must be provided" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName: userName,
      email: email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ message: "Failed to create user" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Login Function
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Logout Function
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Profile
export const updateProfile = async (req, res) => {
  try {
    const { profilePic, userName } = req.body;
    const userId = req.user._id;
    const updates = {};

    if (profilePic) {
      const sizeInBytes =
        (profilePic.length * 3) / 4 -
        (profilePic.indexOf("=") > 0 ? profilePic.split("=").length - 1 : 0);

      if (sizeInBytes > 5 * 1024 * 1024) {
        return res
          .status(413)
          .json({ message: "Profile picture exceeds the 5MB size limit." });
      }

      const uploadResponse = await cloudinary.uploader.upload(profilePic);
      updates.profilePic = uploadResponse.secure_url;
    }

    if (userName) {
      updates.userName = userName;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in updateProfile controller", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Create Group Chat
export const createGroup = async (req, res) => {
  try {
    const { groupPic, name, members } = req.body;
    const creatorId = req.user.id;

    if (groupPic) {
      const sizeInBytes =
        (groupPic.length * 3) / 4 -
        (groupPic.indexOf("=") > 0 ? groupPic.split("=").length - 1 : 0);

      if (sizeInBytes > 5 * 1024 * 1024) {
        return res
          .status(413)
          .json({ message: "Profile picture exceeds the 5MB size limit." });
      }
    }

    if (!name) {
      return res.status(400).json({ error: "Group name is required" });
    }

    if (!members || members.length === 0) {
      return res.status(400).json({ error: "Members are required" });
    }

    if (1 + members.length < 3) {
      return res
        .status(400)
        .json({ error: "A group must have at least 3 members" });
    }

    members.push(creatorId);

    const newGroup = new Group({ groupPic, name, members });
    console.log("Received members:", members);
    await newGroup.save();

    res.status(201).json(newGroup);
  } catch (error) {
    console.error("Error in createGroup controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Verify if User is Authenticated Function
export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
