import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithChakra } from '../../../../../tests/test-utils';
import { WallFormLumber } from './WallFormLumber';

describe('WallFormLumber', () => {
  const defaultProps = {
    lumberSize: '2x4' as const,
    studLength: 8 as const,
    plateLength: 8 as const,
    studUnitCost: 3.5,
    plateUnitCost: 3.5,
    pressureTreatedPlateCost: 4.25,
    wallLength: 10,
    wallHeight: 8,
    onLumberSizeChange: vi.fn(),
    onStudLengthChange: vi.fn(),
    onPlateLengthChange: vi.fn(),
    onStudUnitCostChange: vi.fn(),
    onPlateUnitCostChange: vi.fn(),
    onPressureTreatedPlateCostChange: vi.fn(),
  };

  beforeEach(() => {
    defaultProps.onLumberSizeChange.mockClear();
    defaultProps.onStudLengthChange.mockClear();
    defaultProps.onPlateLengthChange.mockClear();
    defaultProps.onStudUnitCostChange.mockClear();
    defaultProps.onPlateUnitCostChange.mockClear();
    defaultProps.onPressureTreatedPlateCostChange.mockClear();
  });

  it('renders all lumber options', () => {
    renderWithChakra(<WallFormLumber {...defaultProps} />);

    // Lumber size options
    expect(screen.getByText('2×4')).toBeInTheDocument();
    expect(screen.getByText('2×6')).toBeInTheDocument();

    // Length options
    ['8 ft', '10 ft', '12 ft', '14 ft', '16 ft'].forEach((length) => {
      const elements = screen.getAllByText(length);
      expect(elements).toHaveLength(2); // One for studs, one for plates
    });

    // Cost inputs
    expect(screen.getByLabelText('Studs')).toBeInTheDocument();
    expect(screen.getByLabelText('Regular Plates')).toBeInTheDocument();
    expect(screen.getByLabelText('Pressure-Treated Plates')).toBeInTheDocument();
  });

  it('shows warning when selected lengths are too short', () => {
    renderWithChakra(
      <WallFormLumber
        {...defaultProps}
        studLength={8}
        plateLength={8}
        wallHeight={10}
        wallLength={12}
      />,
    );

    expect(
      screen.getByText('⚠️ Selected length (8 ft) is shorter than wall height (10 ft)'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('⚠️ Selected length (8 ft) is shorter than wall length (12 ft)'),
    ).toBeInTheDocument();
  });

  it('calls appropriate handlers when options are selected', () => {
    renderWithChakra(<WallFormLumber {...defaultProps} />);

    // Change lumber size
    fireEvent.click(screen.getByText('2×6'));
    expect(defaultProps.onLumberSizeChange).toHaveBeenCalledWith('2x6');

    // Change stud length
    fireEvent.click(screen.getAllByText('10 ft')[0]);
    expect(defaultProps.onStudLengthChange).toHaveBeenCalledWith(10);

    // Change plate length
    fireEvent.click(screen.getAllByText('12 ft')[1]);
    expect(defaultProps.onPlateLengthChange).toHaveBeenCalledWith(12);
  });

  it('handles cost input changes', () => {
    renderWithChakra(<WallFormLumber {...defaultProps} />);

    // Change stud cost
    fireEvent.change(screen.getByLabelText('Studs'), {
      target: { value: '4.50' },
    });
    expect(defaultProps.onStudUnitCostChange).toHaveBeenCalledWith(4.5);

    // Change regular plate cost
    fireEvent.change(screen.getByLabelText('Regular Plates'), {
      target: { value: '4.00' },
    });
    expect(defaultProps.onPlateUnitCostChange).toHaveBeenCalledWith(4);

    // Change pressure-treated plate cost
    fireEvent.change(screen.getByLabelText('Pressure-Treated Plates'), {
      target: { value: '5.00' },
    });
    expect(defaultProps.onPressureTreatedPlateCostChange).toHaveBeenCalledWith(5);
  });

  it('shows correct selected states for buttons', () => {
    renderWithChakra(
      <WallFormLumber {...defaultProps} lumberSize="2x6" studLength={10} plateLength={12} />,
    );

    // Check that the correct buttons show as selected (Chakra UI v3 uses CSS classes)
    expect(screen.getByText('2×6')).toHaveClass('css-17zd4y0'); // solid variant class
    expect(screen.getAllByText('10 ft')[0]).toHaveClass('css-17zd4y0'); // stud length
    expect(screen.getAllByText('12 ft')[1]).toHaveClass('css-17zd4y0'); // plate length
  });

  it('displays helper text with current lumber size', () => {
    renderWithChakra(<WallFormLumber {...defaultProps} lumberSize="2x4" />);

    expect(screen.getByText('Per 2x4 stud')).toBeInTheDocument();
    expect(screen.getByText('Per 2x4 plate')).toBeInTheDocument();
    expect(screen.getByText('Per 2x4 PT plate')).toBeInTheDocument();
  });
});
