import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to={user ? (isAdmin ? '/admin' : '/dashboard') : '/login'} className="logo">
            BlogSpace
          </Link>
          
          {user && (
            <nav>
              <ul className="nav-links">
                {isAdmin ? (
                  <>
                    <li><Link to="/admin">Dashboard</Link></li>
                    <li><Link to="/admin/blogs/add">Add Blog</Link></li>
                    <li><Link to="/admin/users">Users</Link></li>
                  </>
                ) : (
                  <li><Link to="/dashboard">Dashboard</Link></li>
                )}
                <li>
                  <span>Welcome, {user.name || user.email}</span>
                </li>
                <li>
                  <button onClick={handleLogout} className="btn btn-secondary">
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          )}
          
          {!user && (
            <nav>
              <ul className="nav-links">
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;