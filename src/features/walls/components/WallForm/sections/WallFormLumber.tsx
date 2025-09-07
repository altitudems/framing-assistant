import {
  Heading,
  Field,
  ButtonGroup,
  Button,
  Box,
  Input,
  InputElement,
  SimpleGrid,
} from '@chakra-ui/react';

interface WallFormLumberProps {
  lumberSize: '2x4' | '2x6';
  studLength: 8 | 10 | 12 | 14 | 16;
  plateLength: 8 | 10 | 12 | 14 | 16;
  studUnitCost: number;
  plateUnitCost: number;
  pressureTreatedPlateCost: number;
  wallLength?: number;
  wallHeight?: number;
  onLumberSizeChange?: (value: '2x4' | '2x6') => void;
  onStudLengthChange?: (value: 8 | 10 | 12 | 14 | 16) => void;
  onPlateLengthChange?: (value: 8 | 10 | 12 | 14 | 16) => void;
  onStudUnitCostChange?: (value: number) => void;
  onPlateUnitCostChange?: (value: number) => void;
  onPressureTreatedPlateCostChange?: (value: number) => void;
}

export function WallFormLumber({
  lumberSize,
  studLength,
  plateLength,
  studUnitCost,
  plateUnitCost,
  pressureTreatedPlateCost,
  wallLength,
  wallHeight,
  onLumberSizeChange,
  onStudLengthChange,
  onPlateLengthChange,
  onStudUnitCostChange,
  onPlateUnitCostChange,
  onPressureTreatedPlateCostChange,
}: WallFormLumberProps) {
  return (
    <>
      <Heading as="h3" size="sm">
        Lumber Selection
      </Heading>

      <Field.Root>
        <Field.Label>Lumber Size</Field.Label>
        <ButtonGroup size="sm" variant="outline" attached>
          <Button
            variant={lumberSize === '2x4' ? 'solid' : 'outline'}
            onClick={() => onLumberSizeChange?.('2x4')}
          >
            2×4
          </Button>
          <Button
            variant={lumberSize === '2x6' ? 'solid' : 'outline'}
            onClick={() => onLumberSizeChange?.('2x6')}
          >
            2×6
          </Button>
        </ButtonGroup>
        <Field.HelperText>Select lumber dimensions</Field.HelperText>
      </Field.Root>

      <Field.Root>
        <Field.Label>Stud Length</Field.Label>
        <ButtonGroup size="sm" variant="outline" attached>
          <Button
            variant={studLength === 8 ? 'solid' : 'outline'}
            onClick={() => onStudLengthChange?.(8)}
          >
            8 ft
          </Button>
          <Button
            variant={studLength === 10 ? 'solid' : 'outline'}
            onClick={() => onStudLengthChange?.(10)}
          >
            10 ft
          </Button>
          <Button
            variant={studLength === 12 ? 'solid' : 'outline'}
            onClick={() => onStudLengthChange?.(12)}
          >
            12 ft
          </Button>
          <Button
            variant={studLength === 14 ? 'solid' : 'outline'}
            onClick={() => onStudLengthChange?.(14)}
          >
            14 ft
          </Button>
          <Button
            variant={studLength === 16 ? 'solid' : 'outline'}
            onClick={() => onStudLengthChange?.(16)}
          >
            16 ft
          </Button>
        </ButtonGroup>
        <Field.HelperText>
          {wallHeight && studLength < wallHeight
            ? `⚠️ Selected length (${studLength} ft) is shorter than wall height (${wallHeight} ft)`
            : `Choose length that accommodates wall height (${wallHeight || 0} ft)`}
        </Field.HelperText>
      </Field.Root>

      <Field.Root>
        <Field.Label>Plate Length</Field.Label>
        <ButtonGroup size="sm" variant="outline" attached>
          <Button
            variant={plateLength === 8 ? 'solid' : 'outline'}
            onClick={() => onPlateLengthChange?.(8)}
          >
            8 ft
          </Button>
          <Button
            variant={plateLength === 10 ? 'solid' : 'outline'}
            onClick={() => onPlateLengthChange?.(10)}
          >
            10 ft
          </Button>
          <Button
            variant={plateLength === 12 ? 'solid' : 'outline'}
            onClick={() => onPlateLengthChange?.(12)}
          >
            12 ft
          </Button>
          <Button
            variant={plateLength === 14 ? 'solid' : 'outline'}
            onClick={() => onPlateLengthChange?.(14)}
          >
            14 ft
          </Button>
          <Button
            variant={plateLength === 16 ? 'solid' : 'outline'}
            onClick={() => onPlateLengthChange?.(16)}
          >
            16 ft
          </Button>
        </ButtonGroup>
        <Field.HelperText>
          {wallLength && plateLength < wallLength
            ? `⚠️ Selected length (${plateLength} ft) is shorter than wall length (${wallLength} ft)`
            : `Choose length that accommodates wall length (${wallLength || 0} ft)`}
        </Field.HelperText>
      </Field.Root>

      <Heading as="h3" size="sm" mt={6}>
        Unit Costs
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
        <Field.Root>
          <Field.Label>Studs</Field.Label>
          <Box display="flex" position="relative">
            <InputElement pointerEvents="none">$</InputElement>
            <Input
              type="number"
              step="0.01"
              value={studUnitCost}
              onChange={(e) => onStudUnitCostChange?.(Number(e.target.value))}
              pl="6"
            />
          </Box>
          <Field.HelperText>Per {lumberSize} stud</Field.HelperText>
        </Field.Root>
        <Field.Root>
          <Field.Label>Regular Plates</Field.Label>
          <Box display="flex" position="relative">
            <InputElement pointerEvents="none">$</InputElement>
            <Input
              type="number"
              step="0.01"
              value={plateUnitCost}
              onChange={(e) => onPlateUnitCostChange?.(Number(e.target.value))}
              pl="6"
            />
          </Box>
          <Field.HelperText>Per {lumberSize} plate</Field.HelperText>
        </Field.Root>
        <Field.Root>
          <Field.Label>Pressure-Treated Plates</Field.Label>
          <Box display="flex" position="relative">
            <InputElement pointerEvents="none">$</InputElement>
            <Input
              type="number"
              step="0.01"
              value={pressureTreatedPlateCost}
              onChange={(e) => onPressureTreatedPlateCostChange?.(Number(e.target.value))}
              pl="6"
            />
          </Box>
          <Field.HelperText>Per {lumberSize} PT plate</Field.HelperText>
        </Field.Root>
      </SimpleGrid>
    </>
  );
}
