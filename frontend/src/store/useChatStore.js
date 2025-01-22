import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  groups: [],
  selectedUser: null,
  selectedGroup: null,
  isUsersLoading: false,
  isGroupsLoading: false,
  isMessagesLoading: false,

  // Fetch user list
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // Fetch messages for a user
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // Send a message
  sendMessage: async (messageData) => {
    const { selectedUser, selectedGroup, messages } = get();
    try {
      const url = selectedUser
        ? `/messages/send/${selectedUser._id}`
        : `/messages/sendgroup/${selectedGroup._id}`;
      const res = await axiosInstance.post(url, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending message");
    }
  },

  // Fetch group list
  getGroups: async () => {
    set({ isGroupsLoading: true });
    try {
      const res = await axiosInstance.get("/messages/groups");
      set({ groups: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching groups");
    } finally {
      set({ isGroupsLoading: false });
    }
  },

  // Fetch messages for a group
  getGroupMessages: async (groupId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/group/${groupId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error fetching group messages"
      );
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // Subscribe to user messages
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      if (newMessage.senderId !== selectedUser._id) return;
      set({ messages: [...get().messages, newMessage] });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  // Subscribe to group messages
  subscribeToGroupMessages: () => {
    const { selectedGroup } = get();
    if (!selectedGroup) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newGroupMessage", (newMessage) => {
      if (newMessage.groupId !== selectedGroup._id) return;
      set({ messages: [...get().messages, newMessage] });

      const isSender = newMessage.senderId._id === authUser._id;

      // Update message with sender info and correct alignment
      set({
        messages: [
          ...get().messages,
          {
            ...newMessage,
            isSender, // add the isSender property
          },
        ],
      });
    });
  },

  unsubscribeFromGroupMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newGroupMessage");
  },

  // Select a user and reset group
  setSelectedUser: (selectedUser) => {
    set({ selectedUser, selectedGroup: null, messages: [] });
  },

  // Select a group and reset user
  setSelectedGroup: (selectedGroup) => {
    set({ selectedGroup, selectedUser: null, messages: [] });
    const socket = useAuthStore.getState().socket;
    if (selectedGroup) {
      socket.emit("joinGroup", selectedGroup._id);
    }
  },
}));
