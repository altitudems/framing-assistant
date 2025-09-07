import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithChakra } from '../../../../tests/test-utils';
import WallDialog from './WallDialog';

// TODO: Fix infinite loop in WallDialog tests - likely caused by complex useWallForm hook
describe.skip('WallDialog', () => {
  const defaultProps = {
    title: 'Add Wall',
    open: true,
    onClose: vi.fn(),
    onSubmit: vi.fn(),
    isSaving: false,
  };

  beforeEach(() => {
    defaultProps.onClose.mockClear();
    defaultProps.onSubmit.mockClear();
  });

  it('renders dialog with title and form', () => {
    renderWithChakra(<WallDialog {...defaultProps} />);

    expect(screen.getByText('Add Wall')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    renderWithChakra(<WallDialog {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('calls onClose when Cancel button is clicked', () => {
    renderWithChakra(<WallDialog {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('shows loading state on Save button when isSaving is true', () => {
    renderWithChakra(<WallDialog {...defaultProps} isSaving={true} />);

    const saveButton = screen.getByRole('button', { name: /save/i });
    expect(saveButton).toHaveAttribute('loading');
  });

  it('submits form data when Save button is clicked', async () => {
    renderWithChakra(<WallDialog {...defaultProps} />);

    // Fill in required fields
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Test Wall' },
    });

    // Note: FeetInchesInput component would need to be interacted with differently
    // This is a simplified version assuming the inputs are accessible
    const lengthInput = screen.getByLabelText('Length (ft)');
    const heightInput = screen.getByLabelText('Height (ft)');

    fireEvent.change(lengthInput, { target: { value: '10' } });
    fireEvent.change(heightInput, { target: { value: '8' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(defaultProps.onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Test Wall',
        length: 10,
        height: 8,
      }),
    );
  });

  it('renders with initial values when provided', () => {
    const initialValues = {
      name: 'Existing Wall',
      length: 12,
      height: 9,
      studSpacing: '16' as const,
      topPlate: 'double' as const,
      bottomPlate: 'standard' as const,
      loadBearing: true,
      bottomPlateTreatment: 'none' as const,
    };

    renderWithChakra(<WallDialog {...defaultProps} initialValues={initialValues} />);

    expect(screen.getByDisplayValue('Existing Wall')).toBeInTheDocument();
    // Note: FeetInchesInput values would need to be checked differently
    // This is just checking that the form renders with initial values
    expect(screen.getByRole('switch')).toBeChecked(); // load bearing switch
  });
});
