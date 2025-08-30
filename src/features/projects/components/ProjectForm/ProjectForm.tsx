import { Button, Input, Stack } from '@chakra-ui/react';
import { useState, type FormEvent } from 'react';

interface ProjectFormProps {
  onSubmit: (name: string) => void;
}

function ProjectForm({ onSubmit }: ProjectFormProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(name.trim() || 'Untitled Project');
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction={{ base: 'column', md: 'row' }} spacing={2}>
        <Input placeholder="Project name" value={name} onChange={(e) => setName(e.target.value)} />
        <Button type="submit" colorScheme="teal">
          Create
        </Button>
      </Stack>
    </form>
  );
}

export default ProjectForm;
