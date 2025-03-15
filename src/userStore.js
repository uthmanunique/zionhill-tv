// userStore.js
import api from './api';

const listeners = [];
let userState = null;

const emitChange = () => {
  listeners.forEach((listener) => listener(userState));
};

export const userStore = {
  // Initialize user data on login
  initialize: async () => {
    const token = localStorage.getItem('token');
    if (token && !userState) {
      try {
        const { data } = await api.get('/auth/me');
        userState = data;
        emitChange();
        console.log('userStore: Initialized with user data', data);
      } catch (err) {
        console.error('userStore: Fetch error', err);
        userStore.logout();
      }
    }
  },

  // Update user data after profile changes
  updateUser: (updatedUser) => {
    userState = { ...userState, ...updatedUser };
    emitChange();
    console.log('userStore: User updated', userState);
  },

  // Get current user data
  getUser: () => userState,

  // Subscribe to changes
  subscribe: (listener) => {
    listeners.push(listener);
    listener(userState); // Immediate callback with current state
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) listeners.splice(index, 1);
    };
  },

  // Login and logout
  login: async (token) => {
    localStorage.setItem('token', token);
    await userStore.initialize();
  },

  logout: () => {
    localStorage.removeItem('token');
    userState = null;
    emitChange();
  },

  isAuthenticated: () => !!localStorage.getItem('token'),
};