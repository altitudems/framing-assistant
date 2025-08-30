import { Box, HStack, Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import type { Project } from '../../../../app/store/projectStore';

interface ProjectSummaryProps {
  project: Project;
}

function ProjectSummary({ project }: ProjectSummaryProps) {
  const totalLength = project.walls.reduce((sum, w) => sum + w.length, 0);
  return (
    <Box borderWidth="1px" borderRadius="md" p={4} mb={4}>
      <HStack spacing={8}>
        <Stat>
          <StatLabel>Walls</StatLabel>
          <StatNumber>{project.walls.length}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Total Linear Ft</StatLabel>
          <StatNumber>{totalLength.toFixed(2)}</StatNumber>
        </Stat>
      </HStack>
    </Box>
  );
}

export default ProjectSummary;
