import { VStack, SimpleGrid, Card, Text, HStack, Badge, Button } from '@chakra-ui/react';
import type { Wall } from '../../../../shared/api';
import {
  calculateRegularStuds,
  calculateCornerStuds,
  feetToInches,
} from '../../../walls/utils/wallDimensions';
import ProjectSummaryItem from './ProjectSummaryItem';
import { calculateStudsNeeded, calculatePlatesNeeded } from '../../../walls/utils/wallLumber';
import {
  calculatePlateCost,
  calculateStudCost,
  calculateTotalCost,
} from '../../../walls/utils/wallCosts';
import { usePricingConfig } from '../../../walls/hooks/usePricing';
import { Link } from '@tanstack/react-router';

interface ProjectSummaryProps {
  walls: Wall[];
  showBreakdown?: boolean; // reserved for future use
}

export default function ProjectSummary({ walls }: ProjectSummaryProps) {
  const { data: config } = usePricingConfig();

  const totals = walls.reduce(
    (acc, w) => {
      const lengthFt = Number(w.length || 0);
      const heightFt = Number(w.height || 0);
      const spacing = parseInt(w.studSpacing, 10);
      const regular = calculateRegularStuds(feetToInches(lengthFt), spacing);
      const corners = calculateCornerStuds(w.leftCorner, w.rightCorner).totalCornerStuds;
      const studs = regular + corners;
      const topPlates = w.topPlate === 'double' ? 2 : 1;
      const bottomPlates = w.bottomPlate === 'floating' ? 2 : 1;
      acc.totalWalls += 1;
      acc.totalLengthFt += lengthFt;
      acc.loadBearing += w.loadBearing ? 1 : 0;
      acc.studsPieces += studs;
      acc.studsLF += studs * heightFt;
      acc.topPlatesLF += topPlates * lengthFt;
      acc.bottomPlatesLF += bottomPlates * lengthFt;
      // Boards using pricing lengths (hardcoded to 8ft as per new API design)
      acc.studBoards += calculateStudsNeeded(studs, heightFt, 8);
      acc.topBoards += calculatePlatesNeeded(topPlates, lengthFt, 8);
      // Bottom plate boards; split PT and non‑PT
      const ptBottomPlates = w.bottomPlateTreatment === 'pressure-treated' ? 1 : 0;
      const regularBottomPlates = bottomPlates - ptBottomPlates;
      if (regularBottomPlates > 0)
        acc.bottomBoards += calculatePlatesNeeded(regularBottomPlates, lengthFt, 8);
      if (ptBottomPlates > 0)
        acc.bottomPTBoards += calculatePlatesNeeded(ptBottomPlates, lengthFt, 8);
      return acc;
    },
    {
      totalWalls: 0,
      totalLengthFt: 0,
      loadBearing: 0,
      studsPieces: 0,
      studsLF: 0,
      topPlatesLF: 0,
      bottomPlatesLF: 0,
      studBoards: 0,
      topBoards: 0,
      bottomBoards: 0,
      bottomPTBoards: 0,
    },
  );

  const totalPlatesLF = totals.topPlatesLF + totals.bottomPlatesLF;
  const totalLF = totals.studsLF + totalPlatesLF;
  const estStudCost = calculateStudCost(totals.studBoards, config?.studUnitCost || 0);
  const estPlateCost = calculatePlateCost(
    totals.topBoards + totals.bottomBoards + totals.bottomPTBoards,
    config?.plateUnitCost || 0,
    false,
    false,
    config?.pressureTreatedPlateCost || 0,
  );
  // Add PT bottom premium separately
  const estPTCost =
    totals.bottomPTBoards *
    ((config?.pressureTreatedPlateCost || 0) - (config?.plateUnitCost || 0));
  const estTotal = calculateTotalCost(estStudCost, estPlateCost + estPTCost);

  return (
    <VStack align="stretch" gap={4}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 5 }} gap={4}>
        <ProjectSummaryItem
          label="Total Walls"
          value={String(totals.totalWalls)}
          sub={`${totals.loadBearing} load-bearing`}
        />
        <ProjectSummaryItem label="Total Length" value={`${totals.totalLengthFt.toFixed(1)} ft`} />
        <ProjectSummaryItem
          label="Studs"
          value={`${totals.studsPieces}`}
          sub={`${totals.studsLF.toFixed(1)} ft`}
        />
        <ProjectSummaryItem label="Top Plates" value={`${totals.topPlatesLF.toFixed(1)} ft`} />
        <ProjectSummaryItem
          label="Bottom Plates"
          value={`${totals.bottomPlatesLF.toFixed(1)} ft`}
        />
        <ProjectSummaryItem label="Total Lumber" value={`${totalLF.toFixed(1)} ft`} />
      </SimpleGrid>

      <Card.Root>
        <Card.Body>
          <VStack align="stretch" gap={2}>
            <HStack justify="space-between">
              <Text fontSize="sm" color="fg.muted">
                Boards to buy
              </Text>
              <Button asChild size="xs" variant="outline">
                <Link to="/settings">Edit pricing</Link>
              </Button>
            </HStack>
            <HStack gap={2} flexWrap="wrap">
              <Badge variant="surface" size="sm">
                Studs: {totals.studBoards} × 8 ft
              </Badge>
              <Badge variant="surface" size="sm">
                Top plates: {totals.topBoards} × 8 ft
              </Badge>
              <Badge variant="surface" size="sm">
                Bottom plates: {totals.bottomBoards} × 8 ft
              </Badge>
              {totals.bottomPTBoards > 0 && (
                <Badge colorPalette="green" variant="surface" size="sm">
                  PT bottom: {totals.bottomPTBoards} × 8 ft
                </Badge>
              )}
              <Badge colorPalette="blue" variant="subtle" size="sm">
                Total est. cost: ${estTotal.toFixed(2)}
              </Badge>
            </HStack>
          </VStack>
        </Card.Body>
      </Card.Root>
    </VStack>
  );
}
