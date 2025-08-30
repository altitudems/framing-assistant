import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import type { Project } from '../../../../app/store/projectStore';
import ProjectCard from '../ProjectCard/ProjectCard';

interface ProjectListProps {
  projects: Project[];
  onSelect?: (project: Project) => void;
  onDelete?: (id: string) => void;
  title?: string;
}

function ProjectList({ projects, onSelect, onDelete, title = 'Your Projects' }: ProjectListProps) {
  return (
    <Box borderWidth="1px" borderRadius="md" p={4}>
      <Heading as="h2" size="md" mb={4}>
        {title}
      </Heading>
      <SimpleGrid spacing={4} minChildWidth="250px">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onSelect={onSelect} onDelete={onDelete} />
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default ProjectList;
