import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tools from './pages/Tools';
import AuthGuard from './components/AuthGuard';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-800 dark:text-white transition-colors">
        <Header />
        <main className="min-h-[calc(100vh-56px)] bg-gray-100 dark:bg-gray-900 p-4">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <AuthGuard>
                  <Dashboard />
                </AuthGuard>
              }
            />
            <Route
              path="/tools"
              element={
                <AuthGuard>
                  <Tools />
                </AuthGuard>
              }
            />
            <Route path="*" element={<p>404 Page Not Found</p>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
