import React from 'react';
import { Box, SimpleGrid, Stack, Separator, Tabs } from '@chakra-ui/react';
import type { WallFormValues } from '../../types/WallForm.types';
import styles from './WallForm.module.css';
import { useWallForm } from '../../hooks/useWallForm';
import { usePricingConfig } from '../../hooks/usePricing';
import { WallFormPresets } from './WallFormPresets';
import { WallFormSummary } from './WallFormSummary';
import { WallFormIdentification } from './sections/WallFormIdentification';
import { WallFormDimensions } from './sections/WallFormDimensions';
import { WallFormFraming } from './sections/WallFormFraming';
import { WallFormCorners } from './sections/WallFormCorners';
import { WallFormLumber } from './sections/WallFormLumber';

interface WallFormProps {
  initialValues?: WallFormValues;
  onSubmit: (values: WallFormValues) => void;
  isSaving?: boolean;
}

const WallForm: React.FC<WallFormProps> = ({ initialValues, onSubmit }) => {
  const {
    formState,
    setFormState,
    validation,
    calculations,
    handleSubmit,
    applyPresetLoadBearing,
    applyPresetNonLoadBearing,
    applyPresetBasementFloating,
  } = useWallForm({ initialValues, onSubmit });

  const { data: pricingConfig } = usePricingConfig();

  const containerRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <Box
      ref={containerRef}
      role="form"
      className={styles.wallForm}
      aria-labelledby="wall-form-heading"
    >
      <form id="wall-form" onSubmit={handleSubmit} noValidate>
        <Stack gap={6}>
          <SimpleGrid columns={{ base: 1, lg: 3 }} gap={6} alignItems="start">
            <Stack gap={5} gridColumn={{ lg: 'span 2' }}>
              {/* Mobile/Tablet: stacked sections */}
              <Box display={{ base: 'block', lg: 'none' }}>
                <Stack gap={6}>
                  {/* Quick Presets */}
                  <WallFormPresets
                    onApplyLoadBearing={applyPresetLoadBearing}
                    onApplyNonLoadBearing={applyPresetNonLoadBearing}
                    onApplyBasementFloating={applyPresetBasementFloating}
                  />
                  <Separator />
                  <WallFormIdentification
                    nameValue={formState.nameValue}
                    nameError={validation.nameError}
                    onNameChange={(value) =>
                      setFormState((prev) => ({ ...prev, nameValue: value }))
                    }
                  />
                  <Separator />
                  <WallFormDimensions
                    lengthValue={formState.lengthValue}
                    heightValue={formState.heightValue}
                    isLoadBearing={formState.isLoadBearing}
                    lengthError={validation.lengthError}
                    heightError={validation.heightError}
                    onLengthChange={(value) =>
                      setFormState((prev) => ({ ...prev, lengthValue: value }))
                    }
                    onHeightChange={(value) =>
                      setFormState((prev) => ({ ...prev, heightValue: value }))
                    }
                    onLoadBearingChange={(checked) =>
                      setFormState((prev) => ({ ...prev, isLoadBearing: checked }))
                    }
                  />
                  <Separator />
                  <WallFormFraming
                    studSpacing={formState.studSpacing}
                    topPlate={formState.topPlate}
                    bottomPlate={formState.bottomPlate}
                    bottomPlateTreatment={formState.bottomPlateTreatment}
                    floorGap={formState.floorGap}
                    onStudSpacingChange={(value) =>
                      setFormState((prev) => ({ ...prev, studSpacing: value }))
                    }
                    onTopPlateChange={(value) =>
                      setFormState((prev) => ({ ...prev, topPlate: value }))
                    }
                    onBottomPlateChange={(value) =>
                      setFormState((prev) => ({ ...prev, bottomPlate: value }))
                    }
                    onBottomPlateTreatmentChange={(value) =>
                      setFormState((prev) => ({ ...prev, bottomPlateTreatment: value }))
                    }
                    onFloorGapChange={(value) =>
                      setFormState((prev) => ({ ...prev, floorGap: value }))
                    }
                  />
                  <Separator />
                  <WallFormCorners
                    leftCorner={formState.leftCorner}
                    rightCorner={formState.rightCorner}
                    onLeftCornerChange={(value) =>
                      setFormState((prev) => ({ ...prev, leftCorner: value }))
                    }
                    onRightCornerChange={(value) =>
                      setFormState((prev) => ({ ...prev, rightCorner: value }))
                    }
                  />
                  <Separator />
                  <WallFormLumber
                    lumberSize="2x4"
                    studLength={8}
                    plateLength={8}
                    studUnitCost={pricingConfig?.studUnitCost || 0}
                    plateUnitCost={pricingConfig?.plateUnitCost || 0}
                    pressureTreatedPlateCost={pricingConfig?.pressureTreatedPlateCost || 0}
                    wallLength={formState.lengthValue}
                    wallHeight={formState.heightValue}
                  />
                </Stack>
              </Box>

              {/* Desktop: tabs */}
              <Box display={{ base: 'none', lg: 'block' }}>
                <Tabs.Root defaultValue="basics">
                  <Tabs.List>
                    <Tabs.Trigger value="basics">Basics</Tabs.Trigger>
                    <Tabs.Trigger value="framing">Framing</Tabs.Trigger>
                    <Tabs.Trigger value="corners">Corners</Tabs.Trigger>
                    <Tabs.Trigger value="lumber">Lumber</Tabs.Trigger>
                  </Tabs.List>
                  <Tabs.Content value="basics">
                    <Stack gap={6}>
                      <WallFormPresets
                        onApplyLoadBearing={applyPresetLoadBearing}
                        onApplyNonLoadBearing={applyPresetNonLoadBearing}
                        onApplyBasementFloating={applyPresetBasementFloating}
                      />
                      <Separator />
                      <WallFormIdentification
                        nameValue={formState.nameValue}
                        nameError={validation.nameError}
                        onNameChange={(value) =>
                          setFormState((prev) => ({ ...prev, nameValue: value }))
                        }
                      />
                      <WallFormDimensions
                        lengthValue={formState.lengthValue}
                        heightValue={formState.heightValue}
                        isLoadBearing={formState.isLoadBearing}
                        lengthError={validation.lengthError}
                        heightError={validation.heightError}
                        onLengthChange={(value) =>
                          setFormState((prev) => ({ ...prev, lengthValue: value }))
                        }
                        onHeightChange={(value) =>
                          setFormState((prev) => ({ ...prev, heightValue: value }))
                        }
                        onLoadBearingChange={(checked) =>
                          setFormState((prev) => ({ ...prev, isLoadBearing: checked }))
                        }
                      />
                    </Stack>
                  </Tabs.Content>
                  <Tabs.Content value="framing">
                    <Stack gap={6}>
                      <WallFormFraming
                        studSpacing={formState.studSpacing}
                        topPlate={formState.topPlate}
                        bottomPlate={formState.bottomPlate}
                        bottomPlateTreatment={formState.bottomPlateTreatment}
                        floorGap={formState.floorGap}
                        onStudSpacingChange={(value) =>
                          setFormState((prev) => ({ ...prev, studSpacing: value }))
                        }
                        onTopPlateChange={(value) =>
                          setFormState((prev) => ({ ...prev, topPlate: value }))
                        }
                        onBottomPlateChange={(value) =>
                          setFormState((prev) => ({ ...prev, bottomPlate: value }))
                        }
                        onBottomPlateTreatmentChange={(value) =>
                          setFormState((prev) => ({ ...prev, bottomPlateTreatment: value }))
                        }
                        onFloorGapChange={(value) =>
                          setFormState((prev) => ({ ...prev, floorGap: value }))
                        }
                      />
                    </Stack>
                  </Tabs.Content>
                  <Tabs.Content value="corners">
                    <Stack gap={6}>
                      <WallFormCorners
                        leftCorner={formState.leftCorner}
                        rightCorner={formState.rightCorner}
                        onLeftCornerChange={(value) =>
                          setFormState((prev) => ({ ...prev, leftCorner: value }))
                        }
                        onRightCornerChange={(value) =>
                          setFormState((prev) => ({ ...prev, rightCorner: value }))
                        }
                      />
                    </Stack>
                  </Tabs.Content>
                  <Tabs.Content value="lumber">
                    <Stack gap={6}>
                      <WallFormLumber
                        lumberSize="2x4"
                        studLength={8}
                        plateLength={8}
                        studUnitCost={pricingConfig?.studUnitCost || 0}
                        plateUnitCost={pricingConfig?.plateUnitCost || 0}
                        pressureTreatedPlateCost={pricingConfig?.pressureTreatedPlateCost || 0}
                        wallLength={formState.lengthValue}
                        wallHeight={formState.heightValue}
                      />
                    </Stack>
                  </Tabs.Content>
                </Tabs.Root>
              </Box>
            </Stack>

            {/* Summary */}
            <Stack gap={4} position={{ lg: 'sticky' }} top={{ lg: 4 }}>
              <WallFormSummary
                formState={{
                  ...formState,
                  studLength: 8,
                  plateLength: 8,
                  lumberSize: '2x4',
                }}
                calculations={calculations}
              />
            </Stack>
          </SimpleGrid>
        </Stack>
      </form>
    </Box>
  );
};

export default WallForm;
