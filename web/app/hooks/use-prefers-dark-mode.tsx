import { useCallback, useEffect, useState } from 'react';

export function usePrefersDarkMode() {
  const [prefersDarkMode, setPrefersDarkMode] = useState(true);

  useEffect(() => {
    const darkMode =
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    setPrefersDarkMode(darkMode);
  }, []);

  useEffect(() => {
    if (prefersDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [prefersDarkMode]);

  const handleLocalStorageChanges = useCallback(() => {
    const theme = localStorage.getItem('theme');
    console.log('theme :>> ', theme);
    setPrefersDarkMode(theme === 'dark');
  }, []);

  useEffect(() => {
    window.addEventListener('storage', handleLocalStorageChanges, false);
    return () => {
      window.removeEventListener('storage', handleLocalStorageChanges, false);
    };
  }, [handleLocalStorageChanges]);

  const togglePrefersDarkMode = () => {
    const prefers =
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    localStorage.setItem('theme', prefers ? 'light' : 'dark');
    window.dispatchEvent(new Event('storage'));
  };

  return {
    prefersDarkMode,
    togglePrefersDarkMode,
  };
}
