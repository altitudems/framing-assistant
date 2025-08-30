import { render, screen, fireEvent } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { describe, it, expect, vi } from 'vitest';
import WallList from './WallList';
import type { Wall } from '../../types/Wall.types';

describe('WallList', () => {
  const walls: Wall[] = [
    {
      id: 'wall-1',
      projectId: 'proj-1',
      name: 'Wall A',
      length: 10,
      height: 8,
      studSpacing: '16',
      topPlate: 'double',
      bottomPlate: 'standard',
    },
  ];

  it('renders walls and handles removal', () => {
    const handleRemove = vi.fn();
    render(
      <ChakraProvider>
        <WallList walls={walls} onRemove={handleRemove} />
      </ChakraProvider>,
    );
    expect(screen.getByText(/wall a/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /remove/i }));
    expect(handleRemove).toHaveBeenCalledWith('wall-1');
  });

  it('renders nothing when no walls', () => {
    render(
      <ChakraProvider>
        <WallList walls={[]} />
      </ChakraProvider>,
    );
    expect(screen.queryByText(/walls/i)).not.toBeInTheDocument();
  });
});
