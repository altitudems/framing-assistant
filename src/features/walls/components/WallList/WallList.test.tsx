import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { renderWithChakra } from '../../../../tests/test-utils';
import WallList from './WallList';
import type { Wall } from '../../../../shared/api';

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
      loadBearing: true,
      bottomPlateTreatment: 'none',
      leftCorner: 'california',
      rightCorner: 'california',
    },
  ];

  it('renders walls and handles removal', () => {
    const handleRemove = vi.fn();
    renderWithChakra(<WallList walls={walls} onRemove={handleRemove} />);
    expect(screen.getByText(/wall a/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /remove/i }));
    expect(handleRemove).toHaveBeenCalledWith('wall-1');
  });

  it('renders nothing when no walls', () => {
    renderWithChakra(<WallList walls={[]} />);
    expect(screen.queryByText(/walls/i)).not.toBeInTheDocument();
  });
});
