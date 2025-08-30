import { createFileRoute } from '@tanstack/react-router';
import { Box, Heading, Text } from '@chakra-ui/react';

export const Route = createFileRoute('/projects')({
  // For this specific route, bundle the component together.
  codeSplitGroupings: [['component']],
  component: () => (
    <Box p={4}>
      <Heading as="h1" mb={4}>
        Projects
      </Heading>
      <Box borderWidth="1px" borderRadius="md" p={4}>
        <Heading as="h2" size="md" mb={2}>
          Manage Your Projects
        </Heading>
        <Text>Here you can create new projects or select existing ones.</Text>
      </Box>
    </Box>
  ),
});
