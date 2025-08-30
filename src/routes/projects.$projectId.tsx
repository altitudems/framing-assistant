import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useProjectStore } from '../app/store/projectStore';
import { ProjectSummary } from '../features/projects';
import { WallForm, WallList, useWallManager } from '../features/walls';

export const Route = createFileRoute('/projects/$projectId')({
  component: ProjectDetail,
});

function ProjectDetail() {
  const { projectId } = Route.useParams();
  const { projects, loadProjects } = useProjectStore();
  const project = projects[projectId];
  const { walls, addWall, removeWall } = useWallManager(projectId);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <Stack spacing={4}>
        <Heading as="h1">{project.name}</Heading>
        <Text color="gray.600">Created {new Date(project.createdAt).toLocaleString()}</Text>
        <Button alignSelf="flex-start" colorScheme="teal" onClick={onOpen}>
          Add Wall
        </Button>
        <ProjectSummary project={project} />
        <WallList walls={walls} onRemove={(id) => void removeWall(id)} />
        <Link to="/projects">Back to projects</Link>
      </Stack>
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Wall</ModalHeader>
          <ModalBody>
            <WallForm onSubmit={(values) => void addWall(values).then(onClose)} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
