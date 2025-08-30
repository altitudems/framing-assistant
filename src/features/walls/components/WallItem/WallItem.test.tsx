import { render, screen, fireEvent } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { describe, it, expect, vi } from 'vitest';
import WallItem from './WallItem';
import type { Wall } from '../../types/Wall.types';

describe('WallItem', () => {
  const wall: Wall = {
    id: 'wall-1',
    projectId: 'proj-1',
    name: 'Wall A',
    length: 10,
    height: 8,
    studSpacing: '16',
    topPlate: 'double',
    bottomPlate: 'standard',
  };

  it('renders wall info and handles removal', () => {
    const handleRemove = vi.fn();
    render(
      <ChakraProvider>
        <WallItem wall={wall} onRemove={handleRemove} />
      </ChakraProvider>,
    );
    expect(screen.getByText(/wall a/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /remove/i }));
    expect(handleRemove).toHaveBeenCalledWith('wall-1');
  });
});
