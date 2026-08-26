import { useCallback } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export function useActivityLogger() {
  const logActivity = useCallback(async (action: string, details?: any) => {
    const token = localStorage.getItem('auth_token');
    const isAdmin = localStorage.getItem('auth_is_admin') === 'true';
    if (!token || isAdmin) return; // Only log if logged in and NOT an admin

    try {
      await fetch('/api/activity/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ action, details })
      });
    } catch (err) {
      console.error('Failed to log activity:', err);
    }
  }, []);

  return { logActivity };
}
