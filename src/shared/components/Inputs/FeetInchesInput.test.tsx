import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ChakraProvider } from '@chakra-ui/react';
import FeetInchesInput from './FeetInchesInput';

function renderInput(props: React.ComponentProps<typeof FeetInchesInput>) {
  return render(
    <ChakraProvider>
      <form>
        <FeetInchesInput {...props} />
        <button type="submit">submit</button>
      </form>
    </ChakraProvider>,
  );
}

describe('FeetInchesInput', () => {
  it('renders feet and inches fields', () => {
    renderInput({ id: 'len', name: 'len', fieldLabel: 'Length' });
    expect(screen.getByLabelText(/length feet/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/length inches/i)).toBeInTheDocument();
  });

  it('accepts decimals for inches and normalizes >= 12 into feet', () => {
    renderInput({ id: 'len', name: 'len', fieldLabel: 'Length' });
    const feet = screen.getByLabelText(/length feet/i) as HTMLInputElement;
    const inches = screen.getByLabelText(/length inches/i) as HTMLInputElement;

    fireEvent.change(feet, { target: { value: '5' } });
    fireEvent.change(inches, { target: { value: '12.5' } });

    // After normalization, feet should be 6 and inches 0.5
    expect(feet.value).toBe('6');
    expect(inches.value).toBe('0.5');
  });

  it('sets hidden decimal feet value for form submission', () => {
    renderInput({ id: 'len', name: 'len', fieldLabel: 'Length' });
    const feet = screen.getByLabelText(/length feet/i) as HTMLInputElement;
    const inches = screen.getByLabelText(/length inches/i) as HTMLInputElement;

    fireEvent.change(feet, { target: { value: '8' } });
    fireEvent.change(inches, { target: { value: '6' } });

    const hidden = document.querySelector('input[name="len"][type="hidden"]') as HTMLInputElement;
    expect(hidden).toBeTruthy();
    // 8.5 decimal feet
    expect(Number(hidden.value)).toBeCloseTo(8.5, 5);
  });
});
