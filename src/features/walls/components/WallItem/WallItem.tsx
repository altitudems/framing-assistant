import { Button, HStack, Box, Text } from '@chakra-ui/react';
import type { Wall } from '../../types/Wall.types';

interface WallItemProps {
  wall: Wall;
  onRemove?: (id: string) => void;
}

function WallItem({ wall, onRemove }: WallItemProps) {
  return (
    <HStack justify="space-between">
      <Box>
        <Text fontWeight="bold">{wall.name}</Text>
        <Text fontSize="sm" color="gray.500">
          {wall.length}ft × {wall.height}ft
        </Text>
      </Box>
      {onRemove && (
        <Button size="sm" colorScheme="red" onClick={() => onRemove(wall.id)}>
          Remove
        </Button>
      )}
    </HStack>
  );
}

export default WallItem;
