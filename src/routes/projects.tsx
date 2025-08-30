import { createFileRoute, useNavigate, Outlet } from '@tanstack/react-router';
import { Box, Heading } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useProjectStore } from '../app/store/projectStore';
import { ProjectForm, ProjectList } from '../features/projects';

export const Route = createFileRoute('/projects')({
  // For this specific route, bundle the component together.
  codeSplitGroupings: [['component']],
  component: ProjectsPage,
});

function ProjectsPage() {
  const navigate = useNavigate();
  const { projects, loadProjects, createProject, deleteProject } = useProjectStore();

  useEffect(() => {
    void loadProjects();
  }, [loadProjects]);

  const handleCreate = async (name: string) => {
    const project = await createProject(name);
    navigate({ to: '/projects/$projectId', params: { projectId: project.id } });
  };

  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>
        Projects
      </Heading>
      <ProjectForm onSubmit={handleCreate} />
      {Object.values(projects).length > 0 && (
        <ProjectList
          projects={Object.values(projects)}
          onSelect={(project) =>
            navigate({ to: '/projects/$projectId', params: { projectId: project.id } })
          }
          onDelete={(id) => void deleteProject(id)}
        />
      )}
      <Outlet />
    </Box>
  );
}
