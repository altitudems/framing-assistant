import { createFileRoute } from '@tanstack/react-router';
import { Box, Heading, Text } from '@chakra-ui/react';

export const Route = createFileRoute('/')({
  component: () => (
    <Box p={4}>
      <Heading as="h1" mb={4}>
        Home
      </Heading>
      <Box borderWidth="1px" borderRadius="md" p={4}>
        <Heading as="h2" size="md" mb={2}>
          Welcome Home!
        </Heading>
        <Text>This is the home page content.</Text>
      </Box>
    </Box>
  ),
});
