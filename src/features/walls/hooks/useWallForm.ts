import { useState, useMemo, type FormEvent } from 'react';
import type { CreateWallRequest } from '../../../shared/api';
import {
  calculateRegularStuds,
  calculateCornerStuds,
  calculatePlateCount,
  feetToInches,
} from '../utils/wallDimensions';
import {
  calculateStudsNeeded,
  calculatePlatesNeeded,
  calculateTotalLinearFeet,
  calculateStudLinearFeet,
  calculatePlateLinearFeet,
} from '../utils/wallLumber';
import { calculateStudCost, calculatePlateCost, calculateTotalCost } from '../utils/wallCosts';
import { usePricingConfig } from './usePricing';

interface UseWallFormProps {
  initialValues?: Partial<CreateWallRequest>;
  onSubmit: (values: CreateWallRequest) => void;
}

interface WallFormState {
  nameValue: string;
  lengthValue: number | undefined;
  heightValue: number | undefined;
  studSpacing: '12' | '16' | '24';
  topPlate: 'single' | 'double';
  bottomPlate: 'standard' | 'floating';
  bottomPlateTreatment: 'none' | 'pressure-treated';
  leftCorner: 'california' | 'double' | 'three-stud' | undefined;
  rightCorner: 'california' | 'double' | 'three-stud' | undefined;
  floorGap: number | undefined;
  isLoadBearing: boolean;
}

interface WallFormCalculations {
  regularStuds: number;
  totalCornerStuds: number;
  totalStuds: number;
  totalPlates: number;
  studsNeeded: number;
  platesNeeded: number;
  studLinearFeet: number;
  plateLinearFeet: number;
  totalLinearFeet: number;
  studCost: number;
  plateCost: number;
  totalCost: number;
}

interface ValidationState {
  nameError: string | null;
  lengthError: string | null;
  heightError: string | null;
}

export function useWallForm({ initialValues, onSubmit }: UseWallFormProps) {
  const { data: pricingConfig } = usePricingConfig();

  // Form state
  const [formState, setFormState] = useState<WallFormState>({
    nameValue: initialValues?.name ?? '',
    lengthValue: initialValues?.length,
    heightValue: initialValues?.height,
    studSpacing: initialValues?.studSpacing ?? '16',
    topPlate: initialValues?.topPlate ?? 'double',
    bottomPlate: initialValues?.bottomPlate ?? 'standard',
    bottomPlateTreatment: initialValues?.bottomPlateTreatment ?? 'none',
    leftCorner: initialValues?.leftCorner,
    rightCorner: initialValues?.rightCorner,
    floorGap: initialValues?.floorGap,
    isLoadBearing: initialValues?.loadBearing ?? false,
  });

  // Validation state
  const [validation, setValidation] = useState<ValidationState>({
    nameError: null,
    lengthError: null,
    heightError: null,
  });

  // Calculations
  const calculations = useMemo<WallFormCalculations>(() => {
    const wallLength = Number(formState.lengthValue ?? 0);
    const wallHeight = Number(formState.heightValue ?? 0);
    const lengthInches = feetToInches(wallLength);
    const spacing = Number(formState.studSpacing);

    // Calculate studs
    const regularStuds = calculateRegularStuds(lengthInches, spacing);
    const { totalCornerStuds } = calculateCornerStuds(formState.leftCorner, formState.rightCorner);
    const totalStuds = regularStuds + totalCornerStuds;

    // Calculate plates
    const totalPlates = calculatePlateCount(formState.topPlate, formState.bottomPlate);

    // Calculate lumber needs
    const studsNeeded = calculateStudsNeeded(totalStuds, wallHeight, 8); // Default stud length
    const platesNeeded = calculatePlatesNeeded(totalPlates, wallLength, 8); // Default plate length

    // Calculate linear feet
    const studLinearFeet = calculateStudLinearFeet(studsNeeded, 8);
    const plateLinearFeet = calculatePlateLinearFeet(platesNeeded, 8);
    const totalLinearFeet = calculateTotalLinearFeet(studLinearFeet, plateLinearFeet);

    // Calculate costs using pricing config
    const studUnitCost = pricingConfig?.studUnitCost ?? 3.5;
    const plateUnitCost = pricingConfig?.plateUnitCost ?? 3.5;
    const pressureTreatedPlateCost = pricingConfig?.pressureTreatedPlateCost ?? 4.25;

    const studCost = calculateStudCost(studsNeeded, studUnitCost);
    const plateCost = calculatePlateCost(
      platesNeeded,
      plateUnitCost,
      formState.bottomPlate === 'floating',
      formState.bottomPlateTreatment === 'pressure-treated',
      pressureTreatedPlateCost,
    );
    const totalCost = calculateTotalCost(studCost, plateCost);

    return {
      regularStuds,
      totalCornerStuds,
      totalStuds,
      totalPlates,
      studsNeeded,
      platesNeeded,
      studLinearFeet,
      plateLinearFeet,
      totalLinearFeet,
      studCost,
      plateCost,
      totalCost,
    };
  }, [formState, pricingConfig]);

  // Form validation
  const validateBasics = () => {
    const newValidation: ValidationState = {
      nameError: null,
      lengthError: null,
      heightError: null,
    };

    let valid = true;

    if (!formState.nameValue || !formState.nameValue.trim()) {
      newValidation.nameError = 'Name is required';
      valid = false;
    }

    if (!Number.isFinite(formState.lengthValue ?? 0) || (formState.lengthValue ?? 0) <= 0) {
      newValidation.lengthError = 'Enter a valid positive length';
      valid = false;
    }

    if (!Number.isFinite(formState.heightValue ?? 0) || (formState.heightValue ?? 0) <= 0) {
      newValidation.heightError = 'Enter a valid positive height';
      valid = false;
    }

    setValidation(newValidation);
    return valid;
  };

  // Form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateBasics()) return;

    const values: CreateWallRequest = {
      name: (formState.nameValue ?? '').trim(),
      length: Number(formState.lengthValue ?? 0),
      height: Number(formState.heightValue ?? 0),
      studSpacing: formState.studSpacing,
      topPlate: formState.topPlate,
      bottomPlate: formState.bottomPlate,
      loadBearing: formState.isLoadBearing,
      bottomPlateTreatment: formState.bottomPlateTreatment,
      leftCorner: formState.leftCorner || undefined,
      rightCorner: formState.rightCorner || undefined,
      floorGap: formState.bottomPlate === 'floating' ? Number(formState.floorGap ?? 0) : undefined,
    };

    await onSubmit(values);
  };

  // Preset handlers
  const applyPresetLoadBearing = () => {
    setFormState((prev) => ({
      ...prev,
      studSpacing: '16',
      topPlate: 'double',
      bottomPlate: 'standard',
      bottomPlateTreatment: 'none',
      leftCorner: 'california',
      rightCorner: 'california',
      isLoadBearing: true,
      heightValue: prev.heightValue || 9,
    }));
  };

  const applyPresetNonLoadBearing = () => {
    setFormState((prev) => ({
      ...prev,
      studSpacing: '16',
      topPlate: 'single',
      bottomPlate: 'standard',
      bottomPlateTreatment: 'none',
      leftCorner: 'california',
      rightCorner: undefined,
      isLoadBearing: false,
      heightValue: prev.heightValue || 8,
    }));
  };

  const applyPresetBasementFloating = () => {
    setFormState((prev) => ({
      ...prev,
      heightValue: 8,
      studSpacing: '16',
      topPlate: 'single',
      bottomPlate: 'floating',
      bottomPlateTreatment: 'pressure-treated',
      floorGap: 2,
      leftCorner: 'california',
      rightCorner: 'california',
      isLoadBearing: false,
    }));
  };

  return {
    formState,
    setFormState,
    validation,
    calculations,
    handleSubmit,
    applyPresetLoadBearing,
    applyPresetNonLoadBearing,
    applyPresetBasementFloating,
  };
}
