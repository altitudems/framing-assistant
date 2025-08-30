import { Box, Button, Heading, Input, Stack } from '@chakra-ui/react';
import { useState } from 'react';

interface ProjectFormProps {
  onSubmit: (name: string) => void;
}

function ProjectForm({ onSubmit }: ProjectFormProps) {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    onSubmit(name.trim() || 'Untitled Project');
    setName('');
  };

  return (
    <Box borderWidth="1px" borderRadius="md" p={4} mb={4}>
      <Heading as="h2" size="md" mb={2}>
        Create a New Project
      </Heading>
      <Stack direction={{ base: 'column', md: 'row' }} spacing={2}>
        <Input placeholder="Project name" value={name} onChange={(e) => setName(e.target.value)} />
        <Button onClick={handleSubmit} colorScheme="teal">
          Create
        </Button>
      </Stack>
    </Box>
  );
}

export default ProjectForm;
