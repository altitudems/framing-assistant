import { createFileRoute, Link } from '@tanstack/react-router';
import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useProjectStore } from '../app/store/projectStore';
import { WallForm, WallList, useWallManager } from '../features/walls';

export const Route = createFileRoute('/projects/$projectId')({
  component: ProjectDetail,
});

function ProjectDetail() {
  const { projectId } = Route.useParams();
  const { projects, loadProjects } = useProjectStore();
  const project = projects[projectId];
  const { walls, addWall, removeWall } = useWallManager(projectId);

  useEffect(() => {
    if (!project) {
      void loadProjects();
    }
  }, [project, loadProjects]);

  if (!projects[projectId]) {
    return (
      <Box p={4}>
        <Text>Project not found.</Text>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Stack spacing={2}>
        <Heading as="h1">{project.name}</Heading>
        <Text color="gray.600">Created {new Date(project.createdAt).toLocaleString()}</Text>
        <Text>Project ID: {projectId}</Text>
        <Link to="/projects">Back to projects</Link>
      </Stack>
      <Box mt={4}>
        <WallForm onSubmit={(values) => void addWall(values)} />
        <WallList walls={walls} onRemove={(id) => void removeWall(id)} />
      </Box>
    </Box>
  );
}
