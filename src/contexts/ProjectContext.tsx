
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Task, TaskStatus } from '@/types';
import { useAuth } from './AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface ProjectContextType {
  projects: Project[];
  tasks: Task[];
  createProject: (title: string, description: string) => Promise<void>;
  updateProject: (project: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  getProjectById: (id: string) => Project | undefined;
  createTask: (projectId: string, title: string, description: string) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  getTaskById: (id: string) => Task | undefined;
  getTasksByProject: (projectId: string) => Task[];
  isLoading: boolean;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Load initial data
  useEffect(() => {
    if (user) {
      // Load from localStorage or could be API call in a real app
      const storedProjects = localStorage.getItem(`projects_${user.id}`);
      const storedTasks = localStorage.getItem(`tasks_${user.id}`);
      
      if (storedProjects) {
        setProjects(JSON.parse(storedProjects));
      }
      
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } else {
      setProjects([]);
      setTasks([]);
    }
  }, [user]);

  // Save data on change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`projects_${user.id}`, JSON.stringify(projects));
    }
  }, [projects, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`tasks_${user.id}`, JSON.stringify(tasks));
    }
  }, [tasks, user]);

  const createProject = async (title: string, description: string) => {
    if (!user) return;

    if (projects.length >= 4) {
      toast({
        title: "Project limit reached",
        description: "You can only have up to 4 projects.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newProject: Project = {
        id: Math.random().toString(36).substr(2, 9),
        title,
        description,
        createdAt: new Date().toISOString(),
        userId: user.id
      };
      
      setProjects(prev => [...prev, newProject]);
      
      toast({
        title: "Project created",
        description: "Your new project has been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Failed to create project",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateProject = async (project: Project) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProjects(prev => 
        prev.map(p => p.id === project.id ? project : p)
      );
      
      toast({
        title: "Project updated",
        description: "Your project has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Failed to update project",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProjects(prev => prev.filter(p => p.id !== id));
      
      // Also delete associated tasks
      setTasks(prev => prev.filter(t => t.projectId !== id));
      
      toast({
        title: "Project deleted",
        description: "Your project has been deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Failed to delete project",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getProjectById = (id: string) => {
    return projects.find(p => p.id === id);
  };

  const createTask = async (projectId: string, title: string, description: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newTask: Task = {
        id: Math.random().toString(36).substr(2, 9),
        title,
        description,
        status: TaskStatus.TODO,
        projectId,
        createdAt: new Date().toISOString(),
        completedAt: null
      };
      
      setTasks(prev => [...prev, newTask]);
      
      toast({
        title: "Task created",
        description: "Your new task has been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Failed to create task",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateTask = async (task: Task) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setTasks(prev => 
        prev.map(t => {
          if (t.id === task.id) {
            // If the status is being changed to COMPLETED, update completedAt
            if (t.status !== TaskStatus.COMPLETED && task.status === TaskStatus.COMPLETED) {
              return { ...task, completedAt: new Date().toISOString() };
            }
            // If the status is being changed from COMPLETED, clear completedAt
            if (t.status === TaskStatus.COMPLETED && task.status !== TaskStatus.COMPLETED) {
              return { ...task, completedAt: null };
            }
            return task;
          }
          return t;
        })
      );
      
      toast({
        title: "Task updated",
        description: "Your task has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Failed to update task",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setTasks(prev => prev.filter(t => t.id !== id));
      
      toast({
        title: "Task deleted",
        description: "Your task has been deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Failed to delete task",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getTaskById = (id: string) => {
    return tasks.find(t => t.id === id);
  };

  const getTasksByProject = (projectId: string) => {
    return tasks.filter(t => t.projectId === projectId);
  };

  return (
    <ProjectContext.Provider 
      value={{ 
        projects, 
        tasks, 
        createProject, 
        updateProject, 
        deleteProject, 
        getProjectById,
        createTask,
        updateTask,
        deleteTask,
        getTaskById,
        getTasksByProject,
        isLoading
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
