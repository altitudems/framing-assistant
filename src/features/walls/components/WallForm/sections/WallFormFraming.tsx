import { Heading, Field, ButtonGroup, Button, Box, Input, InputElement } from '@chakra-ui/react';
import type { WallFormValues } from '../../../types/WallForm.types';

interface WallFormFramingProps {
  studSpacing: '12' | '16' | '24';
  topPlate: 'single' | 'double';
  bottomPlate: WallFormValues['bottomPlate'];
  bottomPlateTreatment: 'none' | 'pressure-treated';
  floorGap?: number;
  onStudSpacingChange: (value: '12' | '16' | '24') => void;
  onTopPlateChange: (value: 'single' | 'double') => void;
  onBottomPlateChange: (value: WallFormValues['bottomPlate']) => void;
  onBottomPlateTreatmentChange: (value: 'none' | 'pressure-treated') => void;
  onFloorGapChange: (value: number | undefined) => void;
}

export function WallFormFraming({
  studSpacing,
  topPlate,
  bottomPlate,
  bottomPlateTreatment,
  floorGap,
  onStudSpacingChange,
  onTopPlateChange,
  onBottomPlateChange,
  onBottomPlateTreatmentChange,
  onFloorGapChange,
}: WallFormFramingProps) {
  return (
    <>
      <Heading as="h3" size="sm">
        Framing
      </Heading>

      <Field.Root>
        <Field.Label>Stud Spacing</Field.Label>
        <ButtonGroup size="sm" variant="outline" attached>
          <Button
            variant={studSpacing === '12' ? 'solid' : 'outline'}
            aria-pressed={studSpacing === '12'}
            onClick={() => onStudSpacingChange('12')}
          >
            12" OC
          </Button>
          <Button
            variant={studSpacing === '16' ? 'solid' : 'outline'}
            aria-pressed={studSpacing === '16'}
            onClick={() => onStudSpacingChange('16')}
          >
            16" OC
          </Button>
          <Button
            variant={studSpacing === '24' ? 'solid' : 'outline'}
            aria-pressed={studSpacing === '24'}
            onClick={() => onStudSpacingChange('24')}
          >
            24" OC
          </Button>
        </ButtonGroup>
        <Field.HelperText>
          16" OC is typical; 12" OC for high loads; 24" OC reduces studs
        </Field.HelperText>
      </Field.Root>

      <Field.Root>
        <Field.Label>Top Plate</Field.Label>
        <ButtonGroup size="sm" variant="outline" attached>
          <Button
            variant={topPlate === 'single' ? 'solid' : 'outline'}
            aria-pressed={topPlate === 'single'}
            onClick={() => onTopPlateChange('single')}
          >
            Single
          </Button>
          <Button
            variant={topPlate === 'double' ? 'solid' : 'outline'}
            aria-pressed={topPlate === 'double'}
            onClick={() => onTopPlateChange('double')}
          >
            Double
          </Button>
        </ButtonGroup>
        <Field.HelperText>
          Double is standard; single for non-load-bearing in some cases
        </Field.HelperText>
      </Field.Root>

      <Field.Root>
        <Field.Label>Bottom Plate Type</Field.Label>
        <ButtonGroup size="sm" variant="outline" attached>
          <Button
            variant={bottomPlate === 'standard' ? 'solid' : 'outline'}
            onClick={() => onBottomPlateChange('standard')}
          >
            Standard
          </Button>
          <Button
            variant={bottomPlate === 'floating' ? 'solid' : 'outline'}
            onClick={() => onBottomPlateChange('floating')}
          >
            Floating
          </Button>
        </ButtonGroup>
        <Field.HelperText>
          Floating walls have two plates (pressure-treated + regular)
        </Field.HelperText>
      </Field.Root>

      <Field.Root>
        <Field.Label>Bottom Plate Treatment</Field.Label>
        <ButtonGroup size="sm" variant="outline" attached>
          <Button
            variant={bottomPlateTreatment === 'none' ? 'solid' : 'outline'}
            onClick={() => onBottomPlateTreatmentChange('none')}
          >
            None
          </Button>
          <Button
            variant={bottomPlateTreatment === 'pressure-treated' ? 'solid' : 'outline'}
            onClick={() => onBottomPlateTreatmentChange('pressure-treated')}
          >
            Pressure-treated
          </Button>
        </ButtonGroup>
        <Field.HelperText>Use pressure-treated where wood contacts concrete</Field.HelperText>
      </Field.Root>

      {bottomPlate === 'floating' && (
        <Field.Root>
          <Field.Label>Floor Gap (in)</Field.Label>
          <Box display="flex" position="relative">
            <InputElement pointerEvents="none">in</InputElement>
            <Input
              type="number"
              placeholder="0"
              step="0.1"
              min="0"
              id="floorGap"
              name="floorGap"
              value={floorGap ?? ''}
              onChange={(e) =>
                onFloorGapChange(e.target.value === '' ? undefined : Number(e.target.value))
              }
              inputMode="decimal"
              pl="10"
            />
          </Box>
          <Field.HelperText>Common: 1.0–2.0 in</Field.HelperText>
        </Field.Root>
      )}
    </>
  );
}
