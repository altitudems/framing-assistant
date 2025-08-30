import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  SimpleGrid,
  Stack,
  Tooltip,
  Heading,
  Divider,
  Switch,
} from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import type { WallFormValues } from '../../types/WallForm.types';
import styles from './WallForm.module.css';
import FeetInchesInput from '../../../../shared/components/Inputs/FeetInchesInput';

interface WallFormProps {
  initialValues?: WallFormValues;
  onSubmit: (values: WallFormValues) => void;
}

const WallForm: React.FC<WallFormProps> = ({ initialValues, onSubmit }) => {
  const [bottomPlate, setBottomPlate] = React.useState<WallFormValues['bottomPlate']>(
    initialValues?.bottomPlate ?? 'standard',
  );
  const [isLoadBearing, setIsLoadBearing] = React.useState<boolean>(
    initialValues?.loadBearing ?? false,
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const bottomPlateValue =
      (data.get('bottomPlate') as WallFormValues['bottomPlate']) || 'standard';
    const lengthDecimalFeet = Number(data.get('length'));
    const heightDecimalFeet = Number(data.get('height'));
    const values: WallFormValues = {
      name: (data.get('name') as string) || '',
      length: lengthDecimalFeet,
      height: heightDecimalFeet,
      studSpacing: (data.get('studSpacing') as '16' | '24') || '16',
      topPlate: (data.get('topPlate') as 'single' | 'double') || 'double',
      bottomPlate: bottomPlateValue,
      loadBearing: data.get('loadBearing') === 'on',
      bottomPlateTreatment:
        (data.get('bottomPlateTreatment') as 'none' | 'pressure-treated') || 'none',
      leftCorner: (data.get('leftCorner') as 'double' | 'three-stud' | 'california') || undefined,
      rightCorner: (data.get('rightCorner') as 'double' | 'three-stud' | 'california') || undefined,
    };
    if (bottomPlateValue === 'floating') {
      values.floorGap = Number(data.get('floorGap'));
    }
    onSubmit(values);
  };

  return (
    <form className={styles.wallForm} onSubmit={handleSubmit}>
      <Stack spacing={6}>
        <Box>
          <Heading as="h2" size="md" mb={2}>
            Wall Details
          </Heading>
          <Divider />
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          <FormControl isRequired>
            <FormLabel htmlFor="name">
              Name{' '}
              <Tooltip label="Give this wall a clear name (e.g., North Wall)">
                <InfoOutlineIcon aria-hidden="true" focusable="false" />
              </Tooltip>
            </FormLabel>
            <Input id="name" name="name" defaultValue={initialValues?.name} />
            <FormHelperText>Example: "Wall A" or "North Exterior"</FormHelperText>
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="length">
              Length (ft){' '}
              <Tooltip label="Measured along the bottom/top plate. Enter feet and inches.">
                <InfoOutlineIcon aria-hidden="true" focusable="false" />
              </Tooltip>
            </FormLabel>
            <FeetInchesInput
              id="length"
              name="length"
              fieldLabel="Length"
              defaultValueDecimalFeet={initialValues?.length}
              isRequired
            />
            <FormHelperText>Typical interior walls: 8–20 ft</FormHelperText>
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="height">
              Height (ft){' '}
              <Tooltip label="Finished wall height. Enter feet and inches.">
                <InfoOutlineIcon aria-hidden="true" focusable="false" />
              </Tooltip>
            </FormLabel>
            <FeetInchesInput
              id="height"
              name="height"
              fieldLabel="Height"
              defaultValueDecimalFeet={initialValues?.height}
              isRequired
            />
            <FormHelperText>Common heights: 8 ft, 9 ft, 10 ft</FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="loadBearing">
              Load Bearing{' '}
              <Tooltip label="Load-bearing walls typically require double top plates and larger headers">
                <InfoOutlineIcon aria-hidden="true" focusable="false" />
              </Tooltip>
            </FormLabel>
            <Switch
              id="loadBearing"
              name="loadBearing"
              isChecked={isLoadBearing}
              onChange={(e) => setIsLoadBearing(e.target.checked)}
            />
            <FormHelperText>Toggle if this wall supports load from above</FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="studSpacing">
              Stud Spacing{' '}
              <Tooltip label="OC = on-center spacing between studs">
                <InfoOutlineIcon aria-hidden="true" focusable="false" />
              </Tooltip>
            </FormLabel>
            <Select
              id="studSpacing"
              name="studSpacing"
              defaultValue={initialValues?.studSpacing ?? '16'}
            >
              <option value="16">16" OC (standard)</option>
              <option value="24">24" OC (lighter)</option>
            </Select>
            <FormHelperText>16" OC is typical; 24" OC reduces studs</FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="topPlate">
              Top Plate{' '}
              <Tooltip label="Double plates are common for load transfer and overlap">
                <InfoOutlineIcon aria-hidden="true" focusable="false" />
              </Tooltip>
            </FormLabel>
            <Select
              id="topPlate"
              name="topPlate"
              defaultValue={initialValues?.topPlate ?? 'double'}
            >
              <option value="single">Single</option>
              <option value="double">Double</option>
            </Select>
            <FormHelperText>
              Double is standard; single for non-load-bearing in some cases
            </FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="bottomPlate">
              Bottom Plate Type{' '}
              <Tooltip label="Floating plates allow a small gap for slab movement">
                <InfoOutlineIcon aria-hidden="true" focusable="false" />
              </Tooltip>
            </FormLabel>
            <Select
              id="bottomPlate"
              name="bottomPlate"
              value={bottomPlate}
              onChange={(e) => setBottomPlate(e.target.value as WallFormValues['bottomPlate'])}
            >
              <option value="standard">Standard</option>
              <option value="floating">Floating</option>
              <option value="pressure-treated">Pressure-Treated</option>
            </Select>
            <FormHelperText>Use pressure-treated where wood contacts concrete</FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="bottomPlateTreatment">
              Bottom Plate Treatment{' '}
              <Tooltip label="Use pressure-treated lumber anywhere wood meets concrete or moisture">
                <InfoOutlineIcon aria-hidden="true" focusable="false" />
              </Tooltip>
            </FormLabel>
            <Select
              id="bottomPlateTreatment"
              name="bottomPlateTreatment"
              defaultValue={initialValues?.bottomPlateTreatment ?? 'none'}
            >
              <option value="none">None</option>
              <option value="pressure-treated">Pressure-Treated</option>
            </Select>
            <FormHelperText>Floating walls may still require PT plates</FormHelperText>
          </FormControl>

          {bottomPlate === 'floating' && (
            <FormControl isRequired>
              <FormLabel htmlFor="floorGap">
                Floor Gap (in){' '}
                <Tooltip label="Gap between slab and bottom plate for movement">
                  <InfoOutlineIcon aria-hidden="true" focusable="false" />
                </Tooltip>
              </FormLabel>
              <InputGroup>
                <InputLeftAddon>in</InputLeftAddon>
                <NumberInput min={0} precision={1} step={0.1} w="full">
                  <NumberInputField
                    id="floorGap"
                    name="floorGap"
                    defaultValue={initialValues?.floorGap}
                    inputMode="decimal"
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </InputGroup>
              <FormHelperText>Common: 1.0–2.0 in</FormHelperText>
            </FormControl>
          )}

          <FormControl>
            <FormLabel htmlFor="leftCorner">
              Left Corner Type{' '}
              <Tooltip label="Select corner build-up for the left end of the wall">
                <InfoOutlineIcon aria-hidden="true" focusable="false" />
              </Tooltip>
            </FormLabel>
            <Select
              id="leftCorner"
              name="leftCorner"
              defaultValue={initialValues?.leftCorner ?? ''}
            >
              <option value="">None</option>
              <option value="double">Double</option>
              <option value="three-stud">3-Stud</option>
              <option value="california">California</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="rightCorner">
              Right Corner Type{' '}
              <Tooltip label="Select corner build-up for the right end of the wall">
                <InfoOutlineIcon aria-hidden="true" focusable="false" />
              </Tooltip>
            </FormLabel>
            <Select
              id="rightCorner"
              name="rightCorner"
              defaultValue={initialValues?.rightCorner ?? ''}
            >
              <option value="">None</option>
              <option value="double">Double</option>
              <option value="three-stud">3-Stud</option>
              <option value="california">California</option>
            </Select>
          </FormControl>
        </SimpleGrid>

        <Box>
          <Button type="submit" colorScheme="blue">
            Save Wall
          </Button>
        </Box>
      </Stack>
    </form>
  );
};

export default WallForm;
