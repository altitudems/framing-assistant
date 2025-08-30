import { Box, Heading, Stack } from '@chakra-ui/react';
import type { Wall } from '../../types/Wall.types';
import WallItem from '../WallItem/WallItem';

interface WallListProps {
  walls: Wall[];
  onRemove?: (id: string) => void;
}

function WallList({ walls, onRemove }: WallListProps) {
  if (walls.length === 0) {
    return null;
  }
  return (
    <Box borderWidth="1px" borderRadius="md" p={4} mt={4}>
      <Heading as="h2" size="md" mb={2}>
        Walls
      </Heading>
      <Stack spacing={2}>
        {walls.map((wall) => (
          <WallItem key={wall.id} wall={wall} onRemove={onRemove} />
        ))}
      </Stack>
    </Box>
  );
}

export default WallList;
