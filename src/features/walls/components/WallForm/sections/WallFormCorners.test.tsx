import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithChakra } from '../../../../../tests/test-utils';
import { WallFormCorners } from './WallFormCorners';

describe('WallFormCorners', () => {
  const defaultProps = {
    leftCorner: undefined,
    rightCorner: undefined,
    onLeftCornerChange: vi.fn(),
    onRightCornerChange: vi.fn(),
  };

  beforeEach(() => {
    defaultProps.onLeftCornerChange.mockClear();
    defaultProps.onRightCornerChange.mockClear();
  });

  it('renders all corner type options', () => {
    renderWithChakra(<WallFormCorners {...defaultProps} />);

    // Check for both left and right corner options
    ['None', 'Double', '3-Stud', 'California'].forEach((option) => {
      const elements = screen.getAllByText(option);
      expect(elements).toHaveLength(2); // One for each corner
    });
  });

  it('shows correct selected states for corner types', () => {
    renderWithChakra(
      <WallFormCorners {...defaultProps} leftCorner="california" rightCorner="double" />,
    );

    // Left corner - check that California button is selected (has solid variant)
    const leftCaliforniaButton = screen.getAllByText('California')[0];
    expect(leftCaliforniaButton).toHaveClass('css-17zd4y0'); // solid variant class

    // Right corner - check that Double button is selected (has solid variant)
    const rightDoubleButton = screen.getAllByText('Double')[1];
    expect(rightDoubleButton).toHaveClass('css-17zd4y0'); // solid variant class
  });

  it('calls appropriate handlers when corner types are selected', () => {
    renderWithChakra(<WallFormCorners {...defaultProps} />);

    // Change left corner
    fireEvent.click(screen.getAllByText('California')[0]);
    expect(defaultProps.onLeftCornerChange).toHaveBeenCalledWith('california');

    // Change right corner
    fireEvent.click(screen.getAllByText('Double')[1]);
    expect(defaultProps.onRightCornerChange).toHaveBeenCalledWith('double');
  });

  it('allows setting corners to none', () => {
    renderWithChakra(
      <WallFormCorners {...defaultProps} leftCorner="california" rightCorner="double" />,
    );

    // Set both corners to none
    fireEvent.click(screen.getAllByText('None')[0]);
    expect(defaultProps.onLeftCornerChange).toHaveBeenCalledWith(undefined);

    fireEvent.click(screen.getAllByText('None')[1]);
    expect(defaultProps.onRightCornerChange).toHaveBeenCalledWith(undefined);
  });

  it('handles corner type combinations', () => {
    // Test a few specific combinations instead of all combinations
    renderWithChakra(
      <WallFormCorners {...defaultProps} leftCorner="double" rightCorner="three-stud" />,
    );

    // Verify that the correct buttons are shown as selected
    const leftDoubleButton = screen.getAllByText('Double')[0];
    expect(leftDoubleButton).toHaveClass('css-17zd4y0'); // solid variant class

    const rightThreeStudButton = screen.getAllByText('3-Stud')[1];
    expect(rightThreeStudButton).toHaveClass('css-17zd4y0'); // solid variant class
  });
});
