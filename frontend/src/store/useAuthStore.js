import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001' ;

export const useAuthStore = create((set, get) => ({
	authUser: null,
	isSigningUp: false,
	isLoggingIn: false,
	isLoggingOut: false,
	isUpdatingProfile: false,
	onlineUsers: [],
	socket: null,

	isCheckingAuth: true,

	checkAuth: async () => {
		try {
			const res = await axiosInstance.get('auth/check');
			set({ authUser: res.data });
			get().connectSocket();
		} catch (error) {
			console.log('Error in checkAuth zustand fxn', error);
			set({ authUser: null });
		} finally {
			set({ isCheckingAuth: false });
		}
	},

	signup: async (data) => {
		set({ isSigningUp: true });
		try {
			const res = await axiosInstance.post('auth/signup', data);
			set({ authUser: res.data });
			toast.success('Account created successfully');
			get().connectSocket();
		} catch (error) {
			console.log('Error in signup zustand fxn', error);
			toast.error(error.response?.data?.message || 'Signup failed');
		} finally {
			set({ isSigningUp: false });
		}
	},

	login: async (data) => {
		set({ isLoggingIn: true });
		try {
			const res = await axiosInstance.post('auth/login', data);
			set({ authUser: res.data });
			toast.success('Logged in successfully');
			get().connectSocket();
		} catch (error) {
			console.log('Error in login zustand fxn', error);
			toast.error(error.response?.data?.message || 'Login failed');
		} finally {
			set({ isLoggingIn: false });
		}
	},

	updateProfile: async (data) => {
		set({ isUpdatingProfile: true });
		try {
			const res = await axiosInstance.put('auth/update-profile', data);
			set({ authUser: res.data });
			toast.success('Profile photo updated');
		} catch (error) {
			console.log('Error in updateProfile zustand fxn', error);
			toast.error(error.response?.data?.message || 'Profile update failed');
		} finally {
			set({ isUpdatingProfile: false });
		}
	},

	logout: async () => {
		set({ isLoggingOut: true });
		try {
			await axiosInstance.post('auth/logout');
			set({ authUser: null });
			toast.success('Logged out successfully');
      get().disconnectSocket();
		} catch (error) {
			console.log('Error in logout zustand fxn', error);
			toast.error(error.response?.data?.message || 'Logout failed');
		} finally {
			set({ isLoggingOut: false });
		}
	},

	connectSocket: () => {
    const { authUser, socket } = get();

    if (!authUser || socket?.connected) return;

    if (socket) {
      socket.disconnect();
    }

    const newSocket = io(BASE_URL, {
      autoConnect: true,
      withCredentials: true,
      transports: ['websocket', 'polling'],
      query: {
        userId: authUser._id,
      },
    });

    newSocket.on('connect', () => {
      console.log("A user connected", authUser._id);
    });

    newSocket.on('connect_error', (error) => {
      console.log('Socket connect_error:', error.message, error);
    });

    newSocket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
    });

    newSocket.on('getOnlineUsers', (userIds) => {
      set({ onlineUsers: userIds });
    });

    set({ socket: newSocket });
  },
	disconnectSocket: () => {
    const { socket } = get();
    if (socket?.connected) socket.disconnect();
    set({ socket: [] });
  }
}));
