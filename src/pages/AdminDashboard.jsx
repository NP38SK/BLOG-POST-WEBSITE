import React from 'react';
import { Link } from 'react-router-dom';
import { useBlogs, useUsers } from '../hooks/useApi';
import { useAuth } from '../context/AuthContext';
import BlogCard from '../components/BlogCard';
import LoadingSpinner from '../components/LoadingSpinner';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { blogs, loading: blogsLoading, deleteBlog } = useBlogs();
  const { users, loading: usersLoading } = useUsers();

  const handleDeleteBlog = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      const success = await deleteBlog(blogId);
      if (!success) {
        alert('Failed to delete blog post');
      }
    }
  };

  if (blogsLoading || usersLoading) {
    return <LoadingSpinner message="Loading dashboard..." />;
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">
            Admin Dashboard
          </h1>
          <p className="dashboard-subtitle">
            Manage your blog posts and users
          </p>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{blogs.length}</div>
            <div className="stat-label">Total Blogs</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{users.length}</div>
            <div className="stat-label">Registered Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{blogs.filter(blog => {
              const today = new Date();
              const blogDate = new Date(blog.createdAt);
              const diffTime = Math.abs(today - blogDate);
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              return diffDays <= 7;
            }).length}</div>
            <div className="stat-label">Blogs This Week</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{users.filter(user => {
              const today = new Date();
              const userDate = new Date(user.createdAt);
              const diffTime = Math.abs(today - userDate);
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              return diffDays <= 7;
            }).length}</div>
            <div className="stat-label">New Users This Week</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ color: 'white', marginBottom: '2rem' }}>Quick Actions</h2>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/admin/blogs/add" className="btn">
              Add New Blog
            </Link>
            <Link to="/admin/users" className="btn btn-secondary">
              Manage Users
            </Link>
          </div>
        </div>

        {/* Recent Blogs */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ color: 'white' }}>
              Blog Posts ({blogs.length})
            </h2>
            <Link to="/admin/blogs/add" className="btn">
              Add New Blog
            </Link>
          </div>
          
          {blogs.length > 0 ? (
            <div className="card-grid">
              {blogs
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((blog) => (
                  <BlogCard 
                    key={blog.id} 
                    blog={blog} 
                    onDelete={handleDeleteBlog}
                    showActions={true}
                  />
                ))}
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
              <h3>No Blog Posts Yet</h3>
              <p>Start by creating your first blog post!</p>
              <Link to="/admin/blogs/add" className="btn" style={{ marginTop: '1rem' }}>
                Create First Blog
              </Link>
            </div>
          )}
        </div>

        {/* Recent Users */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ color: 'white' }}>
              Recent Users ({users.length})
            </h2>
            <Link to="/admin/users" className="btn btn-secondary">
              View All Users
            </Link>
          </div>
          
          {users.length > 0 ? (
            <div className="card">
              <div style={{ overflowX: 'auto' }}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Registration Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users
                      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                      .slice(0, 5)
                      .map((user) => (
                        <tr key={user.id}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
              <h3>No Users Registered</h3>
              <p>No users have registered yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;