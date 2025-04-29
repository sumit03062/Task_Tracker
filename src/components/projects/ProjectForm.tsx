
import React, { useState } from 'react';
import { useProject } from '@/contexts/ProjectContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Project } from '@/types';

interface ProjectFormProps {
  project?: Project;
  onComplete?: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onComplete }) => {
  const [title, setTitle] = useState(project?.title || '');
  const [description, setDescription] = useState(project?.description || '');
  const { createProject, updateProject, isLoading } = useProject();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (project) {
        await updateProject({ ...project, title, description });
      } else {
        await createProject(title, description);
      }
      if (onComplete) onComplete();
    } catch (error) {
      console.error('Failed to save project:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Project Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter project title"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your project"
          required
          rows={4}
        />
      </div>
      <Button 
        type="submit" 
        className="w-full bg-brand-purple hover:bg-opacity-90"
        disabled={isLoading}
      >
        {isLoading ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
      </Button>
    </form>
  );
};

export default ProjectForm;
