import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { Box, Button, Heading, Input, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useProjectStore } from '../app/store/projectStore';

export const Route = createFileRoute('/projects')({
  // For this specific route, bundle the component together.
  codeSplitGroupings: [['component']],
  component: ProjectsPage,
});

function ProjectsPage() {
  const navigate = useNavigate();
  const { projects, loadProjects, createProject } = useProjectStore();
  const [name, setName] = useState('');

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handleCreate = () => {
    const project = createProject(name.trim() || 'Untitled Project');
    setName('');
    navigate({ to: '/projects/$projectId', params: { projectId: project.id } });
  };

  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>
        Projects
      </Heading>
      <Box borderWidth="1px" borderRadius="md" p={4} mb={4}>
        <Heading as="h2" size="md" mb={2}>
          Create a New Project
        </Heading>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={2}>
          <Input
            placeholder="Project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button onClick={handleCreate} colorScheme="teal">
            Create
          </Button>
        </Stack>
      </Box>
      {Object.values(projects).length > 0 && (
        <Box borderWidth="1px" borderRadius="md" p={4}>
          <Heading as="h2" size="md" mb={2}>
            Resume Project
          </Heading>
          <Stack>
            {Object.values(projects).map((project) => (
              <Link key={project.id} to="/projects/$projectId" params={{ projectId: project.id }}>
                {project.name}
              </Link>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
}
