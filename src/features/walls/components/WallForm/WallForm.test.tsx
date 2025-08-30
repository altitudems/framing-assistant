import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { ChakraProvider } from '@chakra-ui/react';
import WallForm from './WallForm';

describe('WallForm', () => {
  test('submits form values', () => {
    const handleSubmit = vi.fn();
    render(
      <ChakraProvider>
        <WallForm onSubmit={handleSubmit} />
      </ChakraProvider>,
    );

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Wall A' },
    });
    // Length: 10 ft 0 in
    fireEvent.change(screen.getByLabelText(/length feet/i), {
      target: { value: '10' },
    });
    fireEvent.change(screen.getByLabelText(/length inches/i), {
      target: { value: '0' },
    });
    // Height: 8 ft 0 in
    fireEvent.change(screen.getByLabelText(/height feet/i), {
      target: { value: '8' },
    });
    fireEvent.change(screen.getByLabelText(/height inches/i), {
      target: { value: '0' },
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
      loadBearing: false,
      bottomPlateTreatment: 'none',
      leftCorner: undefined,
      rightCorner: undefined,
    });
  });
});
