import { render, screen, fireEvent } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { describe, it, expect, vi } from 'vitest';
import ProjectCard from './ProjectCard';
import type { Project } from '../../../../app/store/projectStore';

const project: Project = {
  id: '1',
  name: 'Test Project',
  createdAt: new Date().toISOString(),
  walls: [
    {
      id: 'w1',
      projectId: '1',
      name: 'Wall',
      length: 12,
      height: 8,
      studSpacing: '16',
      topPlate: 'double',
      bottomPlate: 'standard',
    },
  ],
};

describe('ProjectCard', () => {
  it('shows project metrics and handles actions', () => {
    const handleSelect = vi.fn();
    const handleDelete = vi.fn();
    render(
      <ChakraProvider>
        <ProjectCard project={project} onSelect={handleSelect} onDelete={handleDelete} />
      </ChakraProvider>,
    );

    expect(screen.getByText(/walls: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/linear ft: 12/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /test project/i }));
    expect(handleSelect).toHaveBeenCalledWith(project);

    fireEvent.click(screen.getByRole('button', { name: /delete project/i }));
    expect(handleDelete).toHaveBeenCalledWith('1');
  });
});
