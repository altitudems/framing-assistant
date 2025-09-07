import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithChakra } from '../../../../../tests/test-utils';
import { WallFormIdentification } from './WallFormIdentification';

describe('WallFormIdentification', () => {
  const mockOnNameChange = vi.fn();

  beforeEach(() => {
    mockOnNameChange.mockClear();
  });

  it('renders name input field', () => {
    renderWithChakra(
      <WallFormIdentification nameValue="" nameError={null} onNameChange={mockOnNameChange} />,
    );

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  it('displays current name value', () => {
    renderWithChakra(
      <WallFormIdentification
        nameValue="Test Wall"
        nameError={null}
        onNameChange={mockOnNameChange}
      />,
    );

    expect(screen.getByDisplayValue('Test Wall')).toBeInTheDocument();
  });

  it('displays error message when provided', () => {
    renderWithChakra(
      <WallFormIdentification
        nameValue=""
        nameError="Name is required"
        onNameChange={mockOnNameChange}
      />,
    );

    expect(screen.getByText('Name is required')).toBeInTheDocument();
  });

  it('calls onNameChange when input changes', () => {
    renderWithChakra(
      <WallFormIdentification nameValue="" nameError={null} onNameChange={mockOnNameChange} />,
    );

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'New Wall' },
    });

    expect(mockOnNameChange).toHaveBeenCalledWith('New Wall');
  });

  it('marks input as required', () => {
    renderWithChakra(
      <WallFormIdentification nameValue="" nameError={null} onNameChange={mockOnNameChange} />,
    );

    expect(screen.getByLabelText('Name')).toBeRequired();
  });
});
