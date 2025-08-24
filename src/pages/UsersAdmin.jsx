import React from 'react';
import { Link } from 'react-router-dom';
import { useUsers } from '../hooks/useApi';
import UserList from '../components/UserList';
import LoadingSpinner from '../components/LoadingSpinner';

const UsersAdmin = () => {
  const { users, loading, deleteUser } = useUsers();

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      const success = await deleteUser(userId);
      if (!success) {
        alert('Failed to delete user');
      }
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading users..." />;
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">
            User Management
          </h1>
          <p className="dashboard-subtitle">
            Manage registered users and their accounts
          </p>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{users.length}</div>
            <div className="stat-label">Total Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{users.filter(user => {
              const today = new Date();
              const userDate = new Date(user.createdAt);
              const diffTime = Math.abs(today - userDate);
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              return diffDays <= 7;
            }).length}</div>
            <div className="stat-label">This Week</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{users.filter(user => {
              const today = new Date();
              const userDate = new Date(user.createdAt);
              const diffTime = Math.abs(today - userDate);
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              return diffDays <= 30;
            }).length}</div>
            <div className="stat-label">This Month</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{users.filter(user => {
              const today = new Date();
              const userDate = new Date(user.createdAt);
              return userDate.toDateString() === today.toDateString();
            }).length}</div>
            <div className="stat-label">Today</div>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <Link to="/admin" className="btn btn-secondary">
            Back to Dashboard
          </Link>
        </div>

        {/* Users List */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ color: 'white' }}>
              Registered Users ({users.length})
            </h2>
          </div>
          
          <UserList 
            users={users}
            onDeleteUser={handleDeleteUser}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default UsersAdmin;