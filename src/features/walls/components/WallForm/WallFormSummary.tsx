import { Badge, Box, Card, HStack, Heading, Text, VStack, Separator } from '@chakra-ui/react';
import type { WallFormValues } from '../../types/WallForm.types';

interface WallFormSummaryProps {
  formState: {
    nameValue: string;
    lengthValue?: number;
    heightValue?: number;
    isLoadBearing: boolean;
    studSpacing: string;
    leftCorner?: WallFormValues['leftCorner'];
    rightCorner?: WallFormValues['rightCorner'];
    bottomPlate: WallFormValues['bottomPlate'];
    floorGap?: number;
    studLength: number;
    plateLength: number;
    lumberSize: string;
  };
  calculations: {
    studsNeeded: number;
    platesNeeded: number;
    totalLinearFeet: number;
    studCost: number;
    plateCost: number;
    totalCost: number;
  };
}

export function WallFormSummary({ formState, calculations }: WallFormSummaryProps) {
  const formatCornerType = (type: WallFormValues['leftCorner'] | WallFormValues['rightCorner']) => {
    if (!type) return 'None';
    return type === 'double'
      ? 'Double'
      : type === 'three-stud'
        ? '3-Stud'
        : type === 'california'
          ? 'California'
          : type;
  };

  return (
    <Card.Root bg={{ base: 'gray.50', _dark: 'gray.900' }}>
      <Card.Body p={4}>
        <Heading
          as="h3"
          size="sm"
          mb={3}
          color={{ base: 'gray.800', _dark: 'gray.100' }}
          fontWeight="semibold"
        >
          {formState.nameValue || 'Unnamed Wall'} - Summary
        </Heading>

        <VStack align="stretch" gap={4}>
          {/* Wall Details */}
          <Box>
            <Text
              fontSize="xs"
              fontWeight="medium"
              color={{ base: 'gray.600', _dark: 'gray.400' }}
              mb={3}
              textTransform="uppercase"
              letterSpacing="wide"
            >
              Wall Details
            </Text>
            <VStack align="stretch" gap={2}>
              {formState.nameValue && (
                <HStack justify="space-between">
                  <Text fontSize="sm" color={{ base: 'gray.600', _dark: 'gray.400' }}>
                    Name
                  </Text>
                  <Text
                    fontSize="sm"
                    fontWeight="medium"
                    color={{ base: 'gray.900', _dark: 'gray.100' }}
                  >
                    {formState.nameValue}
                  </Text>
                </HStack>
              )}
              <HStack justify="space-between">
                <Text fontSize="sm" color={{ base: 'gray.600', _dark: 'gray.400' }}>
                  Length
                </Text>
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  color={{ base: 'gray.900', _dark: 'gray.100' }}
                >
                  {Number(formState.lengthValue ?? 0).toFixed(1)} ft
                </Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="sm" color={{ base: 'gray.600', _dark: 'gray.400' }}>
                  Height
                </Text>
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  color={{ base: 'gray.900', _dark: 'gray.100' }}
                >
                  {Number(formState.heightValue ?? 0).toFixed(1)} ft
                </Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="sm" color={{ base: 'gray.600', _dark: 'gray.400' }}>
                  Load-bearing
                </Text>
                <Badge
                  colorPalette={formState.isLoadBearing ? 'red' : 'green'}
                  variant="subtle"
                  size="sm"
                >
                  {formState.isLoadBearing ? 'Yes' : 'No'}
                </Badge>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="sm" color={{ base: 'gray.600', _dark: 'gray.400' }}>
                  Stud spacing
                </Text>
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  color={{ base: 'gray.900', _dark: 'gray.100' }}
                >
                  {formState.studSpacing}" OC
                </Text>
              </HStack>
              {(formState.leftCorner || formState.rightCorner) && (
                <HStack justify="space-between">
                  <Text fontSize="sm" color={{ base: 'gray.600', _dark: 'gray.400' }}>
                    Corners
                  </Text>
                  <Text
                    fontSize="sm"
                    fontWeight="medium"
                    color={{ base: 'gray.900', _dark: 'gray.100' }}
                  >
                    {formatCornerType(formState.leftCorner)} /{' '}
                    {formatCornerType(formState.rightCorner)}
                  </Text>
                </HStack>
              )}
              {formState.bottomPlate === 'floating' && formState.floorGap !== undefined && (
                <HStack justify="space-between">
                  <Text fontSize="sm" color={{ base: 'gray.600', _dark: 'gray.400' }}>
                    Floating floor gap
                  </Text>
                  <Text
                    fontSize="sm"
                    fontWeight="medium"
                    color={{ base: 'gray.900', _dark: 'gray.100' }}
                  >
                    {formState.floorGap}"
                  </Text>
                </HStack>
              )}
            </VStack>
          </Box>

          {/* Lumber Summary */}
          <VStack align="stretch" gap={2} mt={4}>
            <HStack justify="space-between" align="center">
              <Text
                fontSize="sm"
                fontWeight="medium"
                color={{ base: 'gray.700', _dark: 'gray.300' }}
              >
                Lumber ({formState.lumberSize})
              </Text>
              <Text fontSize="xl" fontWeight="bold" color={{ base: 'gray.900', _dark: 'gray.100' }}>
                {calculations.totalLinearFeet.toFixed(1)} ft
              </Text>
            </HStack>
            <VStack align="stretch" gap={1} pl={2}>
              <HStack justify="space-between">
                <Text fontSize="sm" color={{ base: 'gray.600', _dark: 'gray.400' }}>
                  Studs needed
                </Text>
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  color={{ base: 'gray.900', _dark: 'gray.100' }}
                >
                  {calculations.studsNeeded} × {formState.studLength} ft
                </Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="sm" color={{ base: 'gray.600', _dark: 'gray.400' }}>
                  Plates needed
                </Text>
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  color={{ base: 'gray.900', _dark: 'gray.100' }}
                >
                  {calculations.platesNeeded} × {formState.plateLength} ft
                </Text>
              </HStack>
              <Separator my={2} />
              <HStack justify="space-between">
                <Text fontSize="sm" color={{ base: 'gray.600', _dark: 'gray.400' }}>
                  Stud cost
                </Text>
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  color={{ base: 'gray.900', _dark: 'gray.100' }}
                >
                  ${calculations.studCost.toFixed(2)}
                </Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="sm" color={{ base: 'gray.600', _dark: 'gray.400' }}>
                  Plate cost
                </Text>
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  color={{ base: 'gray.900', _dark: 'gray.100' }}
                >
                  ${calculations.plateCost.toFixed(2)}
                </Text>
              </HStack>
              <HStack justify="space-between">
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  color={{ base: 'gray.700', _dark: 'gray.300' }}
                >
                  Total cost
                </Text>
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  color={{ base: 'gray.900', _dark: 'gray.100' }}
                >
                  ${calculations.totalCost.toFixed(2)}
                </Text>
              </HStack>
            </VStack>
          </VStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}
