import React from 'react';
import { Button, Select, TextField } from '../../../../shared/components/Form';
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
      <TextField label="Name" name="name" defaultValue={initialValues?.name} required />
      <TextField
        label="Length (ft)"
        name="length"
        type="number"
        defaultValue={initialValues?.length}
        required
      />
      <TextField
        label="Height (ft)"
        name="height"
        type="number"
        defaultValue={initialValues?.height}
        required
      />
      <Select
        label="Stud Spacing"
        name="studSpacing"
        options={[
          { value: '16', label: '16" OC' },
          { value: '24', label: '24" OC' },
        ]}
        defaultValue={initialValues?.studSpacing ?? '16'}
      />
      <Select
        label="Top Plate"
        name="topPlate"
        options={[
          { value: 'single', label: 'Single' },
          { value: 'double', label: 'Double' },
        ]}
        defaultValue={initialValues?.topPlate ?? 'double'}
      />
      <Select
        label="Bottom Plate Type"
        name="bottomPlate"
        options={[
          { value: 'standard', label: 'Standard' },
          { value: 'floating', label: 'Floating' },
          { value: 'pressure-treated', label: 'Pressure-Treated' },
        ]}
        value={bottomPlate}
        onChange={(e) => setBottomPlate(e.target.value as WallFormValues['bottomPlate'])}
      />
      {bottomPlate === 'floating' && (
        <TextField
          label="Floor Gap (in)"
          name="floorGap"
          type="number"
          step={0.1}
          defaultValue={initialValues?.floorGap}
          required
        />
      )}
      <Button type="submit" colorVariant="primary">
        Save Wall
      </Button>
    </form>
  );
};

export default WallForm;
