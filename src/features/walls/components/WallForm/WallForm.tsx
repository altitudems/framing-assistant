import React from 'react';
import { Button, Select, Input, Box } from '@chakra-ui/react';
import type { WallFormValues } from '../../types/WallForm.types';
import styles from './WallForm.module.css';

interface WallFormProps {
  initialValues?: WallFormValues;
  onSubmit: (values: WallFormValues) => void;
}

const WallForm: React.FC<WallFormProps> = ({ initialValues, onSubmit }) => {
  const [bottomPlate, setBottomPlate] = React.useState<WallFormValues['bottomPlate']>(
    initialValues?.bottomPlate ?? 'standard',
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const bottomPlateValue =
      (data.get('bottomPlate') as WallFormValues['bottomPlate']) || 'standard';
    const values: WallFormValues = {
      name: (data.get('name') as string) || '',
      length: Number(data.get('length')),
      height: Number(data.get('height')),
      studSpacing: (data.get('studSpacing') as '16' | '24') || '16',
      topPlate: (data.get('topPlate') as 'single' | 'double') || 'double',
      bottomPlate: bottomPlateValue,
    };
    if (bottomPlateValue === 'floating') {
      values.floorGap = Number(data.get('floorGap'));
    }
    onSubmit(values);
  };

  return (
    <form className={styles.wallForm} onSubmit={handleSubmit}>
      <Box>
        <label htmlFor="name">Name</label>
        <Input id="name" name="name" defaultValue={initialValues?.name} required />
      </Box>
      <Box>
        <label htmlFor="length">Length (ft)</label>
        <Input
          id="length"
          name="length"
          type="number"
          defaultValue={initialValues?.length}
          required
        />
      </Box>
      <Box>
        <label htmlFor="height">Height (ft)</label>
        <Input
          id="height"
          name="height"
          type="number"
          defaultValue={initialValues?.height}
          required
        />
      </Box>
      <Box>
        <label htmlFor="studSpacing">Stud Spacing</label>
        <Select
          id="studSpacing"
          name="studSpacing"
          defaultValue={initialValues?.studSpacing ?? '16'}
        >
          <option value="16">16" OC</option>
          <option value="24">24" OC</option>
        </Select>
      </Box>
      <Box>
        <label htmlFor="topPlate">Top Plate</label>
        <Select id="topPlate" name="topPlate" defaultValue={initialValues?.topPlate ?? 'double'}>
          <option value="single">Single</option>
          <option value="double">Double</option>
        </Select>
      </Box>
      <Box>
        <label htmlFor="bottomPlate">Bottom Plate Type</label>
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
      </Box>
      {bottomPlate === 'floating' && (
        <Box>
          <label htmlFor="floorGap">Floor Gap (in)</label>
          <Input
            id="floorGap"
            name="floorGap"
            type="number"
            step={0.1}
            defaultValue={initialValues?.floorGap}
            required
          />
        </Box>
      )}
      <Button type="submit" colorScheme="blue">
        Save Wall
      </Button>
    </form>
  );
};

export default WallForm;
