import { Box, Button, Heading, HStack, IconButton, Stack, Text } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import type { Project } from '../../../../app/store/projectStore';

interface ProjectListProps {
  projects: Project[];
  onSelect?: (project: Project) => void;
  onDelete?: (id: string) => void;
  title?: string;
}

function ProjectList({ projects, onSelect, onDelete, title = 'Your Projects' }: ProjectListProps) {
  return (
    <Box borderWidth="1px" borderRadius="md" p={4}>
      <Heading as="h2" size="md" mb={2}>
        {title}
      </Heading>
      <Stack spacing={2}>
        {projects.map((project) => (
          <HStack key={project.id} justify="space-between">
            <Button variant="link" onClick={() => onSelect?.(project)}>
              {project.name}
            </Button>
            <HStack>
              <Text fontSize="sm" color="gray.500">
                {new Date(project.createdAt).toLocaleDateString()}
              </Text>
              {onDelete && (
                <IconButton
                  aria-label="Delete project"
                  icon={<DeleteIcon />}
                  size="sm"
                  onClick={() => onDelete(project.id)}
                />
              )}
            </HStack>
          </HStack>
        ))}
      </Stack>
    </Box>
  );
}

export default ProjectList;
