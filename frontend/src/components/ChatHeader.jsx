import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = ({ setIsSidebarVisible }) => {
  const { selectedUser, selectedGroup, setSelectedUser, setSelectedGroup } =
    useChatStore();
  const { onlineUsers } = useAuthStore();

  const isGroup = !!selectedGroup;

  const onlineMembers =
    isGroup &&
    selectedGroup.members.filter((member) => onlineUsers.includes(member._id));

  const handleClose = () => {
    if (isGroup) {
      setSelectedGroup(null);
    } else {
      setSelectedUser(null);
    }

    setIsSidebarVisible(true);
  };

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={
                  isGroup
                    ? selectedGroup.groupPic || "/group-avatar.png"
                    : selectedUser?.profilePic || "/avatar.png"
                }
                alt={
                  isGroup
                    ? selectedGroup.name
                    : selectedUser?.userName || "User"
                }
              />
            </div>
          </div>
          <div>
            <h3 className="font-medium">
              {isGroup ? selectedGroup.name : selectedUser?.userName || "User"}
            </h3>
            {!isGroup && selectedUser && (
              <p className="text-sm text-base-content/70">
                {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
              </p>
            )}
            {isGroup && onlineMembers?.length > 0 && (
              <div className="text-sm text-base-content/70">
                {onlineMembers.length}{" "}
                {onlineMembers.length === 1 ? "member" : "members"} online
              </div>
            )}
          </div>
        </div>
        <button onClick={handleClose}>
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
