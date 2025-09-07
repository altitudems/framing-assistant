import React from 'react';
import { HStack, Input, InputElement, Box } from '@chakra-ui/react';

interface FeetInchesInputProps {
  id: string;
  name: string;
  fieldLabel: string;
  defaultValueDecimalFeet?: number;

  onDecimalFeetChange?: (value: number | undefined) => void;
}

/**
 * FeetInchesInput renders two NumberInputs for feet and inches and maintains a hidden input
 * with the computed decimal feet value under `name` for native form submission.
 */
const FeetInchesInput: React.FC<FeetInchesInputProps> = ({
  id,
  name,
  fieldLabel,
  defaultValueDecimalFeet,
  onDecimalFeetChange,
}) => {
  const initialFeet = Number.isFinite(defaultValueDecimalFeet)
    ? Math.floor(defaultValueDecimalFeet as number)
    : undefined;
  const initialInches = Number.isFinite(defaultValueDecimalFeet)
    ? Math.round(
        ((defaultValueDecimalFeet as number) - Math.floor(defaultValueDecimalFeet as number)) *
          12 *
          100,
      ) / 100
    : undefined;

  const [feet, setFeet] = React.useState<number | undefined>(initialFeet);
  const [inches, setInches] = React.useState<number | undefined>(initialInches);

  const decimalFeet = React.useMemo(() => {
    const f = typeof feet === 'number' && !Number.isNaN(feet) ? feet : 0;
    const i = typeof inches === 'number' && !Number.isNaN(inches) ? inches : 0;
    return f + i / 12;
  }, [feet, inches]);

  React.useEffect(() => {
    if (typeof onDecimalFeetChange === 'function') {
      const valid = Number.isFinite(decimalFeet) ? (decimalFeet as number) : undefined;
      onDecimalFeetChange(valid);
    }
  }, [decimalFeet, onDecimalFeetChange]);

  // Chakra NumberInput onChange provides (valueAsString, valueAsNumber)
  const handleFeetChange = (_: string, value: number) => {
    if (Number.isNaN(value)) setFeet(undefined);
    else setFeet(value);
  };
  const handleInchesChange = (_: string, value: number) => {
    if (Number.isNaN(value)) {
      setInches(undefined);
      return;
    }
    // Normalize values >= 12 inches into feet
    if (value >= 12) {
      const extraFeet = Math.floor(value / 12);
      const remInches = value - extraFeet * 12;
      setFeet((prev) => (typeof prev === 'number' ? prev + extraFeet : extraFeet));
      setInches(remInches);
    } else if (value < 0) {
      // Prevent negative inches; clamp to 0
      setInches(0);
    } else {
      setInches(value);
    }
  };

  return (
    <>
      <HStack gap={2} align="stretch" w="full">
        <Box display="flex" flex={1} minW={0} w="full" position="relative">
          <InputElement pointerEvents="none">ft</InputElement>
          <Input
            id={`${id}-feet`}
            aria-label={`${fieldLabel} feet`}
            type="number"
            min="0"
            value={typeof feet === 'number' ? feet : ''}
            onChange={(e) => handleFeetChange(e.target.value, parseInt(e.target.value) || 0)}
            inputMode="numeric"
            pl="10"
            w="full"
          />
        </Box>
        <Box display="flex" flex={1} minW={0} w="full" position="relative">
          <InputElement pointerEvents="none">in</InputElement>
          <Input
            id={`${id}-inches`}
            aria-label={`${fieldLabel} inches`}
            type="number"
            min="0"
            step="0.25"
            value={typeof inches === 'number' ? inches : ''}
            onChange={(e) => handleInchesChange(e.target.value, parseFloat(e.target.value) || 0)}
            inputMode="decimal"
            pl="10"
            w="full"
          />
        </Box>
      </HStack>
      {/* Hidden computed decimal feet value for native form submit */}
      <input
        type="hidden"
        name={name}
        value={Number.isFinite(decimalFeet) ? String(decimalFeet) : ''}
      />
    </>
  );
};

export default FeetInchesInput;
