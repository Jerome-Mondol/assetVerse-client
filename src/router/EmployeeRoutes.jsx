import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUser } from '../api/userAPI';
import { Navigate } from 'react-router';

const EmployeeRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const [allowed, setAllowed] = useState(null);
  const token = localStorage.getItem('token');
  

  useEffect(() => {
    if (loading) return;
    if (!user) {
      setAllowed(false);
      return;
    }

    const checkRole = async () => {
      const fetched = await getUser(user.email);
      setAllowed(fetched?.role === 'employee');
    };

    checkRole();
  }, [user, loading]);

  if (loading || allowed === null) return null;

  return allowed && token ? children : <Navigate to="/login" />;
};

export default EmployeeRoutes;
