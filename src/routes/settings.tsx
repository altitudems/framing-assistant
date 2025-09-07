import { createFileRoute } from '@tanstack/react-router';
import { Box, Heading, Text, VStack, Field, Input, HStack, Card } from '@chakra-ui/react';
import { usePricingConfig, useUpdatePricingConfig } from '../features/walls/hooks/usePricing';

export const Route = createFileRoute('/settings')({
  component: SettingsPage,
});

function SettingsPage() {
  const { data: config } = usePricingConfig();
  const updatePricing = useUpdatePricingConfig();
  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>
        Settings
      </Heading>
      <Card.Root>
        <Card.Body>
          <Heading as="h2" size="md" mb={2}>
            Project Pricing
          </Heading>
          <Text color="fg.muted" mb={4}>
            Defaults used across all projects and walls.
          </Text>
          <VStack align="stretch" gap={4}>
            <HStack gap={4} align="end" wrap="wrap">
              <Field.Root>
                <Field.Label>Stud unit cost ($)</Field.Label>
                <Input
                  type="number"
                  step="0.01"
                  value={config?.studUnitCost || 0}
                  onChange={(e) => updatePricing.mutate({ studUnitCost: Number(e.target.value) })}
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Plate unit cost ($)</Field.Label>
                <Input
                  type="number"
                  step="0.01"
                  value={config?.plateUnitCost || 0}
                  onChange={(e) => updatePricing.mutate({ plateUnitCost: Number(e.target.value) })}
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>PT plate unit cost ($)</Field.Label>
                <Input
                  type="number"
                  step="0.01"
                  value={config?.pressureTreatedPlateCost || 0}
                  onChange={(e) =>
                    updatePricing.mutate({ pressureTreatedPlateCost: Number(e.target.value) })
                  }
                />
              </Field.Root>
            </HStack>
          </VStack>
        </Card.Body>
      </Card.Root>
    </Box>
  );
}
