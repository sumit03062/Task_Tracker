
import React from 'react';
import { useProject } from '@/contexts/ProjectContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ProjectForm from '../projects/ProjectForm';

interface SidebarProps {
  activeProjectId: string | null;
  setActiveProjectId: (id: string | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeProjectId, setActiveProjectId }) => {
  const { projects } = useProject();
  const [open, setOpen] = React.useState(false);

  return (
    <div className="w-64 h-full border-r border-gray-200 bg-gray-50">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Projects</h2>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="h-8 w-8 p-0 rounded-full" disabled={projects.length >= 4}>
                <PlusIcon className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
              </DialogHeader>
              <ProjectForm onComplete={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
        
        {projects.length === 0 ? (
          <div className="text-sm text-gray-500 text-center py-8">
            <p>No projects yet</p>
            <p>Create your first project to get started</p>
          </div>
        ) : (
          <nav className="space-y-1">
            {projects.map((project) => (
              <Button
                key={project.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  activeProjectId === project.id ? "bg-gray-200" : ""
                )}
                onClick={() => setActiveProjectId(project.id)}
              >
                {project.title}
              </Button>
            ))}
          </nav>
        )}

        {projects.length >= 4 && (
          <p className="text-xs text-gray-500 mt-4 text-center">
            Project limit reached (4/4)
          </p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
