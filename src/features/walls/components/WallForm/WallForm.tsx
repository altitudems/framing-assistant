import React from 'react';
import { Button, Select, TextField } from '../../../../shared/components/Form';
import type { WallFormValues } from '../../types/WallForm.types';
import styles from './WallForm.module.css';

interface WallFormProps {
  initialValues?: WallFormValues;
  onSubmit: (values: WallFormValues) => void;
}

const WallForm: React.FC<WallFormProps> = ({ initialValues, onSubmit }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const values: WallFormValues = {
      name: (data.get('name') as string) || '',
      length: Number(data.get('length')),
      height: Number(data.get('height')),
      studSpacing: (data.get('studSpacing') as '16' | '24') || '16',
    };
    onSubmit(values);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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
      <Button type="submit" colorVariant="primary">
        Save Wall
      </Button>
    </form>
  );
};

export default WallForm;
