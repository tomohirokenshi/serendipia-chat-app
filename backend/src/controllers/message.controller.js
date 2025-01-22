import Group from "../models/group.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

// Retrieve User to be Displayed in Sidebar
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const users = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );

    const usersWithLastMessage = await Promise.all(
      users.map(async (user) => {
        const lastMessage = await Message.findOne({
          $or: [
            { senderId: loggedInUserId, receiverId: user._id },
            { senderId: user._id, receiverId: loggedInUserId },
          ],
        })
          .sort({ createdAt: -1 })
          .select("createdAt");

        return {
          ...user._doc,
          lastMessageTime: lastMessage ? lastMessage.createdAt : null,
        };
      })
    );

    usersWithLastMessage.sort(
      (a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
    );

    res.status(200).json(usersWithLastMessage);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Retrieve Messages from a Specific User
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Send Messages to a Specific User
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Retrieve Groups for Displaying in Sidebar
export const getGroupsForSidebar = async (req, res) => {
  try {
    const userId = req.user._id;

    const groups = await Group.find({
      members: { $in: [userId] },
    })
      .populate("members", "userName profilePic")
      .exec();

    if (!groups) {
      return res.status(404).json({ message: "No groups found" });
    }

    const groupsWithLastMessage = await Promise.all(
      groups.map(async (group) => {
        const lastMessage = await Message.findOne({
          groupId: group._id,
        })
          .sort({ createdAt: -1 })
          .select("createdAt");

        return {
          ...group._doc,
          lastMessageTime: lastMessage ? lastMessage.createdAt : null,
        };
      })
    );

    groupsWithLastMessage.sort(
      (a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
    );

    res.status(200).json(groupsWithLastMessage);
  } catch (error) {
    console.error("Error in getGroupsForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Retrieve Messages from a Specific Group
export const getGroupMessages = async (req, res) => {
  try {
    const { id: groupId } = req.params;
    const myId = req.user._id.toString();

    const messages = await Message.find({ groupId }).populate(
      "senderId",
      "userName profilePic"
    );

    const processedMessages = messages.map((message) => ({
      ...message._doc,
      isSender: message.senderId._id.toString() === myId,
    }));

    res.status(200).json(processedMessages);
  } catch (error) {
    console.log("Error in getGroupMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Send Messages to a Specific Group
export const sendGroupMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: groupId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      groupId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const group = await Group.findById(groupId);
    group.messages.push(newMessage._id);
    await group.save();

    const populatedMessage = await newMessage.populate(
      "senderId",
      "userName profilePic"
    );

    const groupRoomId = `group_${groupId}`;
    io.to(groupRoomId).emit("newGroupMessage", populatedMessage);

    res.status(201).json(populatedMessage);
  } catch (error) {
    console.log("Error in sendGroupMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
