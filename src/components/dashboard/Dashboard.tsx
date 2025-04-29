
import React, { useState } from 'react';
import { useProject } from '@/contexts/ProjectContext';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from '../layout/Sidebar';
import ProjectCard from '../projects/ProjectCard';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ProjectForm from '../projects/ProjectForm';

const Dashboard: React.FC = () => {
  const { projects } = useProject();
  const { user } = useAuth();
  const [activeProjectId, setActiveProjectId] = useState<string | null>(
    projects.length > 0 ? projects[0].id : null
  );
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false);

  const activeProject = projects.find(p => p.id === activeProjectId);

  return (
    <div className="h-[calc(100vh-64px)] flex">
      <Sidebar 
        activeProjectId={activeProjectId} 
        setActiveProjectId={setActiveProjectId} 
      />
      <main className="flex-1 overflow-auto p-6">
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-center max-w-md">
              <h2 className="text-2xl font-bold mb-2">Welcome to Task Tracker, {user?.name}!</h2>
              <p className="text-gray-600 mb-6">
                Get started by creating your first project. You can track tasks, set priorities, and monitor your progress.
              </p>
              <Dialog open={isNewProjectDialogOpen} onOpenChange={setIsNewProjectDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-brand-purple hover:bg-opacity-90">
                    Create Your First Project
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Project</DialogTitle>
                  </DialogHeader>
                  <ProjectForm onComplete={() => setIsNewProjectDialogOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ) : activeProject ? (
          <ProjectCard project={activeProject} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Select a project from the sidebar</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
