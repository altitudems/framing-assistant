import {
  HStack,
  Text,
  Badge,
  ButtonGroup,
  Card,
  VStack,
  IconButton,
  Collapsible,
  HoverCard,
} from '@chakra-ui/react';
import type { Wall, PricingConfig } from '../../../../shared/api';
import {
  calculateRegularStuds,
  calculateCornerStuds,
  calculatePlateCount,
  feetToInches,
} from '../../utils/wallDimensions';
import { calculateStudsNeeded, calculatePlatesNeeded } from '../../utils/wallLumber';
import { calculateStudCost, calculatePlateCost, calculateTotalCost } from '../../utils/wallCosts';
import { usePricingConfig } from '../../hooks/usePricing';
import { feetToFeetInches } from '../../../../shared/utils/format';
import { ChevronDown, ChevronRight, Edit2, Layers, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface WallItemProps {
  wall: Wall;
  onRemove?: (id: string) => void;
  onEdit?: (wall: Wall) => void;
  onDuplicate?: (wall: Wall) => void;
}

function WallItem({ wall, onRemove, onEdit, onDuplicate }: WallItemProps) {
  const lengthFt = Number(wall.length || 0);
  const heightFt = Number(wall.height || 0);
  const spacing = parseInt(wall.studSpacing, 10);
  const regular = calculateRegularStuds(feetToInches(lengthFt), spacing);
  const corners = calculateCornerStuds(wall.leftCorner, wall.rightCorner).totalCornerStuds;
  const studs = regular + corners;
  const plateCount = calculatePlateCount(wall.topPlate, wall.bottomPlate);
  const studsLF = studs * heightFt;
  const platesLF = plateCount * lengthFt;
  const totalLF = studsLF + platesLF;
  const ptPlateRuns =
    wall.bottomPlate === 'floating' && wall.bottomPlateTreatment === 'pressure-treated' ? 1 : 0;
  // Pricing from TanStack Query
  const { data: pricingConfig } = usePricingConfig();
  const pricing: PricingConfig = pricingConfig || {
    studUnitCost: 3.5,
    plateUnitCost: 3.5,
    pressureTreatedPlateCost: 4.25,
  };
  const studLengthFt = 8; // Default stud length
  const plateLengthFt = 8; // Default plate length
  const studUnitCost = pricing.studUnitCost;
  const plateUnitCost = pricing.plateUnitCost;
  const pressureTreatedPlateUnitCost = pricing.pressureTreatedPlateCost;

  const studsToBuy = calculateStudsNeeded(studs, heightFt, studLengthFt);
  const platesToBuy = calculatePlatesNeeded(plateCount, lengthFt, plateLengthFt);
  const estStudCost = calculateStudCost(studsToBuy, studUnitCost);
  const estPlateCost = calculatePlateCost(
    platesToBuy,
    plateUnitCost,
    wall.bottomPlate === 'floating',
    wall.bottomPlateTreatment === 'pressure-treated',
    pressureTreatedPlateUnitCost,
  );
  const estTotalCost = calculateTotalCost(estStudCost, estPlateCost);
  const [open, setOpen] = useState(false);
  return (
    <Card.Root variant="outline" size="sm">
      <Card.Body
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen((v) => !v);
          }
        }}
        tabIndex={0}
        role="button"
      >
        {/* Primary row */}
        <HStack justify="space-between" align="center" gap={4}>
          <HStack gap={2} flex={1} minW={0}>
            <IconButton
              aria-label={open ? 'Collapse' : 'Expand'}
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setOpen((v) => !v);
              }}
            >
              {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </IconButton>
            <VStack align="start" gap={1} flex={1} minW={0}>
              <Text fontWeight="semibold" fontSize="md" lineClamp={1}>
                {wall.name}
              </Text>
              <Text fontSize="sm" color="fg.muted">
                {feetToFeetInches(lengthFt)} × {feetToFeetInches(heightFt)}
              </Text>
              {/* Specs badges always visible */}
              <HStack gap={2} flexWrap="wrap">
                <Badge colorPalette="blue" variant="surface" size="sm">
                  {wall.studSpacing}" OC
                </Badge>
                <Badge variant="outline" size="sm">
                  {wall.topPlate} top
                </Badge>
                <Badge variant="outline" size="sm">
                  {wall.bottomPlate} bottom
                </Badge>
                {wall.loadBearing && (
                  <Badge colorPalette="orange" variant="surface" size="sm">
                    Load Bearing
                  </Badge>
                )}
                {wall.leftCorner && (
                  <Badge variant="subtle" size="sm">
                    L corner: {wall.leftCorner}
                  </Badge>
                )}
                {wall.rightCorner && (
                  <Badge variant="subtle" size="sm">
                    R corner: {wall.rightCorner}
                  </Badge>
                )}
                {wall.bottomPlate === 'floating' && wall.floorGap !== undefined && (
                  <Badge variant="subtle" size="sm">
                    Gap: {wall.floorGap}"
                  </Badge>
                )}
              </HStack>
            </VStack>
          </HStack>
          <HStack gap={6}>
            <VStack align="end" gap={0}>
              <Text fontSize="xs" color="fg.muted">
                Lumber
              </Text>
              <HoverCard.Root>
                <HoverCard.Trigger>
                  <Text fontSize="xl" fontWeight="bold" cursor="default">
                    {totalLF.toFixed(1)} ft
                  </Text>
                </HoverCard.Trigger>
                <HoverCard.Positioner>
                  <HoverCard.Content>
                    <VStack align="start" gap={1}>
                      <Text fontSize="sm">Studs LF: {studsLF.toFixed(1)} ft</Text>
                      <Text fontSize="sm">Plates LF: {platesLF.toFixed(1)} ft</Text>
                    </VStack>
                  </HoverCard.Content>
                </HoverCard.Positioner>
              </HoverCard.Root>
              <Text fontSize="xs" color="fg.muted">
                Boards: {studsToBuy + platesToBuy}
              </Text>
              <Text fontSize="xs" color="fg.muted">
                Est. cost: ${estTotalCost.toFixed(2)}
              </Text>
            </VStack>
            <ButtonGroup size="sm" variant="subtle" onClick={(e) => e.stopPropagation()}>
              {onEdit && (
                <IconButton
                  aria-label="Edit wall"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(wall);
                  }}
                >
                  <Edit2 size={16} />
                </IconButton>
              )}
              {onDuplicate && (
                <IconButton
                  aria-label="Duplicate wall"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDuplicate(wall);
                  }}
                >
                  <Layers size={16} />
                </IconButton>
              )}
              {onRemove && (
                <IconButton
                  aria-label="Remove wall"
                  colorPalette="red"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(wall.id);
                  }}
                >
                  <Trash2 size={16} />
                </IconButton>
              )}
            </ButtonGroup>
          </HStack>
        </HStack>

        {/* Expanded details */}
        <Collapsible.Root open={open}>
          <Collapsible.Content>
            <VStack align="stretch" gap={2} mt={3}>
              <HStack gap={2} flexWrap="wrap">
                <Badge colorPalette="blue" variant="surface" size="sm">
                  {wall.studSpacing}" OC
                </Badge>
                <Badge variant="outline" size="sm">
                  {wall.topPlate} top
                </Badge>
                <Badge variant="outline" size="sm">
                  {wall.bottomPlate} bottom
                </Badge>
                {wall.loadBearing && (
                  <Badge colorPalette="orange" variant="surface" size="sm">
                    Load Bearing
                  </Badge>
                )}
                {wall.leftCorner && (
                  <Badge variant="subtle" size="sm">
                    L corner: {wall.leftCorner}
                  </Badge>
                )}
                {wall.rightCorner && (
                  <Badge variant="subtle" size="sm">
                    R corner: {wall.rightCorner}
                  </Badge>
                )}
                {wall.bottomPlate === 'floating' && wall.floorGap !== undefined && (
                  <Badge variant="subtle" size="sm">
                    Gap: {wall.floorGap}"
                  </Badge>
                )}
              </HStack>
              <HStack gap={2} flexWrap="wrap">
                <Badge variant="surface" size="sm">
                  Studs needed: {studs} × {heightFt.toFixed(1)} ft
                </Badge>
                <Badge variant="surface" size="sm">
                  Plates needed: {plateCount} × {lengthFt.toFixed(1)} ft
                </Badge>
                {ptPlateRuns ? (
                  <Badge colorPalette="green" variant="surface" size="sm">
                    PT: {ptPlateRuns} × {lengthFt.toFixed(1)} ft
                  </Badge>
                ) : null}
              </HStack>
            </VStack>
          </Collapsible.Content>
        </Collapsible.Root>
      </Card.Body>
    </Card.Root>
  );
}

export default WallItem;
