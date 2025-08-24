import { useState, useEffect } from 'react';
import FileService from '../services/fileService';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await FileService.getUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      const result = await FileService.deleteUser(id);
      if (result.success) {
        await fetchUsers(); // Refresh the list
        return true;
      }
      return false;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error, refetch: fetchUsers, deleteUser };
};

export const useBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await FileService.getBlogs();
      setBlogs(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addBlog = async (blogData) => {
    try {
      const result = await FileService.saveBlog(blogData);
      if (result.success) {
        await fetchBlogs(); // Refresh the list
        return result.blog;
      }
      return null;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  const updateBlog = async (id, blogData) => {
    try {
      const result = await FileService.updateBlog(id, blogData);
      if (result.success) {
        await fetchBlogs(); // Refresh the list
        return result.blog;
      }
      return null;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  const deleteBlog = async (id) => {
    try {
      const result = await FileService.deleteBlog(id);
      if (result.success) {
        await fetchBlogs(); // Refresh the list
        return true;
      }
      return false;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const getBlogById = async (id) => {
    try {
      const blog = await FileService.getBlogById(id);
      return blog;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return { 
    blogs, 
    loading, 
    error, 
    refetch: fetchBlogs, 
    addBlog, 
    updateBlog, 
    deleteBlog, 
    getBlogById 
  };
};