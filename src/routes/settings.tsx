import { createFileRoute } from '@tanstack/react-router';
import { Box, Heading, Text } from '@chakra-ui/react';

export const Route = createFileRoute('/settings')({
  component: () => (
    <Box p={4}>
      <Heading as="h1" mb={4}>
        Settings
      </Heading>
      <Box borderWidth="1px" borderRadius="md" p={4}>
        <Heading as="h2" size="md" mb={2}>
          Application Settings
        </Heading>
        <Text>Configure your application preferences here.</Text>
      </Box>
    </Box>
  ),
});
