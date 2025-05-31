// src/components/ThemeToggle.tsx
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

const ThemeToggle = () => {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const html = document.documentElement;
    if (dark) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <Button variant="outline" onClick={() => setDark(!dark)}>
      {dark ? '🌙 Dark' : '☀️ Light'}
    </Button>
  );
};

export default ThemeToggle;
