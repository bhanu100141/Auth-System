import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { logout } from '../features/auth/authSlice';

const Header: React.FC = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header
      className="bg-white shadow-md px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center text-black gap-3 sm:gap-0 hover:bg-gray-50 transition-colors duration-500 ease-in-out fade-in-slide-down"
    >
      <Link
        to="/"
        className="font-bold text-xl sm:text-2xl text-center sm:text-left hover-animate hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
        style={{ textDecoration: 'none' }}
      >
        Authentication System
      </Link>
      <nav className="flex flex-wrap justify-center sm:justify-end items-center gap-4 mt-3 sm:mt-0">
        {isAuthenticated ? (
          <>
            <span
              className="text-sm text-gray-700 select-none"
              aria-label={`Welcome ${user?.name}`}
            >
              Welcome, <span className="font-semibold text-blue-700">{user?.name}</span>
            </span>
            <Link
              to="/dashboard"
              className="text-sm no-underline text-gray-700 hover:text-blue-600 hover-animate focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
            >
              Dashboard
            </Link>
            <Link
              to="/tools"
              className="text-sm no-underline text-gray-700 hover:text-blue-600 hover-animate focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
            >
              Tools
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1 rounded shadow-md hover-animate focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-sm px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 shadow-md hover-animate focus:outline-none focus:ring-2 focus:ring-blue-400 no-underline"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-sm px-4 py-1 rounded bg-green-600 text-white hover:bg-green-700 shadow-md hover-animate focus:outline-none focus:ring-2 focus:ring-green-400 no-underline"
            >
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
