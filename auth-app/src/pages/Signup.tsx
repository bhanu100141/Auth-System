import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup, login } from '@/features/auth/authSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast, Toaster } from 'sonner';

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error('All fields are required');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.find((u: { email: string }) => u.email === email)) {
      toast.error('User with this email already exists');
      return;
    }

    const newUser = { id: Date.now().toString(), name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('user', JSON.stringify(newUser));

    const token = Math.random().toString(36).substring(2);

    dispatch(signup(newUser));
    dispatch(login({ email, password, token, user: newUser }));

    toast.success('Signup successful! Redirecting...');
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="signup-wrapper px-4">
      <div
        className="signup-card max-w-md mx-auto mt-20 p-8 border border-gray-300 rounded-xl shadow-xl bg-white text-gray-900 animate-fadeInUp transition-all duration-700 ease-in-out"
        style={{ animationDuration: '0.8s' }}
      >
        <Toaster position="top-right" />
        <h2 className="text-3xl font-extrabold mb-8 text-center tracking-wide text-green-700">
          Create Account
        </h2>
        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <Label htmlFor="name" className="block mb-2 text-sm font-semibold text-gray-700 tracking-wide">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              className="border-gray-300 focus:border-green-600 focus:ring-4 focus:ring-green-200 rounded-md transition-all duration-300 ease-in-out placeholder:text-gray-400 shadow-sm hover:shadow-md"
            />
          </div>

          <div>
            <Label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-700 tracking-wide">
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
              className="border-gray-300 focus:border-green-600 focus:ring-4 focus:ring-green-200 rounded-md transition-all duration-300 ease-in-out placeholder:text-gray-400 shadow-sm hover:shadow-md"
            />
          </div>

          <div>
            <Label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-700 tracking-wide">
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
              autoComplete="new-password"
              className="border-gray-300 focus:border-green-600 focus:ring-4 focus:ring-green-200 rounded-md transition-all duration-300 ease-in-out placeholder:text-gray-400 shadow-sm hover:shadow-md"
            />
          </div>

          <Button
            type="submit"
            className="w-full py-3 font-semibold text-white bg-green-600 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:bg-green-700 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400"
          >
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
}
