import React, { useState } from 'react';
import FileService from '../services/fileService';

const DebugPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [debugData, setDebugData] = useState({ users: [], blogs: [] });

  const loadDebugData = async () => {
    const users = await FileService.getUsers();
    const blogs = await FileService.getBlogs();
    setDebugData({ users, blogs });
  };

  const clearAllData = async () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      await FileService.clearAllData();
      await loadDebugData();
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      loadDebugData();
    }
  }, [isOpen]);

  if (!isOpen) {
    return (
      <div style={{ 
        position: 'fixed', 
        bottom: '20px', 
        right: '20px', 
        zIndex: 1000 
      }}>
        <button 
          onClick={() => setIsOpen(true)}
          style={{
            background: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            cursor: 'pointer',
            fontSize: '18px'
          }}
        >
          🐛
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '20px', 
      right: '20px', 
      zIndex: 1000,
      background: 'rgba(0, 0, 0, 0.9)',
      color: 'white',
      padding: '20px',
      borderRadius: '10px',
      maxWidth: '400px',
      maxHeight: '500px',
      overflow: 'auto',
      fontSize: '12px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <h3>Debug Panel</h3>
        <button 
          onClick={() => setIsOpen(false)}
          style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
        >
          ✕
        </button>
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <button 
          onClick={loadDebugData}
          style={{ 
            background: '#28a745', 
            color: 'white', 
            border: 'none', 
            padding: '5px 10px', 
            borderRadius: '3px',
            marginRight: '10px',
            cursor: 'pointer'
          }}
        >
          Refresh Data
        </button>
        <button 
          onClick={clearAllData}
          style={{ 
            background: '#dc3545', 
            color: 'white', 
            border: 'none', 
            padding: '5px 10px', 
            borderRadius: '3px',
            cursor: 'pointer'
          }}
        >
          Clear All Data
        </button>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <h4>Users ({debugData.users.length})</h4>
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.1)', 
          padding: '10px', 
          borderRadius: '5px',
          maxHeight: '150px',
          overflow: 'auto'
        }}>
          {debugData.users.length > 0 ? (
            debugData.users.map(user => (
              <div key={user.id} style={{ marginBottom: '5px' }}>
                <strong>{user.name}</strong> - {user.email}
              </div>
            ))
          ) : (
            <div>No users registered</div>
          )}
        </div>
      </div>

      <div>
        <h4>Blogs ({debugData.blogs.length})</h4>
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.1)', 
          padding: '10px', 
          borderRadius: '5px',
          maxHeight: '150px',
          overflow: 'auto'
        }}>
          {debugData.blogs.length > 0 ? (
            debugData.blogs.map(blog => (
              <div key={blog.id} style={{ marginBottom: '5px' }}>
                <strong>{blog.title}</strong> by {blog.author}
              </div>
            ))
          ) : (
            <div>No blogs found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DebugPanel;