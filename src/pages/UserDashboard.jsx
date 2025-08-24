import React from 'react';
import { useBlogs } from '../hooks/useApi';
import { useAuth } from '../context/AuthContext';
import BlogCard from '../components/BlogCard';
import LoadingSpinner from '../components/LoadingSpinner';

const UserDashboard = () => {
  const { user } = useAuth();
  const { blogs, loading, error } = useBlogs();

  if (loading) {
    return <LoadingSpinner message="Loading blog posts..." />;
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">
            Welcome, {user?.name || user?.email}!
          </h1>
          <p className="dashboard-subtitle">
            Discover and explore amazing blog posts from our community
          </p>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{blogs.length}</div>
            <div className="stat-label">Total Posts</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{blogs.filter(blog => {
              const today = new Date();
              const blogDate = new Date(blog.createdAt);
              const diffTime = Math.abs(today - blogDate);
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              return diffDays <= 7;
            }).length}</div>
            <div className="stat-label">This Week</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{new Set(blogs.map(blog => blog.author)).size}</div>
            <div className="stat-label">Authors</div>
          </div>
        </div>

        {error && (
          <div className="alert alert-error">
            Error loading blogs: {error}
          </div>
        )}

        {/* Blog Posts */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '2rem' }}>
            Latest Blog Posts
          </h2>
          
          {blogs.length > 0 ? (
            <div className="card-grid">
              {blogs
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((blog) => (
                  <BlogCard 
                    key={blog.id} 
                    blog={blog} 
                    showActions={false}
                  />
                ))}
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
              <h3>No Blog Posts Yet</h3>
              <p>There are no blog posts available at the moment. Check back later!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;