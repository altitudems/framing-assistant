import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithChakra } from '../../../../tests/test-utils';
import { WallFormPresets } from './WallFormPresets';

describe('WallFormPresets', () => {
  const mockLoadBearing = vi.fn();
  const mockNonLoadBearing = vi.fn();
  const mockBasementFloating = vi.fn();

  beforeEach(() => {
    mockLoadBearing.mockClear();
    mockNonLoadBearing.mockClear();
    mockBasementFloating.mockClear();
  });

  it('renders all preset buttons', () => {
    renderWithChakra(
      <WallFormPresets
        onApplyLoadBearing={mockLoadBearing}
        onApplyNonLoadBearing={mockNonLoadBearing}
        onApplyBasementFloating={mockBasementFloating}
      />,
    );

    expect(screen.getByText('Load Bearing')).toBeInTheDocument();
    expect(screen.getByText('Non-Load Bearing')).toBeInTheDocument();
    expect(screen.getByText('Basement Floating')).toBeInTheDocument();
  });

  it('calls appropriate handlers when buttons are clicked', () => {
    renderWithChakra(
      <WallFormPresets
        onApplyLoadBearing={mockLoadBearing}
        onApplyNonLoadBearing={mockNonLoadBearing}
        onApplyBasementFloating={mockBasementFloating}
      />,
    );

    fireEvent.click(screen.getByText('Load Bearing'));
    expect(mockLoadBearing).toHaveBeenCalled();

    fireEvent.click(screen.getByText('Non-Load Bearing'));
    expect(mockNonLoadBearing).toHaveBeenCalled();

    fireEvent.click(screen.getByText('Basement Floating'));
    expect(mockBasementFloating).toHaveBeenCalled();
  });

  it('displays the Quick Presets title', () => {
    renderWithChakra(
      <WallFormPresets
        onApplyLoadBearing={mockLoadBearing}
        onApplyNonLoadBearing={mockNonLoadBearing}
        onApplyBasementFloating={mockBasementFloating}
      />,
    );

    expect(screen.getByText('Quick Presets')).toBeInTheDocument();
  });
});
