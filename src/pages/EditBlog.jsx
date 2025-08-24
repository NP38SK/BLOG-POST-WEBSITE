import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlogs } from '../hooks/useApi';
import BlogForm from '../components/BlogForm';
import LoadingSpinner from '../components/LoadingSpinner';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateBlog, getBlogById } = useBlogs();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const foundBlog = await getBlogById(id);
        if (foundBlog) {
          setBlog(foundBlog);
        } else {
          setError('Blog post not found');
        }
      } catch (err) {
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [id]);

  const handleSubmit = async (blogData) => {
    const result = await updateBlog(id, blogData);
    if (result) {
      navigate('/admin', { 
        state: { 
          message: 'Blog post updated successfully!' 
        }
      });
    } else {
      throw new Error('Failed to update blog post');
    }
  };

  const handleCancel = () => {
    navigate('/admin');
  };

  if (loading) {
    return <LoadingSpinner message="Loading blog post..." />;
  }

  if (error) {
    return (
      <div className="container" style={{ padding: '2rem 0' }}>
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/admin')} className="btn">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <BlogForm 
        blog={blog}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isEditing={true}
      />
    </div>
  );
};

export default EditBlog;