// File service for handling JSON data persistence
class FileService {
  constructor() {
    this.initializeData();
  }

  // Initialize data if it doesn't exist
  initializeData() {
    // Check if we have data in localStorage, if not, create initial data
    if (!localStorage.getItem('blogUsers')) {
      localStorage.setItem('blogUsers', JSON.stringify([]));
    }
    
    if (!localStorage.getItem('blogBlogs')) {
      const initialBlogs = [
        {
          id: '1',
          title: 'Welcome to Our Blog Platform!',
          content: 'Welcome to our amazing blog platform! This is your first sample blog post. Here you can discover incredible content created by our community of writers, thinkers, and creators. Whether you\'re here to read inspiring stories or share your own thoughts, you\'ve come to the right place.',
          author: 'Admin',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Getting Started with Modern Web Development',
          content: 'Modern web development has transformed the way we build applications. With frameworks like React, Vue, and Angular, developers can create powerful, interactive user experiences. This post covers the fundamentals of modern web development, including component-based architecture, state management, and responsive design principles.',
          author: 'Admin',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '3',
          title: 'The Art of Clean Code',
          content: 'Writing clean, maintainable code is both an art and a science. In this comprehensive guide, we explore best practices for writing code that is not only functional but also readable, testable, and scalable. Learn about naming conventions, function design, commenting strategies, and architectural patterns that make your code shine.',
          author: 'Admin',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('blogBlogs', JSON.stringify(initialBlogs));
    }
  }

  // Users operations
  async getUsers() {
    try {
      const users = localStorage.getItem('blogUsers');
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error('Error getting users:', error);
      return [];
    }
  }

  async saveUser(user) {
    try {
      const users = await this.getUsers();
      
      // Check if user already exists
      const existingUserIndex = users.findIndex(u => u.email === user.email);
      if (existingUserIndex !== -1) {
        return { success: false, error: 'User with this email already exists' };
      }

      // Add new user
      const newUser = {
        id: Date.now().toString(),
        ...user,
        createdAt: new Date().toISOString()
      };
      
      users.push(newUser);
      localStorage.setItem('blogUsers', JSON.stringify(users));
      
      console.log('User registered successfully:', { email: newUser.email, name: newUser.name });
      return { success: true, user: newUser };
    } catch (error) {
      console.error('Error saving user:', error);
      return { success: false, error: 'Failed to save user' };
    }
  }

  async authenticateUser(email, password) {
    try {
      const users = await this.getUsers();
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        // Return user without password
        const { password: _, ...userWithoutPassword } = user;
        console.log('User authenticated successfully:', userWithoutPassword.email);
        return { success: true, user: userWithoutPassword };
      } else {
        console.log('Authentication failed for:', email);
        return { success: false, error: 'Invalid email or password' };
      }
    } catch (error) {
      console.error('Error authenticating user:', error);
      return { success: false, error: 'Authentication failed' };
    }
  }

  async deleteUser(userId) {
    try {
      const users = await this.getUsers();
      const filteredUsers = users.filter(u => u.id !== userId);
      localStorage.setItem('blogUsers', JSON.stringify(filteredUsers));
      return { success: true };
    } catch (error) {
      console.error('Error deleting user:', error);
      return { success: false, error: 'Failed to delete user' };
    }
  }

  // Blogs operations
  async getBlogs() {
    try {
      const blogs = localStorage.getItem('blogBlogs');
      return blogs ? JSON.parse(blogs) : [];
    } catch (error) {
      console.error('Error getting blogs:', error);
      return [];
    }
  }

  async saveBlog(blog) {
    try {
      const blogs = await this.getBlogs();
      const newBlog = {
        id: Date.now().toString(),
        ...blog,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      blogs.push(newBlog);
      localStorage.setItem('blogBlogs', JSON.stringify(blogs));
      
      console.log('Blog saved successfully:', newBlog.title);
      return { success: true, blog: newBlog };
    } catch (error) {
      console.error('Error saving blog:', error);
      return { success: false, error: 'Failed to save blog' };
    }
  }

  async updateBlog(blogId, updates) {
    try {
      const blogs = await this.getBlogs();
      const blogIndex = blogs.findIndex(b => b.id === blogId);
      
      if (blogIndex === -1) {
        return { success: false, error: 'Blog not found' };
      }

      blogs[blogIndex] = {
        ...blogs[blogIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };

      localStorage.setItem('blogBlogs', JSON.stringify(blogs));
      
      console.log('Blog updated successfully:', blogs[blogIndex].title);
      return { success: true, blog: blogs[blogIndex] };
    } catch (error) {
      console.error('Error updating blog:', error);
      return { success: false, error: 'Failed to update blog' };
    }
  }

  async deleteBlog(blogId) {
    try {
      const blogs = await this.getBlogs();
      const filteredBlogs = blogs.filter(b => b.id !== blogId);
      localStorage.setItem('blogBlogs', JSON.stringify(filteredBlogs));
      
      console.log('Blog deleted successfully');
      return { success: true };
    } catch (error) {
      console.error('Error deleting blog:', error);
      return { success: false, error: 'Failed to delete blog' };
    }
  }

  async getBlogById(blogId) {
    try {
      const blogs = await this.getBlogs();
      const blog = blogs.find(b => b.id === blogId);
      return blog || null;
    } catch (error) {
      console.error('Error getting blog by ID:', error);
      return null;
    }
  }

  // Debug methods
  async debugData() {
    const users = await this.getUsers();
    const blogs = await this.getBlogs();
    console.log('=== DEBUG DATA ===');
    console.log('Users:', users);
    console.log('Blogs:', blogs);
    console.log('==================');
  }

  // Clear all data (for testing)
  async clearAllData() {
    localStorage.removeItem('blogUsers');
    localStorage.removeItem('blogBlogs');
    localStorage.removeItem('blogUser');
    this.initializeData();
    console.log('All data cleared and reinitialized');
  }
}

export default new FileService();