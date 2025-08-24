import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlogs } from '../hooks/useApi';
import BlogForm from '../components/BlogForm';

const AddBlog = () => {
  const navigate = useNavigate();
  const { addBlog } = useBlogs();

  const handleSubmit = async (blogData) => {
    const result = await addBlog(blogData);
    if (result) {
      navigate('/admin', { 
        state: { 
          message: 'Blog post created successfully!' 
        }
      });
    } else {
      throw new Error('Failed to create blog post');
    }
  };

  const handleCancel = () => {
    navigate('/admin');
  };

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <BlogForm 
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isEditing={false}
      />
    </div>
  );
};

export default AddBlog;