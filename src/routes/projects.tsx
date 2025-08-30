import { createFileRoute, useNavigate, Outlet } from '@tanstack/react-router';
import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    void loadProjects();
  }, [loadProjects]);

  const handleCreate = async (name: string) => {
    const project = await createProject(name);
    onClose();
    navigate({ to: '/projects/$projectId', params: { projectId: project.id } });
  };

  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>
        Projects
      </Heading>
      <Button colorScheme="teal" onClick={onOpen} mb={4}>
        New Project
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Project</ModalHeader>
          <ModalBody pb={6}>
            <ProjectForm onSubmit={handleCreate} />
          </ModalBody>
        </ModalContent>
      </Modal>
      {Object.values(projects).length > 0 && (
        <ProjectList
          projects={Object.values(projects)}
          onSelect={(project) =>
            navigate({ to: '/projects/$projectId', params: { projectId: project.id } })
          }
          onDelete={(id) => void deleteProject(id)}
        />
      )}
      <Box mt={4}>
        <Outlet />
      </Box>
    </Box>
  );
}
