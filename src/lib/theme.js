import React from 'react';

const listeners = new Set();

function getInitial() {
  const stored = localStorage.getItem('tr_theme');
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

let currentTheme = 'dark'; // default until init

function applyTheme(theme) {
  currentTheme = theme;
  document.documentElement.classList.toggle('dark', theme === 'dark');
  localStorage.setItem('tr_theme', theme);
  listeners.forEach((fn) => fn(theme));
}

// Init on load
if (typeof window !== 'undefined') {
  applyTheme(getInitial());
}

export function getTheme() { return currentTheme; }

export function toggleTheme() {
  applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

export function useTheme() {
  const [theme, setTheme] = React.useState(currentTheme);
  React.useEffect(() => {
    listeners.add(setTheme);
    return () => listeners.delete(setTheme);
  }, []);
  return theme;
}