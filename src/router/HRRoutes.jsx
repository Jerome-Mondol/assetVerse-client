import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUser } from '../api/userAPI';
import { Navigate } from 'react-router';
import { setJWT } from '../api/authAPI';

const HRRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const [allowed, setAllowed] = useState(null);
  const [checkingToken, setCheckingToken] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const init = async () => {
      if (loading) return;

      // if firebase user exists but no server token, try to fetch it
      if (user && !token) {
        try {
          await setJWT(user.email);
        } catch (e) {
          // ignore - setJWT shows alerts on failure
        }
      }

      if (!user) {
        setAllowed(false);
        setCheckingToken(false);
        return;
      }

      const checkRole = async () => {
        const fetched = await getUser(user.email);
        setAllowed(fetched?.role === 'hr');
        setCheckingToken(false);
      };

      checkRole();
    };

    init();
  }, [user, loading]);

  if (loading || allowed === null || checkingToken) return null;

  return allowed && localStorage.getItem('token') ? children : <Navigate to="/login" />;
};

export default HRRoutes;
