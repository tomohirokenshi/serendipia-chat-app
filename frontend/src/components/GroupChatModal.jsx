import { useState } from "react";
import { X, Loader2, Camera } from "lucide-react";
import toast from "react-hot-toast";

import { useAuthStore } from "../store/useAuthStore";

const GroupChatModal = ({ users, onClose }) => {
  const [groupPic, setSelectedImg] = useState(null);
  const [name, setGroupName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [members, setSelectedUsers] = useState([]);

  const { createGroup, isCreatingGroup } = useAuthStore();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
    };
  };

  const toggleUserSelection = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const filteredUsers = users.filter((user) =>
    user.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selected = filteredUsers.filter((user) => members.includes(user._id));
  const unselected = filteredUsers.filter(
    (user) => !members.includes(user._id)
  );

  const validateForm = () => {
    if (!name.trim()) return toast.error("Group name is required");
    if (1 + members.length < 3)
      return toast.error("A group must have at least 3 members");

    return true;
  };

  const handleCreateGroup = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) {
      createGroup(groupPic, name, members);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-base-100 p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create Group Chat</h2>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-100"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={groupPic || "/group-avatar.png"}
              alt="GroupProfile"
              className="size-32 rounded-full object-cover border-4 "
            />
            <label
              htmlFor="avatar-upload"
              className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isCreatingGroup ? "animate-pulse pointer-events-none" : ""}
                `}
            >
              <Camera className="w-5 h-5 text-base-200" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isCreatingGroup}
              />
            </label>
          </div>
          <p className="text-sm text-zinc-400">
            {isCreatingGroup
              ? "Uploading..."
              : "Click the camera icon to update your photo"}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Group Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter group name"
            className="input input-bordered w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Search Users</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by username"
            className="input input-bordered w-full"
          />
        </div>

        <div className="overflow-y-auto max-h-40">
          {/* Render selected users first */}
          {selected.map((user) => (
            <div
              key={user._id}
              onClick={() => toggleUserSelection(user._id)}
              className="flex items-center gap-3 p-2 rounded-md bg-base-300"
            >
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.userName}
                className="size-8 rounded-full"
              />
              <span className="text-sm">{user.userName}</span>
            </div>
          ))}

          {/* Render unselected users after */}
          {unselected.map((user) => (
            <div
              key={user._id}
              onClick={() => toggleUserSelection(user._id)}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-base-300 cursor-pointer"
            >
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.userName}
                className="size-8 rounded-full"
              />
              <span className="text-sm">{user.userName}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="btn btn-outline btn-sm">
            Cancel
          </button>
          <button
            onClick={handleCreateGroup}
            className="btn btn-primary btn-sm"
            disabled={isCreatingGroup}
          >
            {isCreatingGroup ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Create Group"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupChatModal;
