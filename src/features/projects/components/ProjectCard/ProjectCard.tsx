import { Box, Button, Heading, HStack, IconButton, Stack, Text } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import type { Project } from '../../../../app/store/projectStore';

interface ProjectCardProps {
  project: Project;
  onSelect?: (project: Project) => void;
  onDelete?: (id: string) => void;
}

function ProjectCard({ project, onSelect, onDelete }: ProjectCardProps) {
  const wallCount = project.walls.length;
  const totalLength = project.walls.reduce((sum, w) => sum + w.length, 0);

  return (
    <Box borderWidth="1px" borderRadius="md" p={4}>
      <Stack spacing={2}>
        <Heading as="h3" size="md">
          {project.name}
        </Heading>
        <HStack spacing={4} fontSize="sm">
          <Text>Walls: {wallCount}</Text>
          <Text>Linear ft: {totalLength.toFixed(2)}</Text>
        </HStack>
        <HStack>
          <Button size="sm" onClick={() => onSelect?.(project)}>
            {project.name}
          </Button>
          {onDelete && (
            <IconButton
              aria-label="Delete project"
              icon={<DeleteIcon />}
              size="sm"
              onClick={() => onDelete(project.id)}
            />
          )}
        </HStack>
        <Text fontSize="xs" color="gray.500">
          Created {new Date(project.createdAt).toLocaleDateString()}
        </Text>
      </Stack>
    </Box>
  );
}

export default ProjectCard;
