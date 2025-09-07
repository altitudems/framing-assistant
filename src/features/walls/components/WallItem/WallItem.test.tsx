import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { renderWithChakra } from '../../../../tests/test-utils';
import WallItem from './WallItem';
import type { Wall } from '../../../../shared/api';

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
    loadBearing: true,
    bottomPlateTreatment: 'none',
    leftCorner: 'california',
    rightCorner: 'california',
  };

  it('renders wall info and handles removal and edit', () => {
    const handleRemove = vi.fn();
    const handleEdit = vi.fn();
    renderWithChakra(<WallItem wall={wall} onRemove={handleRemove} onEdit={handleEdit} />);
    expect(screen.getByText(/wall a/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    expect(handleEdit).toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: /remove/i }));
    expect(handleRemove).toHaveBeenCalledWith('wall-1');
  });
});
