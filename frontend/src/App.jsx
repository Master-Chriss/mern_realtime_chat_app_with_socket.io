import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import { useAuthStore } from './store/useAuthStore.js';
import { useThemeStore } from './store/useThemeStore.js';
import {Loader} from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const App = () => {
	const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  console.log({onlineUsers});

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);


  if(isCheckingAuth && !authUser) return (
  <div className='flex h-screen items-center justify-center bg-base-100 text-base-content'>
    <Loader className='size-10 animate-spin' />
  </div>
  );

	return (
		<div className="min-h-screen bg-base-100 text-base-content">
			<Navbar />
			<Routes>
				<Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
				<Route path="/signup" element={!authUser ?<SignupPage /> : <Navigate to="/" />} />
				<Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
				<Route path="/settings" element={<SettingsPage />} />
				<Route path="/profile" element={authUser ?<ProfilePage /> : <Navigate to="/login" />} />
			</Routes>
			<Toaster />
		</div>
	);
};

export default App;
