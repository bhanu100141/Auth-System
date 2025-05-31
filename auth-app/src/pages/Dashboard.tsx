import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import type { RootState } from '@/store/store';

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div
  className="max-w-xl mx-auto mt-20 p-8 border rounded-lg shadow-lg bg-white text-black
    animate-fadeIn
    transition-opacity duration-700 ease-out"
>
  <h1 className="text-4xl font-semibold mb-6 text-center">{`Welcome, ${user?.name || 'User'}!`}</h1>
  <p className="mb-8 text-center text-gray-700 text-lg">
    You have successfully logged in to the Dashboard.
  </p>
  <div className="flex justify-center">
    <Button
      onClick={handleLogout}
      variant="destructive"
      className="px-8 py-3 font-semibold shadow-lg
        transition-transform duration-300 ease-in-out
        hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-400"
    >
      Logout
    </Button>
  </div>
</div>

  );
}
