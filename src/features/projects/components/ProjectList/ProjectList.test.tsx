import { render, screen, fireEvent } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { describe, it, expect, vi } from 'vitest';
import ProjectList from './ProjectList';
import type { Project } from '../../../../app/store/projectStore';

describe('ProjectList', () => {
  const projects: Project[] = [
    { id: '1', name: 'Project One', createdAt: new Date().toISOString() },
  ];

  it('selects a project', () => {
    const handleSelect = vi.fn();
    render(
      <ChakraProvider>
        <ProjectList projects={projects} onSelect={handleSelect} />
      </ChakraProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: /project one/i }));
    expect(handleSelect).toHaveBeenCalledWith(projects[0]);
  });

  it('deletes a project', () => {
    const handleDelete = vi.fn();
    render(
      <ChakraProvider>
        <ProjectList projects={projects} onDelete={handleDelete} />
      </ChakraProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: /delete project/i }));
    expect(handleDelete).toHaveBeenCalledWith('1');
  });
});
