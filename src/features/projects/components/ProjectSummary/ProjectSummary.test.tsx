import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { describe, it, expect } from 'vitest';
import ProjectSummary from './ProjectSummary';
import type { Project } from '../../../../app/store/projectStore';

const project: Project = {
  id: '1',
  name: 'Demo',
  createdAt: new Date().toISOString(),
  walls: [
    {
      id: 'w1',
      projectId: '1',
      name: 'A',
      length: 10,
      height: 8,
      studSpacing: '16',
      topPlate: 'double',
      bottomPlate: 'standard',
    },
    {
      id: 'w2',
      projectId: '1',
      name: 'B',
      length: 15,
      height: 8,
      studSpacing: '16',
      topPlate: 'double',
      bottomPlate: 'standard',
    },
  ],
};

describe('ProjectSummary', () => {
  it('displays wall count and total length', () => {
    render(
      <ChakraProvider>
        <ProjectSummary project={project} />
      </ChakraProvider>,
    );

    expect(screen.getByText(/walls/i)).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText(/total linear ft/i)).toBeInTheDocument();
    expect(screen.getByText('25.00')).toBeInTheDocument();
  });
});
