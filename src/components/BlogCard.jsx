import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog, onDelete, showActions = false }) => {
  const { isAdmin } = useAuth();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substr(0, maxLength) + '...';
  };

  return (
    <div className="card blog-card">
      <div className="blog-meta">
        <span>By {blog.author}</span>
        <span>{formatDate(blog.createdAt)}</span>
      </div>
      
      <h3 className="blog-title">{blog.title}</h3>
      
      <div className="blog-content">
        <p>{truncateContent(blog.content)}</p>
      </div>
      
      {showActions && isAdmin && (
        <div className="blog-actions">
          <Link to={`/admin/blogs/edit/${blog.id}`} className="btn btn-secondary">
            Edit
          </Link>
          <button 
            onClick={() => onDelete(blog.id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      )}
      
      {blog.updatedAt && blog.updatedAt !== blog.createdAt && (
        <div className="blog-meta" style={{ marginTop: '1rem', fontSize: '0.8rem', opacity: 0.7 }}>
          <span>Last updated: {formatDate(blog.updatedAt)}</span>
        </div>
      )}
    </div>
  );
};

export default BlogCard;