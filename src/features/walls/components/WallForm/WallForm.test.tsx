import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import WallForm from './WallForm';

describe('WallForm', () => {
  test('submits form values', () => {
    const handleSubmit = vi.fn();
    render(<WallForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Wall A' },
    });
    fireEvent.change(screen.getByLabelText(/length/i), {
      target: { value: '10' },
    });
    fireEvent.change(screen.getByLabelText(/height/i), {
      target: { value: '8' },
    });
    fireEvent.change(screen.getByLabelText(/stud spacing/i), {
      target: { value: '24' },
    });
    fireEvent.change(screen.getByLabelText(/top plate/i), {
      target: { value: 'single' },
    });
    fireEvent.change(screen.getByLabelText(/bottom plate type/i), {
      target: { value: 'floating' },
    });
    fireEvent.change(screen.getByLabelText(/floor gap/i), {
      target: { value: '1.5' },
    });

    fireEvent.click(screen.getByRole('button', { name: /save wall/i }));

    expect(handleSubmit).toHaveBeenCalledWith({
      name: 'Wall A',
      length: 10,
      height: 8,
      studSpacing: '24',
      topPlate: 'single',
      bottomPlate: 'floating',
      floorGap: 1.5,
    });
  });
});
