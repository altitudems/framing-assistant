import {
  HStack,
  Input,
  NativeSelect,
  ButtonGroup,
  Button,
  Box,
  IconButton,
} from '@chakra-ui/react';
import { Search, X } from 'lucide-react';
import { useRef } from 'react';

interface WallFiltersProps {
  query: string;
  sortKey: 'name' | 'length' | 'height';
  filter: 'all' | 'load' | 'non';
  onQueryChange: (q: string) => void;
  onSortChange: (s: 'name' | 'length' | 'height') => void;
  onFilterChange: (f: 'all' | 'load' | 'non') => void;
}

function WallFilters({
  query,
  sortKey,
  filter,
  onQueryChange,
  onSortChange,
  onFilterChange,
}: WallFiltersProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <HStack gap={3} justify="space-between" flexWrap="wrap" w="full">
      <Box position="relative" w="full" maxW="md">
        <Box
          position="absolute"
          insetStart="2"
          top="50%"
          transform="translateY(-50%)"
          pointerEvents="none"
        >
          <Search size={16} />
        </Box>
        <Input
          ref={inputRef}
          placeholder="Search walls by name…"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          ps="8"
          pe={query ? '8' : undefined}
        />
        {query && (
          <Box position="absolute" insetEnd="2" top="50%" transform="translateY(-50%)">
            <IconButton
              aria-label="Clear"
              variant="ghost"
              size="xs"
              onClick={() => {
                onQueryChange('');
                inputRef.current?.focus();
              }}
            >
              <X size={14} />
            </IconButton>
          </Box>
        )}
      </Box>

      <HStack gap={3}>
        <NativeSelect.Root size="sm">
          <NativeSelect.Field
            value={sortKey}
            onChange={(e) => onSortChange(e.target.value as 'name' | 'length' | 'height')}
          >
            <option value="name">Name (A–Z)</option>
            <option value="length">Length</option>
            <option value="height">Height</option>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>

        <ButtonGroup size="sm" variant="subtle" attached>
          {[
            { value: 'all' as const, label: 'All' },
            { value: 'load' as const, label: 'Load-bearing' },
            { value: 'non' as const, label: 'Non-load' },
          ].map(({ value, label }) => (
            <Button
              key={value}
              variant={filter === value ? 'solid' : 'ghost'}
              colorPalette={filter === value ? 'blue' : undefined}
              onClick={() => onFilterChange(value)}
            >
              {label}
            </Button>
          ))}
        </ButtonGroup>
      </HStack>
    </HStack>
  );
}

export default WallFilters;
