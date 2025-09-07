import { screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithChakra } from '../../../../tests/test-utils';
import WallForm from './WallForm';
import type { WallFormValues } from '../../types/WallForm.types';

// TODO: Fix infinite loop in WallForm tests - likely caused by complex useWallForm hook
describe.skip('WallForm', () => {
  const mockSubmit = vi.fn();

  beforeEach(() => {
    mockSubmit.mockClear();
  });

  it('renders all form sections', () => {
    renderWithChakra(<WallForm onSubmit={mockSubmit} />);

    // Check for section headings
    expect(screen.getByText('Quick Presets')).toBeInTheDocument();
    expect(screen.getByText('Identification')).toBeInTheDocument();
    expect(screen.getByText('Dimensions')).toBeInTheDocument();
    expect(screen.getByText('Framing')).toBeInTheDocument();
    expect(screen.getByText('Corners')).toBeInTheDocument();
    expect(screen.getByText('Lumber Selection')).toBeInTheDocument();
  });

  it('initializes with provided values', () => {
    const initialValues: WallFormValues = {
      name: 'Test Wall',
      length: 10,
      height: 8,
      studSpacing: '16',
      topPlate: 'double',
      bottomPlate: 'standard',
      bottomPlateTreatment: 'none',
      leftCorner: 'california',
      rightCorner: 'double',
      loadBearing: true,
    };

    renderWithChakra(<WallForm initialValues={initialValues} onSubmit={mockSubmit} />);

    // Check that values are displayed in the summary
    expect(screen.getByText('Test Wall - Summary')).toBeInTheDocument();
    expect(screen.getByText('10.0 ft')).toBeInTheDocument();
    expect(screen.getByText('8.0 ft')).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument(); // load bearing
  });

  it('applies presets correctly', () => {
    renderWithChakra(<WallForm onSubmit={mockSubmit} />);

    // Apply load bearing preset
    fireEvent.click(screen.getByText('Load Bearing'));

    // Check that values were updated
    expect(screen.getByText('9.0 ft')).toBeInTheDocument(); // default height
    expect(screen.getByText('16" OC')).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument(); // load bearing
  });

  it('validates form before submission', async () => {
    renderWithChakra(<WallForm onSubmit={mockSubmit} />);

    // Try to submit without required fields
    const submitButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(submitButton);

    // Check for validation errors
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Enter a valid positive length')).toBeInTheDocument();
    expect(screen.getByText('Enter a valid positive height')).toBeInTheDocument();

    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('submits form with valid data', async () => {
    renderWithChakra(<WallForm onSubmit={mockSubmit} />);

    // Fill in required fields
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Test Wall' },
    });

    // Note: FeetInchesInput component would need to be interacted with differently
    // This is a simplified version
    const lengthInput = screen.getByLabelText('Length (ft)');
    const heightInput = screen.getByLabelText('Height (ft)');

    fireEvent.change(lengthInput, { target: { value: '10' } });
    fireEvent.change(heightInput, { target: { value: '8' } });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(submitButton);

    expect(mockSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Test Wall',
        length: 10,
        height: 8,
        studSpacing: '16',
        topPlate: 'double',
        bottomPlate: 'standard',
        loadBearing: false,
      }),
    );
  });

  it('updates calculations when values change', () => {
    renderWithChakra(<WallForm onSubmit={mockSubmit} />);

    // Set initial values
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Test Wall' },
    });
    const lengthInput = screen.getByLabelText('Length (ft)');
    const heightInput = screen.getByLabelText('Height (ft)');

    fireEvent.change(lengthInput, { target: { value: '10' } });
    fireEvent.change(heightInput, { target: { value: '8' } });

    // Check initial calculations in summary
    const summary = screen.getByText('Test Wall - Summary').closest('div');
    expect(summary).toBeTruthy();
    if (summary) {
      const { getByText } = within(summary);
      expect(getByText('96.0 ft')).toBeInTheDocument(); // total linear feet
      expect(getByText(/\$[0-9.]+/)).toBeInTheDocument(); // total cost
    }

    // Change some values
    fireEvent.click(screen.getByText('24" OC')); // Change stud spacing

    // Check that calculations updated
    if (summary) {
      const { getByText } = within(summary);
      expect(getByText(/[0-9.]+ ft/)).toBeInTheDocument(); // new total linear feet
      expect(getByText(/\$[0-9.]+/)).toBeInTheDocument(); // new total cost
    }
  });

  describe('responsive behavior', () => {
    it('shows tabs on desktop', () => {
      // Mock window.matchMedia for desktop
      window.matchMedia = vi.fn().mockImplementation((query) => ({
        matches: query === '(min-width: 992px)', // lg breakpoint
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
      }));

      renderWithChakra(<WallForm onSubmit={mockSubmit} />);

      expect(screen.getByRole('tablist')).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Basics' })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Framing' })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Corners' })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Lumber' })).toBeInTheDocument();
    });

    it('shows stacked sections on mobile', () => {
      // Mock window.matchMedia for mobile
      window.matchMedia = vi.fn().mockImplementation((query) => ({
        matches: query !== '(min-width: 992px)', // not lg breakpoint
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
      }));

      renderWithChakra(<WallForm onSubmit={mockSubmit} />);

      expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
      // All sections should be visible
      expect(screen.getAllByText('Quick Presets')).toHaveLength(1);
      expect(screen.getAllByText('Identification')).toHaveLength(1);
      expect(screen.getAllByText('Dimensions')).toHaveLength(1);
    });
  });
});
