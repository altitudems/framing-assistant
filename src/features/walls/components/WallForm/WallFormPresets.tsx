import { Button, Text, VStack, HStack } from '@chakra-ui/react';

interface WallFormPresetsProps {
  onApplyLoadBearing: () => void;
  onApplyNonLoadBearing: () => void;
  onApplyBasementFloating: () => void;
}

export function WallFormPresets({
  onApplyLoadBearing,
  onApplyNonLoadBearing,
  onApplyBasementFloating,
}: WallFormPresetsProps) {
  return (
    <div>
      <Text
        fontSize="sm"
        fontWeight="medium"
        color={{ base: 'gray.700', _dark: 'gray.300' }}
        mb={3}
      >
        Quick Presets
      </Text>
      <VStack align="stretch" gap={2}>
        <HStack gap={2} flexWrap="wrap">
          <Button size="sm" variant="outline" onClick={onApplyLoadBearing} flex="1" minW="120px">
            Load Bearing
          </Button>
          <Button size="sm" variant="outline" onClick={onApplyNonLoadBearing} flex="1" minW="120px">
            Non-Load Bearing
          </Button>
        </HStack>
        <HStack gap={2} flexWrap="wrap">
          <Button
            size="sm"
            variant="outline"
            onClick={onApplyBasementFloating}
            flex="1"
            minW="120px"
          >
            Basement Floating
          </Button>
        </HStack>
      </VStack>
    </div>
  );
}
