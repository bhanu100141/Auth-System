import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '@/features/auth/authSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast, Toaster } from 'sonner';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: { email: string; password: string }) => u.email === email);

    if (!user) {
      toast.error('User not found');
      return;
    }

    if (user.password !== password) {
      toast.error('Incorrect password');
      return;
    }

    const token = Math.random().toString(36).substring(2);
    localStorage.setItem('user', JSON.stringify(user));

    dispatch(login({ email, password, token, user }));
    toast.success('Login successful! Redirecting...');

    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="login-wrapper px-4">
      <div className="login-card max-w-md mx-auto mt-20 p-8 border border-gray-300 rounded-lg shadow-lg bg-white text-black animate-fadeIn transition-opacity duration-700 ease-out">
        <Toaster position="top-right" />
        <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
        <form onSubmit={handleLogin} className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="email" className="block text-gray-800 font-medium">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all duration-300 ease-in-out"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="block text-gray-800 font-medium">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all duration-300 ease-in-out"
            />
          </div>

          <div>
            <Button
              type="submit"
              className="w-full py-3 font-semibold bg-blue-600 hover:bg-blue-700 shadow-md transition-transform duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400"
            >
              Log In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
