import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { requestNotificationPermission } from "../lib/utils.js";
import { showBrowserNotification } from "../lib/utils.js";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });
      get().connectSocket();
      await requestNotificationPermission();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
      await requestNotificationPermission();
    } catch (error) {
      const msg = error?.response?.data?.message || error.message || "Request failed";
      toast.error(msg);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");

      get().connectSocket();
      await requestNotificationPermission();
    } catch (error) {
      const msg = error?.response?.data?.message || error.message || "Request failed";
      toast.error(msg);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      const msg = error?.response?.data?.message || error.message || "Request failed";
      toast.error(msg);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      const msg = error?.response?.data?.message || error.message || "Request failed";
      toast.error(msg);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

    // Global notifications: show on any page (e.g., homepage). Suppress only if current chat is open with sender.
    socket.on("newMessage", (newMessage) => {
      const selfId = get().authUser?._id;
      if (newMessage?.senderId === selfId) return;

      // Read currently selected chat and known users if available
      const selected = typeof window !== "undefined" ? window.__selectedUser : null;
      const users = typeof window !== "undefined" ? window.__users : [];

      const isFromOpenChat = selected && newMessage.senderId === selected._id;
      if (isFromOpenChat) return; // do not spam when in that chat

      const sender = (users || []).find((u) => u._id === newMessage.senderId);
      const senderName = sender?.fullName || "Someone";
      const preview = newMessage?.text?.slice(0, 80) || "Sent you a message";

      // Toast
      toast.success(`${senderName}: ${preview}`);
      // Browser notification if granted
      showBrowserNotification(senderName, {
        body: preview,
        icon: sender?.profilePic || "/avatar.png",
      });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
