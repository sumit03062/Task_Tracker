
import React, { useState } from 'react';
import { useProject } from '@/contexts/ProjectContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Task, TaskStatus } from '@/types';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface TaskFormProps {
  projectId?: string;
  task?: Task;
  onComplete?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ projectId, task, onComplete }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [status, setStatus] = useState<TaskStatus>(task?.status || TaskStatus.TODO);
  const { createTask, updateTask, isLoading } = useProject();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (task) {
        await updateTask({ ...task, title, description, status });
      } else if (projectId) {
        await createTask(projectId, title, description);
      }
      if (onComplete) onComplete();
    } catch (error) {
      console.error('Failed to save task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Task Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the task"
          required
          rows={3}
        />
      </div>

      {task && (
        <div className="space-y-2">
          <Label>Status</Label>
          <RadioGroup value={status} onValueChange={(value) => setStatus(value as TaskStatus)} className="flex flex-wrap gap-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={TaskStatus.TODO} id="todo" />
              <Label htmlFor="todo" className="cursor-pointer text-sm">To Do</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={TaskStatus.IN_PROGRESS} id="in-progress" />
              <Label htmlFor="in-progress" className="cursor-pointer text-sm">In Progress</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={TaskStatus.REVIEW} id="review" />
              <Label htmlFor="review" className="cursor-pointer text-sm">Review</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={TaskStatus.COMPLETED} id="completed" />
              <Label htmlFor="completed" className="cursor-pointer text-sm">Completed</Label>
            </div>
          </RadioGroup>
        </div>
      )}
      
      <Button 
        type="submit" 
        className="w-full bg-brand-teal hover:bg-opacity-90"
        disabled={isLoading}
      >
        {isLoading ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
      </Button>
    </form>
  );
};

export default TaskForm;
