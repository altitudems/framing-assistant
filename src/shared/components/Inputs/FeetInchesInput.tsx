import React from 'react';
import {
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react';

interface FeetInchesInputProps {
  id: string;
  name: string;
  fieldLabel: string;
  defaultValueDecimalFeet?: number;
  isRequired?: boolean;
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
  isRequired,
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
      <HStack spacing={2} align="stretch" w="full">
        <InputGroup flex={1} minW={0} w="full">
          <InputLeftAddon borderRightRadius={0} borderRightWidth={0}>
            ft
          </InputLeftAddon>
          <NumberInput
            min={0}
            precision={0}
            value={typeof feet === 'number' ? feet : ''}
            onChange={handleFeetChange}
            clampValueOnBlur={false}
            w="full"
          >
            <NumberInputField
              id={`${id}-feet`}
              aria-label={`${fieldLabel} feet`}
              required={isRequired}
              inputMode="numeric"
              borderLeftRadius={0}
              pr="2rem"
              w="full"
            />
            <NumberInputStepper right={0} w="1.75rem">
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </InputGroup>
        <InputGroup flex={1} minW={0} w="full">
          <InputLeftAddon borderRightRadius={0} borderRightWidth={0}>
            in
          </InputLeftAddon>
          <NumberInput
            min={0}
            precision={2}
            step={0.25}
            value={typeof inches === 'number' ? inches : ''}
            onChange={handleInchesChange}
            clampValueOnBlur={false}
            w="full"
          >
            <NumberInputField
              id={`${id}-inches`}
              aria-label={`${fieldLabel} inches`}
              required={isRequired}
              inputMode="decimal"
              borderLeftRadius={0}
              pr="2rem"
              w="full"
            />
            <NumberInputStepper right={0} w="1.75rem">
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </InputGroup>
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
