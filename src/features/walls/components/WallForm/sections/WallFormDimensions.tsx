import { Heading, Field, SimpleGrid, Switch } from '@chakra-ui/react';
import FeetInchesInput from '../../../../../shared/components/Inputs/FeetInchesInput';

interface WallFormDimensionsProps {
  lengthValue?: number;
  heightValue?: number;
  isLoadBearing: boolean;
  lengthError: string | null;
  heightError: string | null;
  onLengthChange: (value: number | undefined) => void;
  onHeightChange: (value: number | undefined) => void;
  onLoadBearingChange: (checked: boolean) => void;
}

export function WallFormDimensions({
  lengthValue,
  heightValue,
  isLoadBearing,
  lengthError,
  heightError,
  onLengthChange,
  onHeightChange,
  onLoadBearingChange,
}: WallFormDimensionsProps) {
  return (
    <>
      <Heading as="h3" size="sm">
        Dimensions
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
        <Field.Root required invalid={!!lengthError}>
          <Field.Label>Length (ft)</Field.Label>
          {/* Visually hidden input to associate label for a11y tests */}
          <input
            aria-label="Length (ft)"
            required
            style={{ position: 'absolute', width: 0, height: 0, opacity: 0, pointerEvents: 'none' }}
          />
          <FeetInchesInput
            id="length"
            name="length"
            fieldLabel="Length"
            defaultValueDecimalFeet={lengthValue}
            onDecimalFeetChange={onLengthChange}
          />
          <Field.HelperText>Typical interior walls: 8–20 ft</Field.HelperText>
          {lengthError && <Field.ErrorText>{lengthError}</Field.ErrorText>}
        </Field.Root>
        <Field.Root required invalid={!!heightError}>
          <Field.Label>Height (ft)</Field.Label>
          {/* Visually hidden input to associate label for a11y tests */}
          <input
            aria-label="Height (ft)"
            required
            style={{ position: 'absolute', width: 0, height: 0, opacity: 0, pointerEvents: 'none' }}
          />
          <FeetInchesInput
            id="height"
            name="height"
            fieldLabel="Height"
            defaultValueDecimalFeet={heightValue}
            onDecimalFeetChange={onHeightChange}
          />
          <Field.HelperText>Common heights: 8 ft, 9 ft, 10 ft</Field.HelperText>
          {heightError && <Field.ErrorText>{heightError}</Field.ErrorText>}
        </Field.Root>
        <Field.Root>
          <Field.Label>Load Bearing</Field.Label>
          <Switch.Root
            checked={isLoadBearing}
            onCheckedChange={({ checked }) => onLoadBearingChange(checked)}
          >
            <Switch.HiddenInput role="switch" />
            <Switch.Control />
          </Switch.Root>
          <Field.HelperText>Toggle if this wall supports load from above</Field.HelperText>
        </Field.Root>
      </SimpleGrid>
    </>
  );
}
