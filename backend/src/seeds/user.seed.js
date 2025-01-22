import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
  {
    email: "hange.zoe@example.com",
    userName: "Hange Zoe",
    password: "12345678",
    profilePic:
      "https://res.cloudinary.com/ddxotwjct/image/upload/v1737029224/pthoq64zrt3f0nraa89b.webp",
  },
  {
    email: "sasha.braus@example.com",
    userName: "Sasha Braus",
    password: "12345678",
    profilePic:
      "https://res.cloudinary.com/ddxotwjct/image/upload/v1737029224/x00pn2jgsxptay5qroqz.webp",
  },
  {
    email: "historia.reiss@example.com",
    userName: "Historia Reiss",
    password: "12345678",
    profilePic:
      "https://res.cloudinary.com/ddxotwjct/image/upload/v1737030124/Historia_Reiss_29_character_image_vno2xr.webp",
  },
  {
    email: "mikasa.ackermann@example.com",
    userName: "Mikasa Ackermann",
    password: "12345678",
    profilePic:
      "https://res.cloudinary.com/ddxotwjct/image/upload/v1737030125/Mikasa_Ackermann_29_character_image_vtqymq.webp",
  },
  {
    email: "annie.leonhart@example.com",
    userName: "Annie Leonhart",
    password: "12345678",
    profilePic:
      "https://res.cloudinary.com/ddxotwjct/image/upload/v1737030124/Annie_Leonhart_29_character_image_oeyyja.webp",
  },
  {
    email: "pieck.finger@example.com",
    userName: "Pieck Finger",
    password: "12345678",
    profilePic:
      "https://res.cloudinary.com/ddxotwjct/image/upload/v1737030124/Pieck_Finger_29_character_image_v6fygy.webp",
  },
  {
    email: "eren.jaeger@example.com",
    userName: "Eren Jaeger",
    password: "12345678",
    profilePic:
      "https://res.cloudinary.com/ddxotwjct/image/upload/v1736960309/1000_c1q1dm.png",
  },
  {
    email: "zeke.jaeger@example.com",
    userName: "Zeke Jaeger",
    password: "12345678",
    profilePic:
      "https://res.cloudinary.com/ddxotwjct/image/upload/v1736960186/Zeke_Jaeger_29_character_image_sq1rd2.jpg",
  },
  {
    email: "erwin.smith@example.com",
    userName: "Erwin Smith",
    password: "12345678",
    profilePic:
      "https://res.cloudinary.com/ddxotwjct/image/upload/v1737029224/q0og2dumvqhhgssfe5ux.webp",
  },
  {
    email: "bertholdt.hoover@example.com",
    userName: "Bertholdt Hoover",
    password: "12345678",
    profilePic:
      "https://res.cloudinary.com/ddxotwjct/image/upload/v1737029223/vjyeqoygorbuyqay7tpu.webp",
  },
  {
    email: "armin.arlelt@example.com",
    userName: "Armin Arlelt",
    password: "12345678",
    profilePic:
      "https://res.cloudinary.com/ddxotwjct/image/upload/v1737030124/Armin_Arlelt_29_character_image_xg31qc.webp",
  },
  {
    email: "reiner.braun@example.com",
    userName: "Reiner Braun",
    password: "12345678",
    profilePic:
      "https://res.cloudinary.com/ddxotwjct/image/upload/v1737030125/Reiner_Braun_29_character_image_ofmkby.webp",
  },
  {
    email: "jean.kirschtein@example.com",
    userName: "Jean Kirschtein",
    password: "12345678",
    profilePic:
      "https://res.cloudinary.com/ddxotwjct/image/upload/v1737030538/Jean_Kirschtein_29_character_image_avc5cp.webp",
  },
  {
    email: "levi.ackermann@example.com",
    userName: "Levi Ackermann",
    password: "12345678",
    profilePic:
      "https://res.cloudinary.com/ddxotwjct/image/upload/v1737030124/Levi_Ackermann_29_character_image_xzjrbu.webp",
  },
  {
    email: "conny.springer@example.com",
    userName: "Conny Springer",
    password: "12345678",
    profilePic:
      "https://res.cloudinary.com/ddxotwjct/image/upload/v1737030124/Conny_Springer_29_character_image_ue2bwb.webp",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();
