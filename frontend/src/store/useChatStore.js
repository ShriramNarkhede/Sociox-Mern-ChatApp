import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
import { showBrowserNotification } from "../lib/utils";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
      if (typeof window !== "undefined") {
        window.__users = res.data;
      }
    } catch (error) {
      const msg = error?.response?.data?.message || error.message || "Request failed";
      toast.error(msg);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      const msg = error?.response?.data?.message || error.message || "Request failed";
      toast.error(msg);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      const msg = error?.response?.data?.message || error.message || "Request failed";
      toast.error(msg);
    }
  },

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      const { selectedUser, users } = get();

      const isFromOpenChat = selectedUser && newMessage.senderId === selectedUser._id;
      if (isFromOpenChat) {
        set({ messages: [...get().messages, newMessage] });
        return;
      }

      const sender = (users || []).find((u) => u._id === newMessage.senderId);
      const senderName = sender?.fullName || "Someone";
      const preview = newMessage?.text?.slice(0, 80) || "Sent you a message";

      toast.success(`${senderName}: ${preview}`);
      showBrowserNotification(`${senderName}`, {
        body: preview,
        icon: sender?.profilePic || "/avatar.png",
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off("newMessage");
  },
  setMessages: (messages) => set({ messages }),
  setUsers: (users) => {
    if (typeof window !== "undefined") {
      window.__users = users;
    }
    set({ users });
  },
  setSelectedUser: (selectedUser) => {
    if (typeof window !== "undefined") {
      window.__selectedUser = selectedUser;
    }
    set({ selectedUser });
  },
}));
