import { render, screen, fireEvent } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { describe, it, expect, vi } from 'vitest';
import ProjectForm from './ProjectForm';

describe('ProjectForm', () => {
  it('submits project name', () => {
    const handleSubmit = vi.fn();
    render(
      <ChakraProvider>
        <ProjectForm onSubmit={handleSubmit} />
      </ChakraProvider>,
    );

    fireEvent.change(screen.getByPlaceholderText(/project name/i), {
      target: { value: 'My Project' },
    });
    fireEvent.click(screen.getByRole('button', { name: /create/i }));

    expect(handleSubmit).toHaveBeenCalledWith('My Project');
  });
});
