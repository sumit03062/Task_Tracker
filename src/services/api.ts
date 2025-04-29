
import { AuthUser, Project, Task, TaskStatus } from '@/types';

const API_URL = '/api';

// Auth API calls
export const authAPI = {
  login: async (email: string, password: string): Promise<AuthUser> => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const data = await response.json();
    return { ...data.user };
  },

  signup: async (name: string, email: string, password: string, country: string): Promise<AuthUser> => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, country }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Signup failed');
    }

    const data = await response.json();
    return { ...data.user };
  },

  getProfile: async (token: string): Promise<AuthUser> => {
    const response = await fetch(`${API_URL}/auth/profile`, {
      headers: { 
        'Authorization': `Bearer ${token}` 
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get profile');
    }

    const data = await response.json();
    return { ...data.user, token };
  }
};

// Project API calls
export const projectAPI = {
  getProjects: async (token: string): Promise<Project[]> => {
    const response = await fetch(`${API_URL}/projects`, {
      headers: { 
        'Authorization': `Bearer ${token}` 
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }

    const data = await response.json();
    return data.projects;
  },

  createProject: async (token: string, title: string, description: string): Promise<Project> => {
    const response = await fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ title, description }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create project');
    }

    const data = await response.json();
    return data.project;
  },

  updateProject: async (token: string, project: Project): Promise<Project> => {
    const response = await fetch(`${API_URL}/projects/${project.id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ title: project.title, description: project.description }),
    });

    if (!response.ok) {
      throw new Error('Failed to update project');
    }

    const data = await response.json();
    return data.project;
  },

  deleteProject: async (token: string, id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${token}` 
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete project');
    }
  }
};

// Task API calls
export const taskAPI = {
  getTasks: async (token: string): Promise<Task[]> => {
    const response = await fetch(`${API_URL}/tasks`, {
      headers: { 
        'Authorization': `Bearer ${token}` 
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }

    const data = await response.json();
    return data.tasks;
  },

  getTasksByProject: async (token: string, projectId: string): Promise<Task[]> => {
    const response = await fetch(`${API_URL}/tasks/${projectId}`, {
      headers: { 
        'Authorization': `Bearer ${token}` 
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch project tasks');
    }

    const data = await response.json();
    return data.tasks;
  },

  createTask: async (
    token: string, 
    projectId: string, 
    title: string, 
    description: string
  ): Promise<Task> => {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ projectId, title, description }),
    });

    if (!response.ok) {
      throw new Error('Failed to create task');
    }

    const data = await response.json();
    return data.task;
  },

  updateTask: async (token: string, task: Task): Promise<Task> => {
    const response = await fetch(`${API_URL}/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ 
        title: task.title, 
        description: task.description,
        status: task.status 
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update task');
    }

    const data = await response.json();
    return data.task;
  },

  deleteTask: async (token: string, id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${token}` 
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
  }
};
