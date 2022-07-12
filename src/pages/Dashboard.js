import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, selectUser } from '../store/userSlice';

export default function Dashboard() {
  // Select data from store
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  // Navigate to login page if user is not exists
  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <h1>Dashboard</h1>

      <h2>
        Welcome {user.firstName} {user.lastName}
      </h2>

      <Link to="#" onClick={handleLogout}>
        Log out
      </Link>
    </>
  );
}
