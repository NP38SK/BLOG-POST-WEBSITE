// API service for handling JSON file operations
class ApiService {
  constructor() {
    this.USERS_KEY = 'blogUsers';
    this.BLOGS_KEY = 'blogBlogs';
  }

  // Users API
  async getUsers() {
    try {
      const users = localStorage.getItem(this.USERS_KEY);
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error('Error getting users:', error);
      return [];
    }
  }

  async saveUsers(users) {
    try {
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
      await this.updateUsersJsonFile(users);
      return true;
    } catch (error) {
      console.error('Error saving users:', error);
      return false;
    }
  }

  // Update the JSON files for display purposes
  async updateUsersJsonFile(users) {
    try {
      // This simulates updating the users.json file
      console.log('Users data updated:', users);
      // In a real implementation, this would write to the actual file
    } catch (error) {
      console.error('Error updating users file:', error);
    }
  }

  async getUserById(id) {
    const users = await this.getUsers();
    return users.find(user => user.id === id);
  }

  async deleteUser(id) {
    try {
      const users = await this.getUsers();
      const filteredUsers = users.filter(user => user.id !== id);
      return await this.saveUsers(filteredUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  }

  // Blogs API
  async getBlogs() {
    try {
      const blogs = localStorage.getItem(this.BLOGS_KEY);
      return blogs ? JSON.parse(blogs) : [];
    } catch (error) {
      console.error('Error getting blogs:', error);
      return [];
    }
  }

  async saveBlogs(blogs) {
    try {
      localStorage.setItem(this.BLOGS_KEY, JSON.stringify(blogs));
      await this.updateBlogsJsonFile(blogs);
      return true;
    } catch (error) {
      console.error('Error saving blogs:', error);
      return false;
    }
  }

  async getBlogById(id) {
    const blogs = await this.getBlogs();
    return blogs.find(blog => blog.id === id);
  }

  async addBlog(blogData) {
    try {
      const blogs = await this.getBlogs();
      const newBlog = {
        id: Date.now().toString(),
        ...blogData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      blogs.push(newBlog);
      const success = await this.saveBlogs(blogs);
      return success ? newBlog : null;
    } catch (error) {
      console.error('Error adding blog:', error);
      return null;
    }
  }

  async updateBlog(id, blogData) {
    try {
      const blogs = await this.getBlogs();
      const blogIndex = blogs.findIndex(blog => blog.id === id);
      
      if (blogIndex === -1) {
        return null;
      }

      blogs[blogIndex] = {
        ...blogs[blogIndex],
        ...blogData,
        updatedAt: new Date().toISOString()
      };

      const success = await this.saveBlogs(blogs);
      return success ? blogs[blogIndex] : null;
    } catch (error) {
      console.error('Error updating blog:', error);
      return null;
    }
  }

  async deleteBlog(id) {
    try {
      const blogs = await this.getBlogs();
      const filteredBlogs = blogs.filter(blog => blog.id !== id);
      return await this.saveBlogs(filteredBlogs);
    } catch (error) {
      console.error('Error deleting blog:', error);
      return false;
    }
  }

  // Initialize with sample data if no data exists
  async initializeSampleData() {
    const blogs = await this.getBlogs();
    if (blogs.length === 0) {
      const sampleBlogs = [
        {
          id: '1',
          title: 'Welcome to Our Blog!',
          content: 'This is your first blog post. Welcome to our amazing blog platform where you can share your thoughts and ideas with the world! Here you can discover amazing content created by our community of writers and thinkers.',
          author: 'Admin',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Getting Started with React',
          content: 'React is a powerful JavaScript library for building user interfaces. In this post, we will explore the basics of React and how to get started with your first component. Learn about JSX, components, props, and state management.',
          author: 'Admin',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '3',
          title: 'The Power of Modern Web Development',
          content: 'Modern web development has evolved tremendously over the past decade. From simple static websites to complex single-page applications, the tools and technologies available to developers have grown exponentially. This post explores the current landscape and future trends.',
          author: 'Admin',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      await this.saveBlogs(sampleBlogs);
      await this.updateBlogsJsonFile(sampleBlogs);
    }
  }

  // Update the JSON files for display purposes
  async updateBlogsJsonFile(blogs) {
    try {
      // This simulates updating the blogs.json file
      console.log('Blogs data updated:', blogs);
      // In a real implementation, this would write to the actual file
    } catch (error) {
      console.error('Error updating blogs file:', error);
    }
  }
}

export default new ApiService();