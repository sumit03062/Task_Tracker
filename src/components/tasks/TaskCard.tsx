
import React, { useState } from 'react';
import { useProject } from '@/contexts/ProjectContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrashIcon, PencilIcon, CheckCircleIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Task, TaskStatus } from '@/types';
import TaskForm from './TaskForm';
import { Badge } from '@/components/ui/badge';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { deleteTask, updateTask } = useProject();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleDeleteTask = () => {
    deleteTask(task.id);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not completed';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const handleToggleComplete = () => {
    const newStatus = task.status === TaskStatus.COMPLETED 
      ? TaskStatus.TODO 
      : TaskStatus.COMPLETED;
    updateTask({ ...task, status: newStatus });
  };

  const getStatusBadgeColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.TODO:
        return "bg-gray-200 text-gray-800 hover:bg-gray-300";
      case TaskStatus.IN_PROGRESS:
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case TaskStatus.REVIEW:
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case TaskStatus.COMPLETED:
        return "bg-green-100 text-green-800 hover:bg-green-200";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const getStatusText = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.TODO:
        return "To Do";
      case TaskStatus.IN_PROGRESS:
        return "In Progress";
      case TaskStatus.REVIEW:
        return "In Review";
      case TaskStatus.COMPLETED:
        return "Completed";
      default:
        return status;
    }
  };

  return (
    <Card className={`border-l-4 ${task.status === TaskStatus.COMPLETED ? 'border-l-green-500' : 'border-l-gray-300'}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-400 hover:text-green-500"
              onClick={handleToggleComplete}
            >
              <CheckCircleIcon className={`h-5 w-5 ${task.status === TaskStatus.COMPLETED ? 'text-green-500 fill-green-500' : ''}`} />
            </Button>
            <div>
              <h3 className={`font-medium ${task.status === TaskStatus.COMPLETED ? 'line-through text-gray-500' : ''}`}>
                {task.title}
              </h3>
              <CardDescription className="text-xs">
                Created: {formatDate(task.createdAt)}
              </CardDescription>
            </div>
          </div>
          
          <div className="flex space-x-1">
            <Badge className={`${getStatusBadgeColor(task.status)}`} onClick={() => setIsEditDialogOpen(true)}>
              {getStatusText(task.status)}
            </Badge>
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <PencilIcon className="h-3 w-3" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Task</DialogTitle>
                </DialogHeader>
                <TaskForm task={task} onComplete={() => setIsEditDialogOpen(false)} />
              </DialogContent>
            </Dialog>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-red-400 hover:text-red-600">
                  <TrashIcon className="h-3 w-3" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Task</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this task? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={handleDeleteTask}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm text-gray-600">{task.description}</p>
      </CardContent>
      {task.status === TaskStatus.COMPLETED && task.completedAt && (
        <CardFooter className="pt-0 pb-2">
          <p className="text-xs text-green-600">
            ✓ Completed on {formatDate(task.completedAt)}
          </p>
        </CardFooter>
      )}
    </Card>
  );
};

export default TaskCard;
