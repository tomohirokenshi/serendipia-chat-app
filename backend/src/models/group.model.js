import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    members: {
      type: [String],
      ref: "User",
    },
    groupPic: {
      type: String,
      default: "",
    },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  },
  { timestamps: true }
);

const Group = mongoose.model("Group", groupSchema);

export default Group;
