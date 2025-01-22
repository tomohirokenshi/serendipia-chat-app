import { useState, useEffect } from "react";
import { Users, Plus } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import GroupChatModal from "./GroupChatModal";

const Sidebar = () => {
  const {
    getUsers,
    getGroups,
    users,
    groups,
    selectedUser,
    setSelectedUser,
    setSelectedGroup,
    selectedGroup,
    isUsersLoading,
    isGroupsLoading,
  } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);

  useEffect(() => {
    getUsers();
    getGroups();
  }, [getUsers, getGroups]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading || isGroupsLoading) return <SidebarSkeleton />;

  const groupsWithLastMessage = groups.map((group) => {
    const lastMessage = group.messages?.[0];
    return {
      ...group,
      lastMessageTime: lastMessage ? lastMessage.createdAt : null,
    };
  });

  const combinedData = [
    ...filteredUsers.map((user) => ({
      ...user,
      type: "user",
      lastMessageTime: user.lastMessageTime,
    })),
    ...groups.map((group) => ({ ...group, type: "group" })),
  ];

  combinedData.sort(
    (a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
  );

  return (
    <>
      <aside className="h-full w-25 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
        <div className="border-b border-base-300 w-full p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="size-6 hidden lg:block" />
              <span className="font-medium hidden lg:block">Contacts</span>
            </div>
            <button
              onClick={() => setShowGroupModal(true)}
              className="btn btn-sm gap-2 hidden lg:flex items-center"
            >
              <Plus className="size-6" />
              <span className="hidden sm:inline">Create Group</span>
            </button>
            <button
              onClick={() => setShowGroupModal(true)}
              className="btn btn-circle lg:hidden"
            >
              <Plus className="size-8" />
            </button>
          </div>
          <div className="mt-3 hidden lg:flex items-center gap-2">
            <label className="cursor-pointer flex items-center gap-2">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="checkbox checkbox-sm"
              />
              <span className="text-sm">Show online only</span>
            </label>
            <span className="text-xs text-zinc-500">
              ({onlineUsers.length - 1} online)
            </span>
          </div>
        </div>

        <div className="overflow-y-auto w-full py-3">
          {combinedData.map((item) => (
            <button
              key={item._id}
              onClick={() =>
                item.type === "user"
                  ? setSelectedUser(item)
                  : setSelectedGroup(item)
              }
              className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${
                (item.type === "user" && selectedUser?._id === item._id) ||
                (item.type === "group" && selectedGroup?._id === item._id)
                  ? "bg-base-300 ring-1 ring-base-300"
                  : ""
              }`}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={
                    item.type === "user"
                      ? item.profilePic || "/avatar.png"
                      : item.groupPic || "/group-avatar.png"
                  }
                  alt={item.type === "user" ? item.userName : item.name}
                  className="size-12 object-cover rounded-full"
                />
                {item.type === "user" && onlineUsers.includes(item._id) && (
                  <span
                    className="absolute bottom-0 right-0 size-3 bg-green-500 
            rounded-full ring-2 ring-zinc-900"
                  />
                )}
              </div>
              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate">
                  {item.type === "user" ? item.userName : item.name}
                </div>
                <div className="text-sm text-zinc-400">
                  {item.type === "user"
                    ? onlineUsers.includes(item._id)
                      ? "Online"
                      : "Offline"
                    : `${item.members.length} members`}
                </div>
              </div>
            </button>
          ))}

          {combinedData.length === 0 && (
            <div className="text-center text-zinc-500 py-4">
              No users or groups
            </div>
          )}
        </div>
      </aside>

      {showGroupModal && (
        <GroupChatModal
          users={users}
          onlineUsers={onlineUsers}
          onClose={() => setShowGroupModal(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
