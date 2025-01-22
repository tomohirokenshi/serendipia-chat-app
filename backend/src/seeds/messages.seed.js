import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import Message from "../models/message.model.js";

config();

const seedMessages = [
  {
    senderId: "67838649546f681bc3d45507",
    groupId: "678b9b4fb3ae248616011b03",
    text: "Hey, what’s up familia?",
    image: "", // Add an image URL if you want
  },
  {
    senderId: "6784e169cc7c0c8758e194fb",
    groupId: "678b9b4fb3ae248616011b03",
    text: "Not much, just chilling!",
    image: "", // Add an image URL if you want
  },
  {
    senderId: "678b9b0bb3ae248616011ad2",
    groupId: "678b9b4fb3ae248616011b03",
    text: "Same here, let’s plan something soon!",
    image: "", // Add an image URL if you want
  },
  {
    senderId: "67838649546f681bc3d45507",
    groupId: "678b9b4fb3ae248616011b03",
    text: "Going to the beach seeems nice!",
    image: "", // Add an image URL if you want
  },
  {
    senderId: "678b9b0bb3ae248616011ad2",
    groupId: "678b9b4fb3ae248616011b03",
    text: "OOOOooooooo, that sounds amazing I like that!",
    image: "", // Add an image URL if you want
  },
  {
    senderId: "6784e169cc7c0c8758e194fb",
    groupId: "678b9b4fb3ae248616011b03",
    text: "Then what are we waiting for? Let's go!",
    image: "", // Add an image URL if you want
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await Message.insertMany(seedMessages);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();
