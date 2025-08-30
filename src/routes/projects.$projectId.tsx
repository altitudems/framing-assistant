import { createFileRoute } from '@tanstack/react-router';
import { Box, Heading, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useProjectStore } from '../app/store/projectStore';

export const Route = createFileRoute('/projects/$projectId')({
  component: ProjectDetail,
});

function ProjectDetail() {
  const { projectId } = Route.useParams();
  const { projects, loadProjects } = useProjectStore();

  const project = projects[projectId];

  useEffect(() => {
    if (!project) {
      loadProjects();
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
      <Heading as="h1" mb={4}>
        {projects[projectId].name}
      </Heading>
      <Text>Project ID: {projectId}</Text>
    </Box>
  );
}
