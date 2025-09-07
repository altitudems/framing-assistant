import { Heading, Field, ButtonGroup, Button } from '@chakra-ui/react';
import type { WallFormValues } from '../../../types/WallForm.types';

interface WallFormCornersProps {
  leftCorner?: WallFormValues['leftCorner'];
  rightCorner?: WallFormValues['rightCorner'];
  onLeftCornerChange: (value: WallFormValues['leftCorner']) => void;
  onRightCornerChange: (value: WallFormValues['rightCorner']) => void;
}

export function WallFormCorners({
  leftCorner,
  rightCorner,
  onLeftCornerChange,
  onRightCornerChange,
}: WallFormCornersProps) {
  return (
    <>
      <Heading as="h3" size="sm">
        Corners
      </Heading>
      <Field.Root>
        <Field.Label>Left Corner Type</Field.Label>
        <ButtonGroup size="sm" variant="outline" flexWrap="wrap" attached>
          <Button
            variant={!leftCorner ? 'solid' : 'outline'}
            onClick={() => onLeftCornerChange(undefined)}
          >
            None
          </Button>
          <Button
            variant={leftCorner === 'double' ? 'solid' : 'outline'}
            onClick={() => onLeftCornerChange('double')}
          >
            Double
          </Button>
          <Button
            variant={leftCorner === 'three-stud' ? 'solid' : 'outline'}
            onClick={() => onLeftCornerChange('three-stud')}
          >
            3-Stud
          </Button>
          <Button
            variant={leftCorner === 'california' ? 'solid' : 'outline'}
            onClick={() => onLeftCornerChange('california')}
          >
            California
          </Button>
        </ButtonGroup>
      </Field.Root>
      <Field.Root>
        <Field.Label>Right Corner Type</Field.Label>
        <ButtonGroup size="sm" variant="outline" flexWrap="wrap" attached>
          <Button
            variant={!rightCorner ? 'solid' : 'outline'}
            onClick={() => onRightCornerChange(undefined)}
          >
            None
          </Button>
          <Button
            variant={rightCorner === 'double' ? 'solid' : 'outline'}
            onClick={() => onRightCornerChange('double')}
          >
            Double
          </Button>
          <Button
            variant={rightCorner === 'three-stud' ? 'solid' : 'outline'}
            onClick={() => onRightCornerChange('three-stud')}
          >
            3-Stud
          </Button>
          <Button
            variant={rightCorner === 'california' ? 'solid' : 'outline'}
            onClick={() => onRightCornerChange('california')}
          >
            California
          </Button>
        </ButtonGroup>
      </Field.Root>
    </>
  );
}
